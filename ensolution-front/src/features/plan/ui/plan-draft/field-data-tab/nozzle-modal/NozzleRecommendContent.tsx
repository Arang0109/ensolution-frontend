import { useState, useMemo } from "react";

import { IconButton, InputField } from "@shared/ui";
import { X } from "lucide-react";
import type { MeasurementSheetEditForm, ParticleSampleEditForm } from "@/entities/plan/model";

interface RecommendItem {
  nozzle: number;
  orificeDp: number | null;
  Vm: number | null;
  Vlc: number | null;
  samplingTime: number | null;
}

interface ContentProps {
  onClose: () => void;
  onSuccess: () => void;
  recommendList: RecommendItem[];
  sheet: MeasurementSheetEditForm;
  onParticleSampleChange: (name: keyof ParticleSampleEditForm, value: string | null) => void;
}

export const NozzleRecommendContent = ({ onClose, recommendList, sheet, onParticleSampleChange }: ContentProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [rangeMin, setRangeMin] = useState(10);
  const [rangeMax, setRangeMax] = useState(40);

  const filteredList = useMemo(
    () =>
      recommendList.filter(
        (item) => item.orificeDp === null || (item.orificeDp >= rangeMin && item.orificeDp <= rangeMax)
      ),
    [recommendList, rangeMin, rangeMax]
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base md:text-2xl font-bold text-gray-800">적정 노즐사이즈 산정</h2>
        <IconButton icon={<X />} title="닫기" size="md" onClick={onClose} />
      </div>
      <div>
        <InputField
          label="채취하고자 하는 흡입량 (m³)"
          value={sheet.particleSample.Vr}
          onChange={(value) => onParticleSampleChange("Vr", value)}
        />
      </div>

      {recommendList.length > 0 && (
        <>
          {/* 오리피스 차압 범위 슬라이더 */}
          <div className="mt-4 px-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500">오리피스 차압 범위</span>
              <span className="text-xs text-blue-600 font-medium">
                {rangeMin} ~ {rangeMax}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-400 w-6 text-right">최소</span>
                <input
                  type="range"
                  min={0}
                  max={60}
                  value={rangeMin}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val <= rangeMax) setRangeMin(val);
                  }}
                  className="w-full h-1.5 accent-blue-500 cursor-pointer"
                />
                <span className="text-[10px] text-gray-700 w-8">{rangeMin}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-gray-400 w-6 text-right">최대</span>
                <input
                  type="range"
                  min={0}
                  max={60}
                  value={rangeMax}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= rangeMin) setRangeMax(val);
                  }}
                  className="w-full h-1.5 accent-blue-500 cursor-pointer"
                />
                <span className="text-[10px] text-gray-700 w-8">{rangeMax}</span>
              </div>
            </div>
          </div>

          {/* 노즐 추천 목록 */}
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              노즐 추천 목록{" "}
              <span className="normal-case font-normal text-gray-400">
                ({filteredList.length}건)
              </span>
            </p>
            <div className="space-y-2 overflow-y-auto max-h-64 min-h-[10rem] pr-1">
              {filteredList.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">
                  해당 범위의 추천 항목이 없습니다.
                </p>
              ) : (
                filteredList.map((item, index) => {
                  const originalIndex = recommendList.indexOf(item);
                  const isSelected = selectedIndex === originalIndex;
                  return (
                    <label
                      key={originalIndex}
                      className={`flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                        isSelected
                          ? "border-blue-400 bg-blue-50"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <input
                        key={index}
                        type="radio"
                        name="nozzle-recommend"
                        checked={isSelected}
                        onChange={() => {
                          setSelectedIndex(originalIndex);
                          onParticleSampleChange("nozzleSize", String(item.nozzle));
                        }}
                        className="mt-0.5 accent-blue-500 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-gray-700">
                            노즐직경 {item.nozzle} cm
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-gray-400 text-[10px]">오리피스차압</span>
                            <span className="font-medium text-gray-800">{item.orificeDp ?? "-"}</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-gray-400 text-[10px]">채취시간</span>
                            <span className="font-medium text-gray-800">
                              {item.samplingTime ?? "-"} 분
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-gray-400 text-[10px]">채취량</span>
                            <span className="font-medium text-gray-800">
                              {item.Vm ?? "-"} m³
                            </span>
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
