import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToast } from "@app/providers/toast";

import { mapPlanCreateFormToRequest } from '@plan/model';
import { usePlanCreate, usePlanActions, usePlanRegisterData } from '@plan/hooks';

import { EquipType } from '@equipment/model';

export const usePlanRegisterViewModel = () => {
  const navigate = useNavigate();
  const goBack = () => {navigate("/plan")};
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [workplaceId, setWorkplaceId] = useState<number | null>(null);
  const [stackId, setStackId] = useState<number | null>(null);

  const { showToast } = useToast();

  const {
    companies, workplaces, stacks,
    stack, fetchStack,
    teams, users, equipments
  } = usePlanRegisterData();
  const { form, errors, reset, onChange, onMeasurementIdsChange, validate } = usePlanCreate();
  const {
    creating,
    handleCreate,
  } = usePlanActions();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = mapPlanCreateFormToRequest(form);
    const result = await handleCreate(payload);

    if (result.success) {
      showToast("측정계획이 생성되었습니다.");
      goBack();
    } else {
      showToast(result?.message, "error");
    }
  }

  const filteredParticleSampler = useMemo(() => {
    if (!equipments) return [];
    return equipments.filter(
      e => e.type === EquipType.PARTICLE_SAMPLER
    );
  }, [equipments]);

  const filteredGasSampler = useMemo(() => {
    if (!equipments) return [];
    return equipments.filter(
      e => e.type === EquipType.GAS_SAMPLER
    );
  }, [equipments]);

  const filteredPitotTube = useMemo(() => {
    if (!equipments) return [];
    return equipments.filter(
      e => e.type === EquipType.PITOT_TUBE
    );
  }, [equipments]);

  const filteredNozzle = useMemo(() => {
    if (!equipments) return [];
    return equipments.filter(
      e => e.type === EquipType.NOZZLE
    );
  }, [equipments]);

  const filteredWorkplaces = useMemo(() => {
    if (!companyId) return [];
    return workplaces.filter(
      w => Number(w.companyId) === companyId
    );
  }, [workplaces, companyId]);

  const filteredStacks = useMemo(() => {
    if (!workplaceId) return [];
    return stacks.filter(
      s => Number(s.workplaceId) === workplaceId
    );
  }, [stacks, workplaceId]);

  const handleSelectCompany = (id: number) => {
    setCompanyId(id);
    setWorkplaceId(null);
    setStackId(null)
    onChange("stackId", "");
  };

  const handleSelectWorkplace = (id: number) => {
    setWorkplaceId(id);
    setStackId(null)
    onChange("stackId", "");
  };

  const handleSelectStack = (id: number) => {
    setStackId(id);
    fetchStack(id);
    onChange("stackId", String(id));
  };

  const handleSelectTeam = (teamId: number) => {
    onChange("teamId", teamId);

    const selectedTeam = teams.find((t) => t.id === teamId);
    if (selectedTeam) {
      onChange("mentor", selectedTeam.mentor);
      onChange("mentee", selectedTeam.mentee);
      onChange("particleSamplerId", selectedTeam.particleSamplerId);
      onChange("gasSamplerId", selectedTeam.gasSamplerId);
      onChange("pitotTubeId", selectedTeam.pitotTubeId);
      onChange("nozzleId", selectedTeam.nozzleId);
    }
  };

  return {
    form,
    errors,
    reset,
    onChange,
    onMeasurementIdsChange,

    creating,

    companies,
    filteredWorkplaces,
    filteredStacks,

    teams,
    users,
    filteredParticleSampler,
    filteredGasSampler,
    filteredPitotTube,
    filteredNozzle,
    handleSelectTeam,

    stack,

    selectedCompanyId: companyId,
    selectedWorkplaceId: workplaceId,
    selectedStackId: stackId,

    handleSelectCompany,
    handleSelectWorkplace,
    handleSelectStack,
    
    goBack,
    handleSubmit,
  }
}