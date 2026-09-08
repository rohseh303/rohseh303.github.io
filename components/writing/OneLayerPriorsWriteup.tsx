import React from 'react';
import { Divider, Callout, Th, Td, EvidenceBar } from './prose';

export default function OneLayerPriorsWriteup() {
  return (
    <div className="text-[15px] leading-relaxed">
      <p className="text-white mb-4">
        Can you tell which architecture will solve a problem <span className="italic">before</span> training any of
        them? Amid et&nbsp;al. show that a network&apos;s frozen features at random initialization already carry much
        of the structure a trained model has. If that holds, it should work as an architecture screen. I tested it on a
        benchmark I had just competed in.
      </p>
      <p className="text-[#a0a0a0] mb-6">
        <span className="text-white">Neural Network Prior Kernel</span> · applied to One Layer Deeper ·
        7 experiments, 24 documented limitations, one result that survived them.
      </p>

      <EvidenceBar items={[
        ['code', 'GitHub repo', 'https://github.com/rohseh303/one-layer-priors'],
        ['paper', 'Amid et al., arXiv:2202.06438', 'https://arxiv.org/abs/2202.06438'],
        ['task', 'One Layer Deeper', 'https://onelayerdeeper.ai'],
      ]} />

      <Callout>
        <span className="uppercase tracking-wider text-[10px] text-white block mb-1">The claim</span>
        A frozen random-init probe <span className="text-white">does not</span> rank neural networks by how well they
        will train — across three similar nets it inverted the trained ordering at every difficulty level. What it
        does detect is whether an architecture can <span className="text-white">express the task&apos;s rule</span>,
        and it <span className="text-white">re-ranks correctly when the rule changes</span>.
      </Callout>

      {/* METHOD */}
      <Divider title="The method" />
      <p className="text-[#a0a0a0] mb-4">
        Take an architecture, make ~48 copies with random weights, and <span className="text-white">never train
        them</span>. Push data through all of them, concatenate the outputs, and fit a single linear readout. The
        score is how accurate that readout is.
      </p>
      <p className="text-[#a0a0a0] mb-4">
        The trick is the linear model: it can only take weighted sums of features that already exist, so it cannot
        invent structure. If it succeeds, the information was already sitting in the random features — put there by
        the architecture, before any learning.
      </p>
      <p className="text-[#a0a0a0] mb-4">
        The testbed is a good one because it admits no partial credit. Given{' '}
        <span className="text-white">x</span>, a modulus <span className="text-white">N</span> and a depth{' '}
        <span className="text-white">T</span>, a model must output the result of applying a hidden operation T times,
        exactly, on moduli it never saw. Errors compound: a 99%-accurate step is right ~52% of the time after 64
        applications. Only an exact rule survives, so <span className="text-white">identifying</span> the rule works
        and <span className="text-white">approximating</span> it does not.
      </p>

      {/* THE RESULT */}
      <Divider title="The load-bearing result: the probe re-ranks with the task" />
      <p className="text-[#a0a0a0] mb-4">
        The obvious objection to any positive finding here is that the probe simply likes one design. So I built two
        program families with an exact complementarity: one can express{' '}
        <span className="text-white">x² mod N</span> but not <span className="text-white">x³</span>; the other is the
        reverse. Each is correct for exactly one task. Changing only the task should flip which one the probe
        prefers — and it does, with no training anywhere:
      </p>
      <div className="overflow-x-auto border-terminal mb-5">
        <table className="w-full text-sm">
          <thead><tr><Th l>design (untrained probe)</Th><Th>x² mod N</Th><Th>x³ mod N</Th></tr></thead>
          <tbody>
            <tr><Td l>LearnedProgramCell — learns its whole program</Td><Td>27.6%</Td><Td>0.4%</Td></tr>
            <tr><Td l dim>CubicPopulation — the complement</Td><Td>0.5%</Td><Td>40.5%</Td></tr>
            <tr><Td l dim>MLP / looped Transformer</Td><Td>0.4%</Td><Td>0.2%</Td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-[#a0a0a0] mb-4">
        <span className="text-white">LearnedProgramCell</span> is the important row. It mirrors the architecture that
        actually scored 100% on the competition&apos;s public tiers: 3,392 trainable parameters, no frozen program
        buffer, learning which inputs feed each gate, add-vs-multiply, scales, bias and selector. It{' '}
        <span className="text-white">discovers</span> the program <span className="text-white">1*(x*x)</span> from an
        initialization containing no correct expert — and trained, it reaches 100% on unseen moduli at every depth
        through T=64, certifying T=64 on the official M3, M5 and M4 protocols.
      </p>

      {/* CONTROLS */}
      <Divider title="What I did to try to break it" />
      <p className="text-[#a0a0a0] mb-4">
        A positive result on a task-shaped architecture invites three obvious attacks. Each one became an experiment:
      </p>
      <ul className="text-[#a0a0a0] space-y-3 list-none mb-5">
        <li><span className="text-white">&quot;It just detects arithmetic-looking designs.&quot;</span> I built a
          control identical in every respect — same 3,392 parameters, same routes, scales, bias, selector, same
          modular reduction — except its gates may only <span className="italic">add</span>, which places x² outside
          its span. One controlled change moved the probe from 20.7–37.5% down to 0.0–10.8%.</li>
        <li><span className="text-white">&quot;Your baselines were undertrained.&quot;</span> Four learning rates at
          2.4× the step budget. Best unseen-modulus accuracy across all five: <span className="text-white">3.7%</span>.
          They can fit training data (Neural-GPU reaches 88.8%) — they memorise and fail to generalise.</li>
        <li><span className="text-white">&quot;You gave your design mod N for free.&quot;</span> True, so I gave a
          genuine neural net exact mod N <span className="italic">and</span> friendlier inputs. Still 0.2%. The barrier
          is precision, not the primitive: landing x² mod N exactly needs the pre-mod value exactly, and x² reaches N²
          — about 1e-6 relative accuracy at 10-bit moduli and 2e-10 at 16-bit, past where float32 lives.</li>
      </ul>

      {/* HONEST */}
      <Divider title="What this is not" />
      <p className="text-[#a0a0a0] mb-4">
        It is <span className="text-white">not</span> a general architecture-quality predictor. The designs it
        separates are arithmetic program families; the neural baselines all fail, but for a precision reason that has
        nothing to do with the probe. And it is a <span className="text-white">ranking</span> instrument, not a
        calibrated score — it measures 26.8% ± 4.5 across seed schedules and swings 1.8% → 45.4% with the number of
        initializations, though its rank is first at every setting.
      </p>
      <Callout>
        <span className="uppercase tracking-wider text-[10px] text-white block mb-1">The number to quote</span>
        On the largest real dataset (M4: 6,074 moduli, unseen N up to 15.7 million) the probe scores{' '}
        <span className="text-white">3.5%</span> against 0.0% for every neural design. That is 144,000× above chance —
        a guess lands 1 in 4.1 million — but the margin over the alternatives is thin. Quote 3.5%, not the headline.
      </Callout>
      <p className="text-[#a0a0a0] mb-4">
        Two limits I could not close: the competition&apos;s Hard tier was never released, so the interesting case is
        untestable; and the winning code is private, so every architecture here is a reconstruction. Twenty-four
        limitations are catalogued in the repo, including three where an earlier version of this write-up was simply
        wrong and the experiment corrected me.
      </p>

      <div className="mt-10 pt-6 border-t border-terminal text-xs text-[#a0a0a0]">
        Companion to the <a href="/writing/one-layer-deeper" className="text-white hover:underline">competition
        write-up</a>. Built with heavy AI assistance; every claim has a reproduction command in the repo&apos;s
        REVIEW.md.
      </div>
    </div>
  );
}
