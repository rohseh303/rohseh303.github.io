import React from 'react';

// ---- small building blocks in the site's terminal style ----

function Divider({ title }: { title: string }) {
  return (
    <div className="bg-black border-terminal border-b border-t py-2 px-4 mt-12 mb-6">
      <h2 className="text-sm uppercase tracking-wider font-medium">{title}</h2>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-terminal border-l-2 border-l-white/40 p-4 my-6 text-sm text-[#a0a0a0] leading-relaxed">
      {children}
    </div>
  );
}

type Bar = { rung: string; val: number };

// bright = the learnable band (0.2–0.8) where GRPO has a gradient; dim = too easy or too hard.
function Bars({ data }: { data: Bar[] }) {
  return (
    <div>
      <div className="flex items-end gap-2 h-32 border-b border-terminal">
        {data.map((b) => {
          const inBand = b.val >= 0.2 && b.val <= 0.8;
          return (
            <div key={b.rung} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
              <div
                className={inBand ? 'w-full bg-white/85' : 'w-full bg-white/15'}
                style={{ height: `${Math.max(b.val, 0.02) * 100}%` }}
              />
              <span className="text-[10px] text-[#a0a0a0] tabular-nums">{b.val.toFixed(2)}</span>
              <span className="text-[10px] text-[#a0a0a0]">{b.rung}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Th({ children, l = false }: { children: React.ReactNode; l?: boolean }) {
  return (
    <th className={`${l ? 'text-left' : 'text-right'} py-2 px-3 text-[11px] uppercase tracking-wider text-[#a0a0a0] font-medium border-b border-terminal`}>
      {children}
    </th>
  );
}
function Td({ children, l = false, dim = false }: { children: React.ReactNode; l?: boolean; dim?: boolean }) {
  return (
    <td className={`${l ? 'text-left' : 'text-right'} py-2 px-3 tabular-nums border-b border-terminal ${dim ? 'text-[#a0a0a0]' : ''}`}>
      {children}
    </td>
  );
}

const V1: Bar[] = [
  { rung: 'd1', val: 0.75 }, { rung: 'd2', val: 0.12 }, { rung: 'd3', val: 0 },
  { rung: 'd4', val: 0 }, { rung: 'd5', val: 0 }, { rung: 'd6', val: 0 },
];
const V2: Bar[] = [
  { rung: 'd1', val: 1.0 }, { rung: 'd2', val: 0.75 }, { rung: 'd3', val: 0.62 },
  { rung: 'd4', val: 0.12 }, { rung: 'd5', val: 0 }, { rung: 'd6', val: 0 },
];

export default function CtfLiteWriteup() {
  return (
    <div className="text-[15px] leading-relaxed">
      <p className="text-white mb-4">
        A capture-the-flag eval, turned into an RL <span className="italic">training</span> environment —
        including the null result I kept instead of hiding, the diagnosis, and the fix I built and measured.
      </p>
      <p className="text-[#a0a0a0] mb-6">
        <span className="text-white">Qwen3-4B</span> · GRPO + LoRA · prime-rl · 2×H100. The honest
        arc matters more than any single number.
      </p>

      {/* evidence bar */}
      <div className="flex flex-wrap gap-2 mb-2">
        {[
          ['code', 'GitHub repo', 'https://github.com/rohseh303/prime-rl-environments'],
          ['runs', 'wandb report', 'https://wandb.ai/rohansehgal935-personal/ctf-lite-rl/reports/ctf-lite-GRPO-curriculum-training-runs--VmlldzoxNzUzNDcxMw'],
          ['weights', 'HuggingFace', 'https://huggingface.co/RSRS64/qwen3-4b-ctf-lite-grpo'],
          ['env', 'Prime Hub', 'https://app.primeintellect.ai/dashboard/environments/rohseh303/ctf-lite'],
        ].map(([k, label, href]) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer"
            className="border-terminal hover:border-[rgba(255,255,255,0.3)] transition-colors px-3 py-2 text-xs flex items-baseline gap-2">
            <span className="text-[#a0a0a0] uppercase tracking-wider text-[10px]">{k}</span>
            <span className="text-white">{label}</span>
          </a>
        ))}
      </div>

      <Callout>
        <span className="uppercase tracking-wider text-[10px] text-white block mb-1">The honest headline</span>
        Naive RL training gave <span className="text-white">no statistically significant improvement</span> (overall
        +0.03, p=0.71 at n=16 rollouts/task). An earlier n=3 read <span className="italic">looked</span> like +0.11 —
        small-sample noise that vanished under more rollouts. The value here is a working, validated training
        environment and the judgment to measure it honestly — not a win I don&apos;t have.
      </Callout>

      {/* HERO: cliff vs staircase */}
      <Divider title="The fix, in one picture" />
      <p className="text-[#a0a0a0] mb-6">
        Base 4B pass-rate per difficulty rung on <span className="text-white">encoding-chain</span>. Splitting
        difficulty across decoupled sub-knobs turned a cliff into a staircase.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-terminal p-5">
        <div>
          <div className="text-xs mb-1"><span className="text-white">v1</span> <span className="text-[#a0a0a0]">— cliff</span></div>
          <div className="text-[11px] text-[#a0a0a0] mb-3">one big difficulty step → nothing to climb</div>
          <Bars data={V1} />
        </div>
        <div>
          <div className="text-xs mb-1"><span className="text-white">v2</span> <span className="text-[#a0a0a0]">— staircase</span></div>
          <div className="text-[11px] text-[#a0a0a0] mb-3">decoupled sub-knobs → a gentle, climbable ramp</div>
          <Bars data={V2} />
        </div>
      </div>
      <p className="text-[11px] text-[#a0a0a0] mt-3">
        Bright bars sit in the learnable band (~0.2–0.8) where GRPO has a gradient. v1 has one; v2 has three.
      </p>

      {/* ACT 1 */}
      <Divider title="Act 1 — the null result" />
      <p className="text-[#a0a0a0] mb-4">
        Trained a 4B on the tasks, then evaluated it properly — 16 rollouts per task, base vs trained,
        Fisher&apos;s exact test:
      </p>
      <div className="overflow-x-auto border-terminal mb-5">
        <table className="w-full text-sm">
          <thead><tr><Th l>scope</Th><Th>base</Th><Th>trained</Th><Th>Δ</Th><Th>p</Th></tr></thead>
          <tbody>
            <tr><Td l>overall (9 tasks)</Td><Td dim>51/144 · .35</Td><Td dim>55/144 · .38</Td><Td>+.03</Td><Td dim>0.71</Td></tr>
            <tr><Td l>trained subset (3)</Td><Td dim>35/48 · .73</Td><Td dim>39/48 · .81</Td><Td>+.08</Td><Td dim>0.47</Td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-[#a0a0a0] mb-2">Nothing reaches p&lt;0.05. Two measurement traps produced tempting-but-false positives:</p>
      <ul className="text-[#a0a0a0] space-y-2 mb-2 list-none">
        <li><span className="text-white">The harness artifact.</span> Measuring before/after through different agent harnesses invented a gain that was pure instrumentation. Always eval through the same harness the model trained on.</li>
        <li><span className="text-white">The small-sample mirage.</span> An n=3 eval reported +0.11; at n=16 it collapsed to noise. An RL delta from a handful of agentic rollouts is not a result.</li>
      </ul>

      {/* ACT 2 */}
      <Divider title="Act 2 — the diagnosis" />
      <p className="text-[#a0a0a0] mb-4">
        GRPO only learns from a task whose rollouts contain <span className="text-white">both</span> wins and
        losses — that difference is the gradient. The base 4B&apos;s difficulty was bimodal:
      </p>
      <div className="overflow-x-auto border-terminal mb-5">
        <table className="w-full text-sm">
          <thead><tr><Th l>task</Th><Th>base pass</Th><Th l>gradient?</Th></tr></thead>
          <tbody>
            <tr><Td l>git-leaked-secret</Td><Td>0.94</Td><Td l dim>— always solved</Td></tr>
            <tr><Td l>xor-vault</Td><Td>0.75</Td><Td l dim>thin</Td></tr>
            <tr><Td l>hash-crack</Td><Td>0.50</Td><Td l>✓ learnable</Td></tr>
            <tr><Td l>gauntlet · multi-stage · +3</Td><Td>0.00</Td><Td l dim>— always fails</Td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-[#a0a0a0]">
        Effectively <span className="text-white">one task</span> carried a usable gradient. The null result was
        the expected outcome, not a surprise.
      </p>

      {/* ACT 3 */}
      <Divider title="Act 3 — the fix" />
      <p className="text-[#a0a0a0] mb-4">
        Each task sat at one fixed point on the difficulty axis. So I made difficulty a <span className="text-white">dial</span>:
        each task exposes a ladder of rungs, and prime-rl&apos;s zero-advantage filter auto-selects the rungs in the
        model&apos;s learnable band. The fix that produced the staircase — split each task&apos;s difficulty across
        <span className="text-white"> decoupled sub-knobs</span>, so every rung is a small step:
      </p>
      <div className="overflow-x-auto border-terminal mb-5">
        <table className="w-full text-sm">
          <thead><tr><Th l>task</Th><Th l>difficulty sub-knobs</Th></tr></thead>
          <tbody>
            <tr><Td l>multi-stage</Td><Td l dim>chain length · per-stage crypto · final-seal key length</Td></tr>
            <tr><Td l>encoding-chain</Td><Td l dim>nesting depth · encoding-menu size (easy→full)</Td></tr>
            <tr><Td l>repeating-key-xor</Td><Td l dim>XOR key length · known-plaintext crib at easy rungs</Td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-[#a0a0a0]">
        Every rung gold-validates and every encoder chain round-trips, so a real solver can win. A curriculum is
        one flag: <span className="text-white">--taskset.difficulties &apos;[1,2,3,4,5]&apos;</span>.
      </p>

      {/* HONEST READ */}
      <Divider title="What's honest about it" />
      <ul className="text-[#a0a0a0] space-y-3 list-none">
        <li><span className="text-white">The generator concept is validated</span> — measured, not asserted. A fixed-difficulty task can be turned into a trainable ramp, and you can watch the learnable band populate.</li>
        <li><span className="text-white">The tasks aren&apos;t broken — they&apos;re model-matched.</span> multi-stage gold-validates and is solvable; its floor just sits above a 4B&apos;s frontier. It&apos;s a 7B+ task pointed at a 4B, not a bug.</li>
        <li><span className="text-white">This is what a validation gate is for.</span> I measured the difficulty response, so I know which rungs to train on and which to hold out.</li>
        <li><span className="text-white">Still to do:</span> the training run on the smoothed curriculum. The environment is now well-posed for it; the &quot;after&quot; number isn&apos;t in yet.</li>
      </ul>

      <div className="mt-10 pt-6 border-t border-terminal text-xs text-[#a0a0a0]">
        Methodology informed by, and independently reimplemented from, Muzsai, Imolai &amp; Lukács,{' '}
        <span className="italic">Improving LLM Agents with RL on Cryptographic CTF Challenges</span> (arXiv:2506.02048).
      </div>
    </div>
  );
}
