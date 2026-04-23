import { axiosPrivate } from "@/shared/api";

export const downloadReportRequest = async (planId: number) => {
  const response = await axiosPrivate.get(`/reports/${planId}/download`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: response.headers["content-type"] });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `report-${planId}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
};