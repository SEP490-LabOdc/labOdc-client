import axiosInstance from '@/lib/axios.ts'
import { SIGNIN } from './endpoints.ts'
import type { IUserLoginPayload } from './mutations/types.ts'

const login = async (payload: IUserLoginPayload) => {
  const response = await axiosInstance.post(SIGNIN, payload)
  return response.data.data
}

export { login }