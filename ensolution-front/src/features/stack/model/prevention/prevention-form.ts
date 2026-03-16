import type {
  FacilityCreateForm, FacilityUpdateForm, TargetCreateForm, TargetUpdateForm
} from "@stack/model";

export interface PreventionCreateForm {
  stackId: number;
  name: string;
  remark: string;
}

export const getDefaultPreventionCreateForm = (stackId: number):PreventionCreateForm => ({
  stackId: stackId,
  name: "",
  remark: "",
});

export interface PreventionUpdateForm {
  name: string;
  remark: string;
}

export const getDefaultPreventionUpdateForm = () => ({
  name: "",
  remark: "",
});

export interface PreventionBundleCreateForm {
  prevention: PreventionCreateForm;

  facilities: FacilityCreateForm[];
  targets: TargetCreateForm[];
}

export const getDefaultPreventionBundleCreateForm = (stackId: number): PreventionBundleCreateForm  => ({
  prevention: getDefaultPreventionCreateForm(stackId),

  facilities: [],
  targets: [],
});

export interface PreventionBundleUpdateForm {
  prevention: PreventionUpdateForm;

  facilities: FacilityUpdateForm[];
  targets: TargetUpdateForm[];
}

export const getDefaultPreventionBundleUpdateForm = (): PreventionBundleUpdateForm => ({
  prevention: getDefaultPreventionUpdateForm(),

  facilities: [],
  targets: [],
});