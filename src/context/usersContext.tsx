import {
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import {} from "../utils/constants";
import { fetchUser, addUpdateUser } from "../api/users";
import { UsersProvider } from "./usersTypes";
import { UserData } from "./authTypes";
import { ErrorData } from "./types";

const intialValues = {
  userData: null,
  fetchUserData: () =>
    Promise.resolve({
      error: "",
    }),
  updateUserData: () =>
    Promise.resolve({
      error: "",
    }),
};

export const UsersContext = createContext<UsersProvider>(intialValues);

interface Props {
  children: ReactNode;
}
const UsersContextProvider: FC<Props> = ({ children }): ReactElement => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserData = useCallback(
    async (userId: number): Promise<UserData | ErrorData> => {
      try {
        const data = await fetchUser(userId);
        if (Object.keys(data).length) {
          setUserData(data);
        } else {
          setUserData(null);
        }
        return data;
      } catch (err) {
        setUserData(null);
        if (err instanceof Error) {
          return { error: `Error occured while fetching user: ${err.message}` };
        }
        return { error: "Error occured while fetching user" };
      }
    },
    []
  );

  const updateUserData = useCallback(
    async (userData: UserData): Promise<UserData | ErrorData> => {
      try {
        const data = await addUpdateUser(userData, "PUT"); // dummy method
        setUserData(data);
        return data;
      } catch (err) {
        if (err instanceof Error) {
          return { error: `Failed to update user data: ${err.message}` };
        }
        return { error: "Failed to update user data" };
      }
    },
    []
  );

  const values = useMemo<UsersProvider>(
    () => ({
      userData,
      fetchUserData,
      updateUserData,
    }),
    [userData]
  );
  return (
    <UsersContext.Provider value={values}>{children}</UsersContext.Provider>
  );
};

export default UsersContextProvider;
