import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToast } from "@app/providers/toast";

import { mapPlanCreateFormToRequest } from '@plan/model';
import { usePlanCreateForm, usePlanActions, usePlanRegisterData } from '@plan/hooks';

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
  const { form, errors, resetForm, updateField, setMeasurementItems, validateForm } = usePlanCreateForm();
  const {
    creating,
    createPlan,
  } = usePlanActions();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = mapPlanCreateFormToRequest(form);
    const result = await createPlan(payload);

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
    updateField("stackId", "");
  };

  const handleSelectWorkplace = (id: number) => {
    setWorkplaceId(id);
    setStackId(null)
    updateField("stackId", "");
  };

  const handleSelectStack = (id: number) => {
    setStackId(id);
    fetchStack(id);
    updateField("stackId", String(id));
  };

  const handleSelectTeam = (teamId: number) => {
    updateField("teamId", teamId);

    const selectedTeam = teams.find((t) => t.id === teamId);
    if (selectedTeam) {
      updateField("vehicleNumber", selectedTeam.vehicleNumber);
      updateField("mentor", selectedTeam.mentor);
      updateField("mentee", selectedTeam.mentee);
      updateField("particleSamplerId", selectedTeam.particleSamplerId);
      updateField("gasSamplerId", selectedTeam.gasSamplerId);
      updateField("pitotTubeId", selectedTeam.pitotTubeId);
      updateField("nozzleId", selectedTeam.nozzleId);
    }
  };

  return {
    form,
    errors,
    resetForm,
    updateField,
    setMeasurementItems,

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