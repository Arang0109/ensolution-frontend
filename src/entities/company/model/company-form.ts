export interface CompanyCreateForm {
  name: string;
  address: string;
  ceoName: string;
  bizNumber: string;
  remark: string;
}

export const getDefaultCompanyCreateForm = (): CompanyCreateForm => ({
  name: "",
  address: "",
  ceoName: "",
  bizNumber: "",
  remark: "",
});

export interface CompanyUpdateForm {
  name: string;
  address: string;
  ceoName: string;
  bizNumber: string;
  remark: string;
}

export const getDefaultCompanyUpdateForm = (): CompanyUpdateForm => ({
  name: "",
  address: "",
  ceoName: "",
  bizNumber: "",
  remark: "",
});