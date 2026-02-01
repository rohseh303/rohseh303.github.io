interface TechTagProps {
  name: string;
}

export default function TechTag({ name }: TechTagProps) {
  return (
    <span className="text-xs border-terminal px-2 py-1 hover:border-[rgba(255,255,255,0.2)] transition-colors">
      {name}
    </span>
  );
}
