import { Link } from "react-router";

import type { StackResponse } from "@stack/model";

interface StackItemProps {
  stack: StackResponse;
}

export const StackItem = ({ stack }: StackItemProps) => {
  return (
    <div
      className="border border-sand-200 rounded-lg p-4 hover:shadow-md hover:border-brown-400 transition-all cursor-pointer"
    >
      
        <div className="flex justify-between items-start mb-2">
          <Link to={`/client/stack/${stack.id}`}>
            <h3 className="font-semibold text-gray-800">{stack.name}</h3>
          </Link>
          <div className="text-xs text-gray-500">
            <span>Sems 번호: {stack.semsNumber}</span>
          </div>
        </div>
      
      {stack.remark && (
        <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
          {stack.remark}
        </p>
      )}
    </div>
  );
}