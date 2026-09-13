interface SectionHeaderProps {
  title: string;
  id?: string;
}

export default function SectionHeader({ title, id }: SectionHeaderProps) {
  return (
    <div className="bg-black border-terminal border-b border-t py-2 px-4 mb-8">
      <h2 id={id} className="text-sm uppercase tracking-wider font-medium">
        {title}
      </h2>
    </div>
  );
}
