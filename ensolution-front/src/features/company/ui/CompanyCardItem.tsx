import { Link } from "react-router";

import type { CompanyResponse } from "@company/model";

import { formatBizNumber, formatDate } from '@/shared/lib/formatter/formatters';

interface CompanyCardProps {
  company: CompanyResponse
}

export const CompanyCardItem = ({ company }: CompanyCardProps) => {

  return (
    <div
      className="bg-white border rounded-lg border-slate-200 p-5 hover:shadow-lg hover:border-neutral-400 transition-all cursor-pointer"
    >
      <Link to={`/company/${company.id}`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800">{company.name}</h3>
        </div>
      </Link>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">{company.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>대표: {company.ceoName}</span>
        </div>

        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>사업자번호: {formatBizNumber(company.bizNumber ?? "")}</span>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        등록일: {formatDate(company.createdAt)}
      </div>
    </div>
  )
}