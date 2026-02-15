export interface FacilityCreateForm {
  name: string;
  fuelUsage: string;
  itemOutput: string;
  fuelInput: string;
  fuelType: string;
  remark: string;
}

export const getDefaultFacilityCreateForm = (): FacilityCreateForm => ({
  name: "",
  fuelUsage: "",
  itemOutput: "",
  fuelInput: "",
  fuelType: "",
  remark: "",
});

export interface FacilityUpdateForm {
  id: number | null;
  name: string;
  fuelUsage: string;
  itemOutput: string;
  fuelInput: string;
  fuelType: string;
  remark: string;
}

export const getDefaultFacilityUpdateForm = (facilityId: number | null): FacilityUpdateForm => ({
  id: facilityId,
  name: "",
  fuelUsage: "",
  itemOutput: "",
  fuelInput: "",
  fuelType: "",
  remark: "",
});