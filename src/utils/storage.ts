import { UserLocalData } from "../context/authTypes"
import { AUTH_DATA_KEY } from "./constants"

// dummy authorization storages
export const getAuthorizedData = (): UserLocalData | null => {
    const data = localStorage.getItem(AUTH_DATA_KEY)
    return data ? JSON.parse(data) : null
}
export const setAuthorizedData = (data: UserLocalData): void => {
    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(data))
}
export const removeAuthorizedData = () => {
    localStorage.removeItem(AUTH_DATA_KEY)
}