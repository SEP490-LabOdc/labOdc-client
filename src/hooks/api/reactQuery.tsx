import axios from 'axios'
import { MutationCache, QueryClient } from '@tanstack/react-query'
import { ApiErrorTypes, type TApiErrors } from './types.ts'
import { toast } from 'sonner'

export const onRequestError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status
    const serverResponse = error.response?.data as TApiErrors | { message?: string }

    // Log message từ API nếu status code là 400 hoặc 503
    if (statusCode === 400 || statusCode === 503) {
      // Lấy message từ response, ưu tiên message từ API
      let errorMessage = 'Đã xảy ra lỗi'

      if (serverResponse) {
        // Kiểm tra nếu là TApiErrors có message
        if ('message' in serverResponse && typeof serverResponse.message === 'string') {
          errorMessage = serverResponse.message
        } else if ('error' in serverResponse && 'message' in serverResponse) {
          // Nếu là TApiErrors
          errorMessage = (serverResponse as TApiErrors).message || errorMessage
        }
      }

      // Fallback về error.message nếu không có message từ API
      if (errorMessage === 'Đã xảy ra lỗi' && error.message) {
        errorMessage = error.message
      }

      // Hiển thị toast với message từ API
      toast.error(errorMessage)
      return
    }

    // Xử lý các lỗi validation
    if (serverResponse && 'error' in serverResponse && serverResponse.error === ApiErrorTypes.ValidationError) {
      toast.error("Please check the input and try again.")
      return
    }
  }
}

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: onRequestError
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});