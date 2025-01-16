import {
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getAuthorizedData,
  removeAuthorizedData,
  setAuthorizedData,
} from "../utils/storage";
import {
  DUMMY_PASSWORD,
  DUMMY_USER_ID,
  DUMMY_USERNAME,
} from "../utils/constants";
import { fetchUser } from "../api/users";
import { UserData, AuthProvider } from "./authTypes";
import { ErrorData } from "./types";

const intialValues: AuthProvider = {
  user: null,
  signIn: () =>
    Promise.resolve({
      error: "",
    }),
  signOut: () => {},
};

export const AuthContext = createContext<AuthProvider>(intialValues);

interface Props {
  children: ReactNode;
}
const AuthContextProvider: FC<Props> = ({ children }): ReactElement => {
  const [authData, setAuthData] = useState<UserData | null>(null);

  useEffect(() => {
    const data = getAuthorizedData();
    if (data) {
      fetchUserHandler(data.userId);
    }
  }, []);

  const signIn = useCallback(
    async (
      username: string,
      password: string
    ): Promise<UserData | ErrorData> => {
      if (username !== DUMMY_USERNAME || password !== DUMMY_PASSWORD) {
        return { error: "Incorrect username or password" };
      }
      try {
        const data = await fetchUserHandler(DUMMY_USER_ID);
        setAuthorizedData({ userId: data.id });
        return data;
      } catch (err) {
        if (err instanceof Error) {
          return { error: `Error occured while fetching user: ${err.message}` };
        }
        return { error: "Error occured while fetching user" };
      }
    },
    []
  );

  const fetchUserHandler = useCallback(async (userId: number) => {
    const data = await fetchUser(userId);
    data.username = DUMMY_USERNAME; // dummy username
    setAuthData(data);
    return data;
  }, []);

  const signOut = useCallback(() => {
    setAuthData(null);
    removeAuthorizedData();
  }, []);

  const values = useMemo<AuthProvider>(
    () => ({
      user: authData,
      signIn,
      signOut,
    }),
    [authData]
  );
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
