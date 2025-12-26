import { Link } from "react-router-dom";

import type { WorkplaceResponse } from "@workplace/model";

import { formatBizNumber } from "@common/utils/formatters";
import { GRADE_LABELS } from '@common/constants';

interface WorkplaceCardProps {
  workplace: WorkplaceResponse
}

export const WorkplaceCardItem = ({workplace}: WorkplaceCardProps) => {

  return (
    <div
      className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-lg hover:border-neutral-400 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <Link to={`/client/workplace/${workplace.id}`}>
          <h3 className="text-xl font-semibold text-gray-800">{workplace.name}</h3>
        </Link>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">{workplace.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>사업자번호: {formatBizNumber(workplace.bizNumber)}</span>
        </div>

        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>업종: {workplace.businessCategory}</span>
        </div>

        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>사업장 규모: {GRADE_LABELS[workplace.grade] ?? workplace.grade}</span>
        </div>

        {workplace.remark && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-gray-500 text-xs line-clamp-2">{workplace.remark}</p>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400">
        등록일: {new Date(workplace.createdAt).toLocaleDateString("ko-KR")}
      </div>
    </div>
  );
}