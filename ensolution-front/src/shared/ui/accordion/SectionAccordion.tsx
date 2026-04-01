import { useState } from "react";
import type { ReactNode } from "react";

interface SectionAccordionProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const SectionAccordion = ({
  title,
  children,
  defaultOpen = false,
}: SectionAccordionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`
          w-full flex items-center justify-between 
          bg-slate-500 text-white border border-slate-400
          text-xs font-semibold py-1.5 px-2 tracking-wide
          ${open ? "rounded-t-lg" : "rounded-lg"}
        `}
      >
        <span>{title}</span>
        <svg
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </section>
  );
};
