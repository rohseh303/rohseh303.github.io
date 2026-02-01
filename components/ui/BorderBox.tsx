interface BorderBoxProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function BorderBox({ children, className = '', hover = false }: BorderBoxProps) {
  return (
    <div 
      className={`
        border-terminal p-6
        ${hover ? 'hover:border-[rgba(255,255,255,0.2)] transition-colors' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
