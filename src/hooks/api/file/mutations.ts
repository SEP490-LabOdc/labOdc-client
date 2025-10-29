import { useMutation } from '@tanstack/react-query'
import apiRequest from '@/config/request.ts'

export const useUploadFile = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await apiRequest.post('/api/v1/files/upload', formData)

      return data
    }
  })
}