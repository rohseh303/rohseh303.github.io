import React from 'react';
import { Divider, Callout, Th, Td } from './prose';

export default function OneLayerDeeperWriteup() {
  return (
    <div className="text-[15px] leading-relaxed">
      <p className="text-white mb-4">
        A competition about <span className="italic">depth</span>: watch a number get transformed a few
        times, then reproduce the transformation applied many more times — and on unseen numbers — with
        zero errors. A tiny learned recurrence swept Easy and every Medium. Hard did not fall, and the
        reason turned out to be worth writing down.
      </p>
      <p className="text-[#a0a0a0] mb-6">
        <span className="text-white">One Layer Deeper</span> · Tilde Research × Core Automation ·
        learn the one-step rule, reuse it recurrently, certify exact accuracy out to depth 64.
      </p>

      <Callout>
        <span className="uppercase tracking-wider text-[10px] text-white block mb-1">Result</span>
        Easy E1 <span className="text-white">100%</span>. Medium M1–M10{' '}
        <span className="text-white">100% on all ten</span>, every dataset certified{' '}
        <span className="text-white">Max T=64 and OOD-N T=64</span> — from models in the thousands of
        parameters. Hard <span className="text-white">unsolved</span> (0.03%) — as it went for nearly
        everyone. Three entries show certified depth on the public board; organiser comments in Discord
        indicated two of them still had rule violations under review, so the number of fully clean solves
        may be smaller. The board itself has not changed.
      </Callout>

      {/* THE TASK */}
      <Divider title="The task" />
      <p className="text-[#a0a0a0] mb-4">
        Given a start <span className="text-white">x</span>, a modulus <span className="text-white">N</span>,
        and a step count <span className="text-white">T</span>, output the result of applying one hidden
        operation <span className="text-white">T</span> times. On the public tiers that operation is
        repeated modular squaring, <span className="text-white">x → x² mod N</span>. Two demands make it
        hard: <span className="text-white">exactness</span> — a depth certifies only if{' '}
        <span className="italic">every</span> example at that depth is right — and{' '}
        <span className="text-white">extrapolation</span> — train on shallow T and small N, get graded on
        deeper iteration (OOD-T) and moduli you never saw (OOD-N). All under ≤500M params, a fixed H100
        clock, and no hard-coded algorithm.
      </p>
      <p className="text-[#a0a0a0] mb-4">
        A recurrent Transformer just memorizes: it fits the training prompts with total confidence and
        sits near random on everything held out (~3–4% test). It never acquires an{' '}
        <span className="text-white">arithmetic</span> inductive bias. The fix wasn&apos;t a bigger network
        — it was to stop predicting answers and learn the transition itself.
      </p>

      {/* THE IDEA */}
      <Divider title="Learn the step, reuse it forever" />
      <p className="text-[#a0a0a0] mb-4">
        If a model learns one <span className="italic">exact</span> transition and applies it recurrently,
        depth is free: running to T=64 is the same weights, more loops. The architecture that worked is a{' '}
        <span className="text-white">population of tiny arithmetic programs</span>. Each expert is a few
        gates over just <span className="text-white">{'{1, x, N}'}</span>; every gate learns which two
        inputs to read, add vs. multiply, an integer scale, and a bias. A learned selector concentrates on
        whichever program fits the labels — trained through final answers only. Nothing names squaring; the
        optimizer finds it, even from an init where zero experts start correct.
      </p>
      <pre className="border-terminal bg-black p-4 mb-5 text-[13px] leading-relaxed overflow-x-auto text-[#a0a0a0]">
{`state = x
for step in range(T):
    a, b  = pick2({1, x=state, N})    # learned routes
    gate  = a + b  if learned_op else  a * b
    state = (scale · gate + bias) mod N
# a learned selector picks the expert that fits the labels`}
      </pre>
      <p className="text-[#a0a0a0] mb-4">
        One <span className="text-white">4,352-parameter</span> file, unchanged, certified the three
        variable-modulus Mediums to depth 64 on both seen and unseen N:
      </p>
      <div className="overflow-x-auto border-terminal mb-6">
        <table className="w-full text-sm">
          <thead><tr><Th l>dataset</Th><Th l>regime</Th><Th>test</Th><Th>max T</Th><Th>OOD-N max T</Th></tr></thead>
          <tbody>
            <tr><Td l>M3</Td><Td l dim>11/13/15-bit N</Td><Td>100%</Td><Td>64</Td><Td>64</Td></tr>
            <tr><Td l>M4</Td><Td l dim>14/18/22-bit N · 6,074 moduli</Td><Td>100%</Td><Td>64</Td><Td>64</Td></tr>
            <tr><Td l>M5</Td><Td l dim>12/14/16-bit N · T=2/4/8</Td><Td>100%</Td><Td>64</Td><Td>64</Td></tr>
          </tbody>
        </table>
      </div>

      {/* HARD */}
      <Divider title="Hard, and where the wall was" />
      <p className="text-[#a0a0a0] mb-4">
        Hard is a single hidden dataset that <span className="text-white">may change the recurrence
        itself</span> — one graded attempt per day, on a rule you never see. Three attempts, and the first
        two answered the wrong question.
      </p>
      <p className="text-[#a0a0a0] mb-4">
        <span className="text-white">Attempts 1–2</span> came back 0.03% with a training curve flat on the
        floor. Easy to read as &quot;wrong rule&quot; — but the population{' '}
        <span className="italic">provably contained</span> the exact squaring program and still matched
        zero examples from step one. That&apos;s not a rule miss; it&apos;s a broken computation.
      </p>
      <Callout>
        <span className="uppercase tracking-wider text-[10px] text-white block mb-1">The bug</span>
        Squaring in <span className="text-white">float64</span> with an 8-digit decoder is exact only to{' '}
        <span className="text-white">26-bit</span> moduli. Every Medium topped out at 22-bit — which is
        exactly why the identical model scored 100% there. A stress test forcing the known-correct squaring
        expert drew the cliff: 100% at ≤26-bit, 0% by 32-bit. Past 26 bits the model outputs garbage no
        matter how good the learned rule.
      </Callout>
      <p className="text-[#a0a0a0] mb-4">
        So I rebuilt the arithmetic — exact <span className="text-white">int64</span> modular multiply
        (exact to 40-bit), a 14-digit decoder, and a family covering{' '}
        <span className="text-white">294/294</span> candidate quadratics. Re-validated on Medium: still
        100%, still certified to 64. The <span className="text-white">final</span> daily slot, spent on the
        fixed model, came back <span className="text-white">0.03% — flat again</span>, peak accuracy 0.008
        over twenty thousand steps.
      </p>
      <p className="text-[#a0a0a0] mb-4">
        But now it meant something. With both confounds gone — arithmetic exact, population covering every
        small-integer <span className="text-white">ax²+bx+c</span> — the model still matched zero examples.
        The conclusion isn&apos;t a tuning failure: <span className="text-white">Hard&apos;s rule lives
        outside that family entirely</span> — larger coefficients, higher degree, or nothing polynomial at
        all. The method that swept ten Medium datasets was, for Hard, the wrong hypothesis class.
      </p>

      <div className="mt-8 pt-5 border-t border-terminal text-[13px] text-[#a0a0a0]">
        <span className="text-white">Follow-up:</span> after the competition closed I used this task to test whether
        the right architecture could have been identified <span className="italic">before</span> training —{' '}
        <a href="/writing/one-layer-priors" className="text-white hover:underline">Can you pick the right
        architecture before training it?</a>
      </div>

      <div className="mt-6 pt-5 border-t border-terminal text-xs text-[#a0a0a0]">
        A clean negative that points somewhere specific: a winning Hard model needs{' '}
        <span className="text-white">chained</span> gates that can express (ax+b)²-style and higher-degree
        forms, or a general recurrent arithmetic circuit that infers the step without assuming its algebraic
        shape. Every run, source, and metric preserved.
      </div>
    </div>
  );
}
