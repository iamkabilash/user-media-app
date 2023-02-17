import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function UsersListItem({ user }) {
  const [isRemovingUsers, setIsRemovingUsers] = useState(false);
  const [removingUsersError, setRemovingUsersError] = useState(null);

  const dispatch = useDispatch();

  const handleRemoveUser = () => {
    setIsRemovingUsers(true);
    dispatch(removeUser(user))
      .unwrap()
      .then(() => setIsRemovingUsers(false))
      .catch((err) => {
        setRemovingUsersError(err);
        setIsRemovingUsers(false);
      });
  };

  const header = (
    <Fragment>
      <Button danger loading={isRemovingUsers} onClick={handleRemoveUser}>
        <GoTrashcan />
      </Button>
      {removingUsersError && <div>Error deleting user</div>}
      {user.name}
    </Fragment>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
