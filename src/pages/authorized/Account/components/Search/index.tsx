import {
  ChangeEvent,
  FC,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import InputField from "../../../../../components/UI/InputField";
import Button from "../../../../../components/UI/Button";
import "./Search.scss";
import { useNavigate, useParams } from "react-router";

const Search: FC = (): ReactElement => {
  const [userIdentofier, setUserIdentifier] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (userId) {
      setUserIdentifier(userId);
    }
  }, []);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserIdentifier(e.target.value);
  };
  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/account/${userIdentofier}`);
  };
  return (
    <div className="search">
      <h2 className="search__title">Search user by ID!</h2>
      <p className="search__subtitle">
        Type any possible number in the field and search
      </p>
      <form className="search__field" onSubmit={onSearch}>
        <InputField
          type="number"
          label="User ID"
          onChange={onChangeHandler}
          value={userIdentofier}
        />
        <Button
          type="submit"
          label="Search"
          disabled={!userIdentofier.length || userIdentofier === userId}
        />
      </form>
    </div>
  );
};

export default Search;
