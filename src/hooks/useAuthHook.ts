import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAuthorizedData } from "../utils/storage";

export const useAuthHook = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation()
    useEffect(() => {
        const authData = getAuthorizedData()
        if (authData) {
            navigate(pathname)
        } else {
            navigate("/sign-in")
        }
    }, []);
}