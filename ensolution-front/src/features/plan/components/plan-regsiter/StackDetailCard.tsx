import { SHAPE_LABELS, ORIENTATION_LABELS } from "@/entities/stack/model";
import type { StackDetailResponse } from "@/entities/stack/model";

import { GRADE_LABELS } from "@shared/model";

interface StackDetailCardProps {
  stack: StackDetailResponse;
}

export const StackDetailCard = ({
  stack
}: StackDetailCardProps) => {
  const isCircular = stack?.stack.shape === "CIRCULAR";

  return (
    <div className="mt-4 bg-white rounded-xl border border-gray-200 p-6">
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">

        <div className="flex justify-between">
          <dt className="text-gray-500">SEMS 번호</dt>
          <dd className="font-medium text-gray-900">
            {stack.stack.semsNumber || "-"}
          </dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-gray-500">종별</dt>
          <dd className="font-medium text-gray-900">
            {GRADE_LABELS[stack.stack.grade] ?? stack.stack.grade}
          </dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-gray-500">높이</dt>
          <dd className="font-medium text-gray-900">
            {stack.stack.height || "-"} m
          </dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-gray-500">형상</dt>
          <dd className="font-medium text-gray-900">
            {SHAPE_LABELS[stack.stack.shape] ?? "-"}
          </dd>
        </div>

        {isCircular ? (
          <div className="flex justify-between">
            <dt className="text-gray-500">지름</dt>
            <dd className="font-medium text-gray-900">
              {stack.stack.horizontalLength || "-"} m
            </dd>
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <dt className="text-gray-500">가로</dt>
              <dd className="font-medium text-gray-900">
                {stack.stack.horizontalLength || "-"} m
              </dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-gray-500">세로</dt>
              <dd className="font-medium text-gray-900">
                {stack.stack.verticalLength || "-"} m
              </dd>
            </div>
          </>
        )}

        <div className="flex justify-between">
          <dt className="text-gray-500">방향</dt>
          <dd className="font-medium text-gray-900">
            {ORIENTATION_LABELS[stack.stack.orientation] ?? "-"}
          </dd>
        </div>

      </dl>
    </div>
  )
}