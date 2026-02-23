import { useEquipments } from '@equipment/hooks';
import { EquipType, PITOT_TUBE_OPTIONS } from '@equipment/model';
import type { ParticleSamplerSpec, GasSamplerSpec, PitotTubeSpec, NozzleSpec } from '@equipment/model';
import type { EquipmentEditForm } from '@plan/model';
import { TableReadonlyCell, TableSelectableCell } from '@shared/ui';

interface EquipmentTabProps {
  equipment: EquipmentEditForm;
  onChange: (name: keyof EquipmentEditForm, value: string) => void;
}

export const EquipmentTab = ({ equipment, onChange }: EquipmentTabProps) => {
  const { equipments } = useEquipments();

  const particleSamplers = equipments.filter(e => e.type === EquipType.PARTICLE_SAMPLER);
  const gasSamplers = equipments.filter(e => e.type === EquipType.GAS_SAMPLER);
  const pitotTubes = equipments.filter(e => e.type === EquipType.PITOT_TUBE);
  const nozzles = equipments.filter(e => e.type === EquipType.NOZZLE);

  const selectedPS = particleSamplers.find(e => e.id === equipment.particleSamplerId);
  const selectedGS = gasSamplers.find(e => e.id === equipment.gasSamplerId);
  const selectedPT = pitotTubes.find(e => e.id === equipment.pitotTubeId);
  const selectedNZ = nozzles.find(e => e.id === equipment.nozzleId);

  const toOptions = (equips: typeof equipments) =>
    equips.map(e => ({
      value: e.id,
      label: e.alias ? `${e.alias} (${e.managementNumber})` : e.managementNumber,
    }));

  const getPitotTubeLabel = (type: string) =>
    PITOT_TUBE_OPTIONS.find(o => o.value === type)?.label ?? type;

  return (
    <div className="space-y-6">

      {/* 입자상 시료채취장비 */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">입자상 시료채취장비</h3>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full border-collapse text-sm block sm:table">
            <tbody className="block sm:table-row-group">
              <tr className="grid grid-cols-[8rem_1fr_8rem_1fr_8rem_1fr] sm:table-row">
                <TableSelectableCell
                  label="장비 선택"
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
      </section>

      {/* 가스상 시료채취장비 */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">가스상 시료채취장비</h3>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full border-collapse text-sm block sm:table">
            <tbody className="block sm:table-row-group">
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableSelectableCell
                  label="장비 선택"
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
      </section>

      {/* 피토우관 */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">피토우관</h3>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full border-collapse text-sm block sm:table">
            <tbody className="block sm:table-row-group">
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableSelectableCell
                  label="장비 선택"
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
                    <TableReadonlyCell label="시리얼번호" value={selectedPT.serialNumber} />
                  </tr>
                  <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                    <TableReadonlyCell label="모델명" value={selectedPT.modelName} />
                    <TableReadonlyCell label="종류" value={getPitotTubeLabel((selectedPT.spec as PitotTubeSpec).pitotTubeType)} />
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
      </section>

      {/* 노즐 */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">노즐</h3>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full border-collapse text-sm block sm:table">
            <tbody className="block sm:table-row-group">
              <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                <TableSelectableCell
                  label="장비 선택"
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
                    <TableReadonlyCell label="시리얼번호" value={selectedNZ.serialNumber} />
                  </tr>
                  <tr className="grid grid-cols-[8rem_1fr] sm:table-row">
                    <TableReadonlyCell label="모델명" value={selectedNZ.modelName} />
                    <TableReadonlyCell label="제조사" value={selectedNZ.manufacturer} />
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
      </section>

    </div>
  );
};
