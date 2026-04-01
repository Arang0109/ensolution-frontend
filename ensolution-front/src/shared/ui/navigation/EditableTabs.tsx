import { Plus, X } from "lucide-react";

interface EditableTab {
  label: string;
}

interface EditableTabsProps {
  tabs: EditableTab[];
  activeIndex: number;
  onTabChange: (index: number) => void;
  onAddTab: () => void;
  onRemoveTab: (index: number) => void;
  addLabel?: string;
}

export const EditableTabs = ({
  tabs,
  activeIndex,
  onTabChange,
  onAddTab,
  onRemoveTab,
  addLabel = "추가",
}: EditableTabsProps) => {
  return (
    <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {tabs.map((tab, i) => (
        <div key={i} className="flex items-center shrink-0">
          <button
            onClick={() => onTabChange(i)}
            className={`px-3 py-2 text-xs md:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeIndex === i
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
          {tabs.length > 1 && (
            <button
              onClick={() => onRemoveTab(i)}
              className="ml-0.5 mb-0.5 p-0.5 text-gray-400 hover:text-red-500 transition-colors"
              title="삭제"
            >
              <X size={13} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={onAddTab}
        className="ml-2 mb-1 flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors shrink-0"
      >
        <Plus size={13} />
        {addLabel}
      </button>
    </div>
  );
};
