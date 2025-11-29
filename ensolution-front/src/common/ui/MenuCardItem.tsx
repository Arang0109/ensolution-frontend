import type { FC } from "react";
import { useNavigate } from "react-router";

export interface MenuCard {
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
}

export const MenuCardItem: FC<MenuCard> = ({ title, description, icon, path, color }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-sand-200/50 overflow-hidden group"
    >
      <div className={`h-2 bg-gradient-to-r ${color}`} />
      <div className="p-6">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-brown-900 mb-2">
          {title}
        </h3>
        <p className="text-brown-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <div className="px-6 pb-6">
        <div className="text-brown-500 text-sm font-medium group-hover:text-brown-700 transition-colors">
          바로가기 →
        </div>
      </div>
    </div>
  );
};