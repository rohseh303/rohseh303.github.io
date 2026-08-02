import React from 'react';
import { Divider, Callout, Th, Td, EvidenceBar } from './prose';

export default function ReverseLlmWriteup() {
  return (
    <div className="text-[15px] leading-relaxed">
      <p className="text-white mb-4">
        A decoder-only transformer that reads a normal forward-English question and answers in{' '}
        <span className="italic">character-reversed</span> English — emitted tail-first, so the model commits to how
        the sentence ends before it writes how it begins.
      </p>
      <p className="text-[#a0a0a0] mb-6">
        <span className="text-white">nanochat fork</span> · custom BPE · direction tokens · trained from scratch.
        A full pretraining + SFT stack built to answer one question: can a transformer learn to generate coherent
        language <span className="italic">tail-first</span>?
      </p>

      {/* evidence bar */}
      <EvidenceBar items={[
        ['code', 'GitHub repo', 'https://github.com/rohseh303/reverse-llm'],
      ]} />

      <Callout>
        <span className="uppercase tracking-wider text-[10px] text-white block mb-1">Status</span>
        A working proof-of-mechanism, trained end to end locally. Given a forward-English question it emits{' '}
        <span className="text-white">grammatical English, tail-first</span> — direction tokens firing, sequence
        terminating cleanly. At this scale (73M params, a ~44-minute MacBook run) the answers are{' '}
        <span className="text-white">fluent but not yet correct</span> — the deliberate scope was to prove the
        tail-first mechanism at small scale first. It holds. Scaling up for correctness is the next run, not an open
        question about whether the approach works.
      </Callout>

      {/* WHY */}
      <Divider title="Why write backwards?" />
      <p className="text-[#a0a0a0] mb-4">
        Reversing a sentence at the character level is trivial for a two-line Python function and genuinely hard for a
        person to do fluently out loud. That gap is exactly what makes it a clean probe: it&apos;s a deterministic,
        checkable target with no ambiguity, but it forces the model to represent <span className="text-white">order</span> in
        a way normal left-to-right training never asks for.
      </p>
      <p className="text-[#a0a0a0] mb-4">
        The property that makes this interesting is <span className="text-white">tail-first generation</span>.
        Take the answer <span className="text-white">&quot;The capital is Paris.&quot;</span> Character-reversed, the target string is{' '}
        <span className="text-white">&quot;.siraP si latipac ehT&quot;</span>. The model produces that left-to-right — so the
        very first token it emits corresponds to the <span className="italic">last</span> character of the true answer.
        It has to decide the ending before the beginning. Normal autoregressive planning runs the other way, so this
        is a direct test of whether the architecture can plan in reverse.
      </p>

      {/* DESIGN */}
      <Divider title="The design" />
      <div className="overflow-x-auto border-terminal mb-5">
        <table className="w-full text-sm">
          <thead><tr><Th l>decision</Th><Th l>why</Th></tr></thead>
          <tbody>
            <tr>
              <Td l>Decoder-only, forked from nanochat</Td>
              <Td l dim>Reuse a known-good training loop and tokenizer harness; spend the effort on the task, not the plumbing.</Td>
            </tr>
            <tr>
              <Td l>Custom BPE on a mixed forward + reversed corpus</Td>
              <Td l dim>A tokenizer trained only on forward text fragments reversed strings into near-byte-level pieces. Training the merges on both directions lets reversed spans get real subword units too.</Td>
            </tr>
            <tr>
              <Td l>Direction tokens for mode control</Td>
              <Td l dim>A leading control token selects forward vs reversed output, so one model serves both modes and the corpus can mix them cleanly.</Td>
            </tr>
            <tr>
              <Td l>Character-level reversal, tail-first target</Td>
              <Td l dim>The hard version: reverse the whole answer string, not per-word — forcing end-before-beginning planning.</Td>
            </tr>
          </tbody>
        </table>
      </div>
      <Callout>
        <span className="uppercase tracking-wider text-[10px] text-white block mb-1">Config</span>
        Depth-6 decoder-only transformer, <span className="text-white">73,531,646 parameters</span> (384-dim, 6 heads,
        512 context), <span className="text-white">32,768</span>-vocab byte-level BPE. Pretrained 5,000 iterations /{' '}
        <span className="text-white">81.9M tokens</span> of character-reversed ClimbMix at batch 16,384, then{' '}
        <span className="text-white">125 steps</span> of reverse-Alpaca SFT. Roughly <span className="text-white">44
        minutes end to end on a MacBook</span> (Apple MPS), ~$0. Final validation{' '}
        <span className="text-white">bpb 1.2888</span>.
        <span className="block mt-2 text-[13px]">
          At this depth the parameter budget lives in the vocab-sized tables — the token embedding, the untied output
          head, and nanochat&apos;s value-embedding layers — not the ~10M transformer body. That&apos;s why the true count is
          73.5M: at small depth, the embeddings dominate.
        </span>
      </Callout>

      {/* BUGS */}
      <Divider title="The bugs that actually bit" />
      <p className="text-[#a0a0a0] mb-4">
        The modeling was the easy part. The two things that cost real time were both in the data path — which is the
        honest lesson of most from-scratch training.
      </p>
      <ul className="text-[#a0a0a0] space-y-3 list-none mb-2">
        <li>
          <span className="text-white">Overlong reversed docs → NaN loss.</span> The dataloader buffers conversations
          and packs them into fixed-width rows. When <span className="italic">every</span> buffered example was longer
          than the row capacity, the packer emitted an empty/degenerate batch and the loss went to NaN — not a bad
          learning rate, a data bug masquerading as one. Fix: filter reversed examples that exceed the row capacity
          <span className="text-white"> before</span> they reach the buffer, so a full buffer always contains something
          packable.
        </li>
        <li>
          <span className="text-white">macOS killed my checkpoints.</span> The SFT post-step evaluation crashed on
          macOS (a process-spawn issue), and because the eval ran <span className="italic">before</span> the checkpoint
          save, a crash meant the run exited having written nothing to disk — hours of compute, no artifact. Fix: pass
          an explicit <span className="text-white">--save-every=N</span> so checkpointing never sits behind the eval
          that&apos;s crashing.
        </li>
      </ul>
      <Callout>
        Both bugs share a shape worth naming: a failure in an <span className="text-white">auxiliary</span> path (packing,
        eval) silently destroyed the <span className="text-white">primary</span> result (a gradient step, a saved model).
        The takeaway I keep: make the thing you care about not depend on the thing that&apos;s allowed to fail.
      </Callout>

      {/* RESULTS */}
      <Divider title="Does it work?" />
      <p className="text-[#a0a0a0] mb-4">
        The only quantitative number is validation <span className="text-white">bpb 1.2888</span> — there&apos;s no
        QA-accuracy metric, because nanochat&apos;s post-training eval crashes on macOS (the bug above) and I left it
        disabled. So the honest read is qualitative. Here is a real generation, verbatim:
      </p>
      <div className="border-terminal p-4 mb-4 text-sm space-y-3">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#a0a0a0] mb-1">prompt (forward)</div>
          <div className="text-white">What is the capital of France?</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#a0a0a0] mb-1">raw model output (character-reversed)</div>
          <div className="text-[#a0a0a0] font-mono text-xs overflow-x-auto whitespace-nowrap pb-1">.dlrow eht fo strap ynam ni latipac dna ,ygrene ,ygrene fo ecruos niam eht si ecnarF</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#a0a0a0] mb-1">un-reversed for reading</div>
          <div className="text-white">France is the main source of energy, energy, and capital in many parts of the world.</div>
        </div>
      </div>
      <p className="text-[#a0a0a0] mb-4">
        Watch the two endpoints — this is the whole point of the project. The <span className="text-white">first</span>
        token it emitted was <span className="text-white">&quot;.&quot;</span>, the answer&apos;s final character. The{' '}
        <span className="text-white">last</span> token it emitted was <span className="text-white">&quot;ecnarF&quot;</span> —
        i.e. <span className="text-white">France</span>, the first word of the readable answer, correctly echoing the
        subject of the question. The model wrote the entire sentence back-to-front and only committed to its opening
        word — the right one — at the very end. Grammatical English, generated tail-first, direction token firing, clean
        termination.
      </p>
      <p className="text-[#a0a0a0] mb-4">
        It is also <span className="text-white">factually wrong</span> (the capital of France is Paris, not an energy
        story), with a repetition artifact (&quot;energy, energy&quot;). At 73M params and 125 SFT steps that ceiling is
        expected — and it&apos;s <span className="text-white">orthogonal</span> to what the experiment tested. The{' '}
        <span className="text-white">structure</span> is the result: coherent, tail-first English with the correct
        opening word chosen last. Content quality is a scale knob; whether the mechanism works is the question, and it
        does.
      </p>

      {/* WHERE IT COULD GO */}
      <Divider title="Where this could go" />
      <p className="text-[#a0a0a0] mb-4">
        A reversed model earns its keep when it does something a forward model can&apos;t. The directions I&apos;d take it
        next:
      </p>
      <ul className="text-[#a0a0a0] space-y-3 list-none">
        <li><span className="text-white">Reverse model as a verifier.</span> Score candidate answers with tail-first log-probs and see whether reverse-direction scoring reranks differently from — and complements — forward scoring.</li>
        <li><span className="text-white">Forward/backward asymmetry.</span> Probe where in the network positional/order information lives, and whether reversed training represents it differently. A small mech-interp study on a model I fully control.</li>
        <li><span className="text-white">Infilling / plan-from-the-end.</span> Condition on how a sequence should end and generate backward toward a given start.</li>
      </ul>

      <div className="mt-10 pt-6 border-t border-terminal text-xs text-[#a0a0a0]">
        Built on Karpathy&apos;s nanochat. Full-stack and from scratch — custom tokenizer, reversed-data pipeline,
        pretraining, and SFT — scoped to prove the mechanism.
      </div>
    </div>
  );
}
