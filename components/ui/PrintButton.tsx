'use client';

export default function PrintButton() {
  return (
    <button className="text-[#a0a0a0] hover:text-white transition-colors" type="button" onClick={() => window.print()}>
      Print / save PDF
    </button>
  );
}
