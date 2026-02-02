interface SectionHeaderProps {
  title: string;
  rightSlot?: React.ReactNode;
}

export const SectionHeader = ({ title, rightSlot }: SectionHeaderProps) => {
  return (
    <div className="bg-gray-200/70 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-neutral-900 flex items-center gap-2">
        <span className="w-1 h-6 bg-neutral-600 rounded-full" />
        {title}
      </h2>

      {rightSlot && <div>{rightSlot}</div>}
    </div>
  );
};