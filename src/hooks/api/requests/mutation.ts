import { useMutation } from "@tanstack/react-query"
import apiRequest from '@/config/request'
import type { UpdatePayload } from "@/types/update";
import { toast } from "sonner";

export const useUpdateCompanyInfo = (
  onSuccessCallback?: () => void
) => {
  return useMutation({
    mutationFn: (payload: UpdatePayload) =>
      apiRequest.post("/api/v1/update-requests", payload).then(res => res.data),

    onSuccess: () => {
      toast.success("Cập nhật thông tin công ty thành công");
      onSuccessCallback?.();
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Cập nhật thông tin công ty thất bại";
      toast.error(message);
    },
  });
};