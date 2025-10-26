import { useMutation } from '@tanstack/react-query'
import apiRequest from '@/config/request.ts'

export const useUploadFile = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const { data } = await apiRequest.post('/api/v1/files/upload', file)

      return data
    }
  })
}