import React from 'react';

// Shared terminal-styled building blocks for hosted writeups.
// Import these into any writeup component instead of redefining them.

export function Divider({ title }: { title: string }) {
  return (
    <div className="bg-black border-terminal border-b border-t py-2 px-4 mt-12 mb-6">
      <h2 className="text-sm uppercase tracking-wider font-medium">{title}</h2>
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-terminal border-l-2 border-l-white/40 p-4 my-6 text-sm text-[#a0a0a0] leading-relaxed">
      {children}
    </div>
  );
}

export type Bar = { rung: string; val: number };

// bright = the learnable band (0.2–0.8) where GRPO has a gradient; dim = too easy or too hard.
export function Bars({ data }: { data: Bar[] }) {
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

export function Th({ children, l = false }: { children: React.ReactNode; l?: boolean }) {
  return (
    <th className={`${l ? 'text-left' : 'text-right'} py-2 px-3 text-[11px] uppercase tracking-wider text-[#a0a0a0] font-medium border-b border-terminal`}>
      {children}
    </th>
  );
}

export function Td({ children, l = false, dim = false }: { children: React.ReactNode; l?: boolean; dim?: boolean }) {
  return (
    <td className={`${l ? 'text-left' : 'text-right'} py-2 px-3 tabular-nums border-b border-terminal ${dim ? 'text-[#a0a0a0]' : ''}`}>
      {children}
    </td>
  );
}

// Evidence/artifact links row — [key, label, href] tuples.
export function EvidenceBar({ items }: { items: [string, string, string][] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {items.map(([k, label, href]) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer"
          className="border-terminal hover:border-[rgba(255,255,255,0.3)] transition-colors px-3 py-2 text-xs flex items-baseline gap-2">
          <span className="text-[#a0a0a0] uppercase tracking-wider text-[10px]">{k}</span>
          <span className="text-white">{label}</span>
        </a>
      ))}
    </div>
  );
}
