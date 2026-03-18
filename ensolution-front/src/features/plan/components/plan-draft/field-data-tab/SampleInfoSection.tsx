import { useState } from "react";
import { X, Plus } from "lucide-react";

import type { MeasurementSheetEditForm, MeasurementItemEditForm, SampleEditForm } from "@plan/model";
import { TableInputCell } from "@shared/ui";

interface SampleInfoSectionProps {
  sheet: MeasurementSheetEditForm;
  allSheets: MeasurementSheetEditForm[];
  measurementItems: MeasurementItemEditForm[];
  onSampleItemsChange: (primaryItemId: number | null, concurrentItemIds: number[]) => void;
  onSampleChange: (sampleIndex: number, name: keyof SampleEditForm, value: string) => void;
}

export const SampleInfoSection = ({
  sheet,
  allSheets,
  measurementItems,
  onSampleItemsChange,
  onSampleChange,
}: SampleInfoSectionProps) => {
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  // 다른 시트에서 이미 사용 중인 항목 ID 집합
  const otherSheets = allSheets.filter((s) => s !== sheet);
  const takenIds = new Set<number>([
    ...otherSheets.map((s) => s.primaryItemId).filter((id): id is number => id !== null),
    ...otherSheets.flatMap((s) => s.concurrentItemIds),
  ]);

  const availableForPrimary = measurementItems.filter(
    (item) =>
      !takenIds.has(item.stackMeasurementId) ||
      item.stackMeasurementId === sheet.primaryItemId
  );

  const allAssignedIds = new Set<number>([
    ...allSheets.map((s) => s.primaryItemId).filter((id): id is number => id !== null),
    ...allSheets.flatMap((s) => s.concurrentItemIds),
  ]);
  const availableForConcurrent = measurementItems.filter(
    (item) => !allAssignedIds.has(item.stackMeasurementId)
  );
  
  const concurrentItems = sheet.concurrentItemIds
    .map((id) => measurementItems.find((item) => item.stackMeasurementId === id))
    .filter((item): item is MeasurementItemEditForm => item !== undefined);

  const handlePrimaryChange = (idStr: string) => {
    const id = idStr === "" ? null : Number(idStr);
    const newConcurrent = sheet.concurrentItemIds.filter((cId) => cId !== id);
    onSampleItemsChange(id, newConcurrent);
  };

  const handleAddConcurrent = (idStr: string) => {
    if (!idStr) return;
    const id = Number(idStr);
    onSampleItemsChange(sheet.primaryItemId, [...sheet.concurrentItemIds, id]);
    setShowAddDropdown(false);
  };

  const handleRemoveConcurrent = (id: number) => {
    onSampleItemsChange(
      sheet.primaryItemId,
      sheet.concurrentItemIds.filter((cId) => cId !== id)
    );
  };

  const colHeader =
    "bg-gray-100 border border-gray-200 px-2 py-2 text-center text-[9px] sm:text-xs font-semibold text-gray-600 whitespace-nowrap";

  // primary=0, concurrent=1,2,...
  const renderSampleCells = (sampleIndex: number) => {
    const sample = sheet.samples[sampleIndex];
    if (!sample) {
      return Array.from({ length: 11 }, (_, i) => (
        <td key={i} className="border border-gray-200 bg-white" />
      ));
    }
    const fields: (keyof SampleEditForm)[] = [
      "startTime", "endTime", "suctionQuantity", "gasMeterGaugePressure",
      "inTemperature", "outTemperature", "beforeVolume", "afterVolume",
      "blankSampleNumber", "sampleNumber", "samplingVolume",
    ];
    return fields.map((name) => (
      <TableInputCell
        key={name}
        value={sample[name]}
        type={name === "startTime" || name === "endTime" ? "time" : "text"}
        onChange={(v) => onSampleChange(sampleIndex, name, v)}
      />
    ));
  };

  const renderRows = () => {
    const rows: React.ReactNode[] = [];

    rows.push(
      <tr key="primary">
        <td className="border border-gray-200 bg-blue-50 px-2 py-2 text-center text-[9px] sm:text-xs font-semibold text-blue-700 whitespace-nowrap w-16 sm:w-20">
          주항목
        </td>
        <td className="border border-gray-200 bg-white px-1 py-1">
          <select
            value={sheet.primaryItemId ?? ""}
            onChange={(e) => handlePrimaryChange(e.target.value)}
            className="w-full px-2 py-1.5 text-xs sm:text-sm text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-400"
          >
            <option value="">— 선택 —</option>
            {availableForPrimary.map((item) => (
              <option key={item.stackMeasurementId} value={item.stackMeasurementId}>
                {item.pollutantNameKr}
              </option>
            ))}
          </select>
        </td>
        {renderSampleCells(0)}
        <td className="border border-gray-200 bg-white w-8" />
      </tr>
    );

    concurrentItems.forEach((item, idx) => {
      const sampleIndex = idx + 1;
      rows.push(
        <tr key={item.stackMeasurementId}>
          <td className="border border-gray-200 bg-green-50 px-2 py-2 text-center text-[9px] sm:text-xs font-semibold text-green-700 whitespace-nowrap">
            동시측정
          </td>
          <td className="border border-gray-200 bg-white px-2 py-2 text-xs sm:text-sm text-gray-800 text-center">
            {item.pollutantNameKr}
          </td>
          {renderSampleCells(sampleIndex)}
          <td className="border border-gray-200 bg-white w-8 text-center">
            <button
              onClick={() => handleRemoveConcurrent(item.stackMeasurementId)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              title="동시측정 항목 제거"
            >
              <X size={13} />
            </button>
          </td>
        </tr>
      );
    });

    return rows;
  };

  return (
    <section>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">시료 정보</h3>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] table-fixed border-collapse text-sm">
            <thead>
              <tr>
                <th className={`${colHeader} w-16 sm:w-20`}>구분</th>
                <th className={`${colHeader} w-28`}>항목명</th>
                <th className={colHeader}>시작시간</th>
                <th className={colHeader}>종료시간</th>
                <th className={colHeader}>흡인유량</th>
                <th className={colHeader}>가스계압</th>
                <th className={colHeader}>입구온도</th>
                <th className={colHeader}>출구온도</th>
                <th className={colHeader}>전량(전)</th>
                <th className={colHeader}>전량(후)</th>
                <th className={colHeader}>공시료번호</th>
                <th className={colHeader}>시료번호</th>
                <th className={colHeader}>채취량</th>
                <th className={`${colHeader} w-8`}></th>
              </tr>
            </thead>
            <tbody>
              {renderRows()}
            </tbody>
          </table>
        </div>

        {/* 동시측정 항목 추가 */}
        <div className="border-t border-gray-200 px-3 py-2">
          {showAddDropdown ? (
            <div className="flex items-center gap-2">
              <select
                autoFocus
                defaultValue=""
                onChange={(e) => handleAddConcurrent(e.target.value)}
                className="flex-1 px-2 py-1.5 text-xs sm:text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="" disabled>동시측정 항목 선택...</option>
                {availableForConcurrent.map((item) => (
                  <option key={item.stackMeasurementId} value={item.stackMeasurementId}>
                    {item.pollutantNameKr}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowAddDropdown(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddDropdown(true)}
              disabled={availableForConcurrent.length === 0}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={13} />
              동시측정 항목 추가
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
