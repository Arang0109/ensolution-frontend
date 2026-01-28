import { useState, useEffect, useCallback } from "react";

import { useToast } from "@common/hooks";
import { getEquipments } from "@equipment/api/EquipmentApi";

import type { EquipmentResponse } from "@equipment/model";

export const useEquipments = () => {
  const [equipments, setEquipments] = useState<EquipmentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const fetchEquipments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getEquipments();
      setEquipments(res.status && res.data ? res.data : []);
    } catch (error) {
      console.error(error);
      showToast('장비 목록을 불러오지 못했습니다.', 'error');
      setEquipments([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchEquipments();
  }, [fetchEquipments]);

  return {
    equipments,
    loading,
    refetch: fetchEquipments
  }
}
