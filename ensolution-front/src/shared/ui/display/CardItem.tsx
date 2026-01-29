import type { FC } from "react";
import { useNavigate } from "react-router";

export interface CardItemProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  path?: string;
  colSpan?: 1 | 2 | 3;
  className?: string;
  backgroudColor?: string;
}

export const CardItem: FC<CardItemProps> = ({
  title,
  description,
  icon,
  path,
  colSpan = 1,
  className = "",
  backgroudColor = "bg-white/90"
}) => {
  const navigate = useNavigate();
  const isClickable = !!path;

  const colSpanClass = {
    1: "",
    2: "md:col-span-2",
    3: "md:col-span-3",
  }[colSpan];

  const baseClass =
    `${backgroudColor} backdrop-blur-sm p-6 border border-slate-200/50 transition-all duration-300 h-30 md:h-60`;
  const clickableClass = isClickable
    ? "cursor-pointer hover:bg-slate-200 hover:border-slate-300 group"
    : "";

  const handleClick = () => {
    if (isClickable) {
      navigate(path);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${baseClass} ${clickableClass} ${colSpanClass} ${className}`}
    >
      {icon && (
        <div className={`text-3xl text-neutral-600 mb-3 ${isClickable ? "group-hover:text-neutral-800 transition-colors" : ""}`}>
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-neutral-800 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-neutral-600">{description}</p>
      )}
      {isClickable && (
        <div className="mt-4 text-neutral-500 text-sm font-medium group-hover:text-neutral-700 transition-colors">
          바로가기 →
        </div>
      )}
    </div>
  );
};