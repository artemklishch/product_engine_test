import { UserData } from "./authTypes"
import { ErrorData } from "./types"

export type UsersProvider = {
    userData: null | UserData
    fetchUserData: (userId: number) => Promise<UserData | ErrorData>
    updateUserData: (userData: UserData) => Promise<UserData | ErrorData>
}