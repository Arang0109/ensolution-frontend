export interface CompanyCreateForm {
  name: string;
  address: string;
  ceoName: string;
  bizNumber: string;
  remark: string;
}

export const getDefaultCompanyForm = (): CompanyCreateForm => ({
  name: "",
  address: "",
  ceoName: "",
  bizNumber: "",
  remark: "",
});