import { PITOT_TUBE_OPTIONS } from '@/entities/agency/equipment/model';
import type { ParticleSamplerSpec, GasSamplerSpec, PitotTubeSpec, NozzleSpec, TypedEquipmentResponse } from '@/entities/agency/equipment/model';
import type { EquipmentEditForm } from '@/entities/plan/model';
import { TableLabelCell, TableReadonlyCell, TableSelectableCell, SectionAccordion } from '@shared/ui';

interface EquipmentTabProps {
  equipment: EquipmentEditForm;
  onChange: (name: keyof EquipmentEditForm, value: string) => void;

  particleSamplers: TypedEquipmentResponse[];
  gasSamplers: TypedEquipmentResponse[];
  pitotTubes: TypedEquipmentResponse[];
  nozzles: TypedEquipmentResponse[];

  selectedPS: TypedEquipmentResponse | undefined;
  selectedGS: TypedEquipmentResponse | undefined;
  selectedPT: TypedEquipmentResponse | undefined;
  selectedNZ: TypedEquipmentResponse | undefined;
}

const mobileSectionWrap = "sm:hidden rounded-lg border border-gray-200 overflow-hidden";
const desktopSectionWrap = "hidden sm:block rounded-lg border border-gray-200 overflow-hidden";

export const EquipmentTab = ({
  equipment, onChange,
  particleSamplers, gasSamplers, pitotTubes, nozzles,
  selectedPS, selectedGS, selectedPT, selectedNZ,
}: EquipmentTabProps) => {
  const toOptions = (equips: TypedEquipmentResponse[]) =>
    equips.map(e => ({
      value: e.id,
      label: e.alias ? `${e.alias} (${e.managementNumber})` : e.managementNumber,
    }));

  const getPitotTubeLabel = (type: string) =>
    PITOT_TUBE_OPTIONS.find(o => o.value === type)?.label ?? type;

  return (
    <div className="space-y-6">

      {/* 입자상 시료채취장비 */}
      <SectionAccordion title="1. 입자상 시료채취장비">
        {/* Mobile */}
        <div className={mobileSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>장비 선택</TableLabelCell>
                <TableSelectableCell
                  value={equipment.particleSamplerId ?? ""}
                  onChange={v => onChange("particleSamplerId", v)}
                  options={toOptions(particleSamplers)}
                  colSpan={3}
                />
              </tr>
              {selectedPS && (
                <>
                  <tr>
                    <TableReadonlyCell colSpan={3} label="관리번호" value={selectedPS.managementNumber} />
                  </tr>
                  <tr>
                    <TableReadonlyCell colSpan={3} label="시리얼번호" value={selectedPS.serialNumber} />
                  </tr>
                  <tr>
                    <TableReadonlyCell colSpan={3} label="모델명" value={selectedPS.modelName} />
                  </tr>
                  <tr>
                    <TableReadonlyCell colSpan={3} label="제조사" value={selectedPS.manufacturer} />
                  </tr>
                  <tr>
                    <TableReadonlyCell colSpan={3} label="적산량" value={String((selectedPS.spec as ParticleSamplerSpec).totalVolume)} />
                  </tr>
                  <tr>
                    <TableReadonlyCell label="△H@" value={String((selectedPS.spec as ParticleSamplerSpec).orificeDp)} />
                    <TableReadonlyCell label="Yd" value={String((selectedPS.spec as ParticleSamplerSpec).yd)} />
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Desktop */}
        <div className={desktopSectionWrap}>
          <table className="w-full border-collapse text-sm block sm:table">
            <tbody className="block sm:table-row-group">
              <tr className="grid grid-cols-[8rem_1fr_8rem_1fr_8rem_1fr] sm:table-row">
                <TableLabelCell>장비 선택</TableLabelCell>
                <TableSelectableCell
                  value={equipment.particleSamplerId ?? ""}
                  onChange={v => onChange("particleSamplerId", v)}
                  options={toOptions(particleSamplers)}
                  colSpan={5}
                />
              </tr>
              {selectedPS && (
                <>
                  <tr className="grid grid-cols-[8rem_1fr_8rem_1fr_8rem_1fr] sm:table-row">
                    <TableReadonlyCell label="관리번호" value={selectedPS.managementNumber} />
                    <TableReadonlyCell label="시리얼번호" value={selectedPS.serialNumber} colSpan={3} />
                  </tr>
                  <tr className="grid grid-cols-[8rem_1fr_8rem_1fr_8rem_1fr] sm:table-row">
                    <TableReadonlyCell label="모델명" value={selectedPS.modelName} />
                    <TableReadonlyCell label="제조사" value={selectedPS.manufacturer} colSpan={3} />
                  </tr>
                  <tr className="grid grid-cols-[8rem_1fr_8rem_1fr_8rem_1fr] sm:table-row">
                    <TableReadonlyCell label="적산량" value={String((selectedPS.spec as ParticleSamplerSpec).totalVolume)} />
                    <TableReadonlyCell label="오리피스 보정계수" value={String((selectedPS.spec as ParticleSamplerSpec).orificeDp)} />
                    <TableReadonlyCell label="Yd" value={String((selectedPS.spec as ParticleSamplerSpec).yd)} />
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </SectionAccordion>

      {/* 가스상 시료채취장비 */}
      <SectionAccordion title="2. 가스상 시료채취장비">
        <div className={mobileSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>장비 선택</TableLabelCell>
                <TableSelectableCell
                  value={equipment.gasSamplerId ?? ""}
                  onChange={v => onChange("gasSamplerId", v)}
                  options={toOptions(gasSamplers)}
                />
              </tr>
              {selectedGS && (
                <>
                  <tr>
                    <TableReadonlyCell label="관리번호" value={selectedGS.managementNumber} />
                  </tr>
                  <tr>
                    <TableReadonlyCell label="시리얼번호" value={selectedGS.serialNumber} colSpan={3} />
                  </tr>
                  <tr>
                    <TableReadonlyCell label="모델명" value={selectedGS.modelName} />
                  </tr>
                  <tr>
                    <TableReadonlyCell label="제조사" value={selectedGS.manufacturer} colSpan={3} />
                  </tr>
                  <tr>
                    <TableReadonlyCell label="적산량" value={String((selectedGS.spec as ParticleSamplerSpec).totalVolume)} />
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className={desktopSectionWrap}>
          <table className="w-full border-collapse text-sm block sm:table">
            <tbody className="block sm:table-row-group">
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableLabelCell>장비 선택</TableLabelCell>
                <TableSelectableCell
                  value={equipment.gasSamplerId ?? ""}
                  onChange={v => onChange("gasSamplerId", v)}
                  options={toOptions(gasSamplers)}
                  colSpan={3}
                />
              </tr>
              {selectedGS && (
                <>
                  <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                    <TableReadonlyCell label="관리번호" value={selectedGS.managementNumber} />
                    <TableReadonlyCell label="시리얼번호" value={selectedGS.serialNumber} />
                  </tr>
                  <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                    <TableReadonlyCell label="모델명" value={selectedGS.modelName} />
                    <TableReadonlyCell label="제조사" value={selectedGS.manufacturer} />
                  </tr>
                  <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                    <TableReadonlyCell label="적산량" value={String((selectedGS.spec as GasSamplerSpec).totalVolume)} colSpan={3} />
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </SectionAccordion>

      <SectionAccordion title="3. 피토우관">
        <div className={mobileSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>장비 선택</TableLabelCell>
                <TableSelectableCell
                  value={equipment.pitotTubeId ?? ""}
                  onChange={v => onChange("pitotTubeId", v)}
                  options={toOptions(pitotTubes)}
                  colSpan={3}
                />
              </tr>
              {selectedPT && (
                <>
                  <tr>
                    <TableReadonlyCell label="관리번호" value={selectedPT.managementNumber} />
                  </tr>
                  <tr>
                    <TableReadonlyCell label="모델명" value={selectedPT.modelName} />
                  </tr>
                  <tr>
                    <TableReadonlyCell label="종류" value={getPitotTubeLabel((selectedPT.spec as PitotTubeSpec).pitotTubeType)} />
                  </tr>
                  <tr>
                    <TableReadonlyCell
                      label="피토우관 계수"
                      value={(selectedPT.spec as PitotTubeSpec).coefficients.map(c => c.coefficient).join(', ')}
                      colSpan={3}
                    />
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className={desktopSectionWrap}>
          <table className="w-full border-collapse text-sm block sm:table">
            <tbody className="block sm:table-row-group">
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableLabelCell>장비 선택</TableLabelCell>
                <TableSelectableCell
                  value={equipment.pitotTubeId ?? ""}
                  onChange={v => onChange("pitotTubeId", v)}
                  options={toOptions(pitotTubes)}
                  colSpan={3}
                />
              </tr>
              {selectedPT && (
                <>
                  <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                    <TableReadonlyCell label="관리번호" value={selectedPT.managementNumber} />
                    <TableReadonlyCell label="모델명" value={selectedPT.modelName} />
                  </tr>
                  <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                    <TableReadonlyCell colSpan={3} label="종류" value={getPitotTubeLabel((selectedPT.spec as PitotTubeSpec).pitotTubeType)} />
                  </tr>
                  <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                    <TableReadonlyCell
                      label="피토우관 계수"
                      value={(selectedPT.spec as PitotTubeSpec).coefficients.map(c => c.coefficient).join(', ')}
                      colSpan={3}
                    />
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </SectionAccordion>

      {/* 노즐 */}
      <SectionAccordion title="4. 노즐">
        <div className={mobileSectionWrap}>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <TableLabelCell>장비 선택</TableLabelCell>
                <TableSelectableCell
                  value={equipment.nozzleId ?? ""}
                  onChange={v => onChange("nozzleId", v)}
                  options={toOptions(nozzles)}
                  colSpan={3}
                />
              </tr>
              {selectedNZ && (
                <>
                  <tr>
                    <TableReadonlyCell label="관리번호" value={selectedNZ.managementNumber} />
                  </tr>
                  <tr>
                    <TableReadonlyCell label="모델명" value={selectedNZ.modelName} />
                  </tr>
                  <tr>
                    <TableReadonlyCell
                      label="노즐 직경 (cm)"
                      value={(selectedNZ.spec as NozzleSpec).diameters.map(d => d.diameter).join(', ')}
                      colSpan={3}
                    />
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className={desktopSectionWrap}>
          <table className="w-full border-collapse text-sm block sm:table">
            <tbody className="block sm:table-row-group">
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableLabelCell>장비 선택</TableLabelCell>
                <TableSelectableCell
                  value={equipment.nozzleId ?? ""}
                  onChange={v => onChange("nozzleId", v)}
                  options={toOptions(nozzles)}
                  colSpan={3}
                />
              </tr>
              {selectedNZ && (
                <>
                  <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                    <TableReadonlyCell label="관리번호" value={selectedNZ.managementNumber} />
                    <TableReadonlyCell label="모델명" value={selectedNZ.modelName} />
                  </tr>
                  <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                    <TableReadonlyCell
                      label="노즐 직경 (cm)"
                      value={(selectedNZ.spec as NozzleSpec).diameters.map(d => d.diameter).join(', ')}
                      colSpan={3}
                    />
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </SectionAccordion>
    </div>
  );
};
