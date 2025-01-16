import { UserData } from "../context/authTypes"

export async function fetchUser(userId: string | number): Promise<UserData> {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`)
    const data = await response.json()
    return data
}

export async function addUpdateUser(userData: UserData, method: "POST" | "PUT") {
    // dummy method to update user
    return userData
}