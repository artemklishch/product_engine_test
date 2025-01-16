import { FC, ReactElement, useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import UserValue from "./components/UserValue";
import { UsersContext } from "../../../../../context/usersContext";

const UserData: FC = (): ReactElement => {
  const { userId } = useParams();
  const { userData, fetchUserData } = useContext(UsersContext);
  useEffect(() => {
    if (userId && !Number.isNaN(+userId)) {
      fetchUserData(+userId);
    }
  }, [userId]);
  const address = useMemo(() => {
    let value = "";
    if (userData) {
      value = `${userData.address.street}, ${userData.address.suite}, ${userData.address.city}, ${userData.address.zipcode}`;
    }
    return value;
  }, [userData]);
  return (
    <div>
      {userData ? (
        <div>
          <h3>User data:</h3>
          <UserValue
            label="User ID"
            defaultValue={userData.id.toString()}
            datakey="id"
          />
          <UserValue
            editable
            label="User name"
            defaultValue={userData.name}
            datakey="name"
          />
          <UserValue
            label="Address"
            editable
            defaultValue={{
              value: address,
              allValues: userData.address,
              errors: {},
            }}
            datakey="address"
          />
        </div>
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

export default UserData;
