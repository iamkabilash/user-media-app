import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "../Components/Button";
import Skeleton from "./Skeleton";
import UsersListItem from "./UsersListItem";

function UsersList() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);

  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCreatingUserError] = useState(null);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .then(() => setIsLoadingUsers(false))
      .catch((err) => {
        setLoadingUsersError(err);
        setIsLoadingUsers(false);
      });
  }, [dispatch]);

  const handleUserAdd = () => {
    setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap()
      .then(() => setIsCreatingUser(false))
      .catch((err) => {
        setCreatingUserError(err);
        setIsCreatingUser(false);
      });
  };

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-fill" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h2 className="m-2 text-xl">Users</h2>
        <Button success onClick={handleUserAdd} loading={isCreatingUser}>
          + Add user
        </Button>
        {creatingUserError && "Error creating user"}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
