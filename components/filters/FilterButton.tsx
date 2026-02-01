interface FilterButtonProps {
  label: string;
  value: string;
  isActive: boolean;
  onClick: () => void;
}

export default function FilterButton({ label, value, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        text-xs uppercase tracking-wider px-3 py-1 border-terminal
        transition-colors
        ${isActive
          ? 'bg-white text-black border-white'
          : 'hover:border-[rgba(255,255,255,0.2)]'
        }
      `}
    >
      {label}
    </button>
  );
}
