import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user); // user is the query argument in albumsApi.js
  // console.log(data, error, isLoading);
  // console.log(useFetchAlbumsQuery(user));

  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isLoading) {
    content = <Skeleton times={3} className="h-10 w-full" />;
  } else if (error) {
    content = <div>Error loading albums...</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }

  return (
    <dir>
      <div className="flex flex-row justify-between items-center my-[20px]">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button success loading={results.isLoading} onClick={handleAddAlbum}>
          + Add album
        </Button>
      </div>
      <div>{content}</div>
    </dir>
  );
}

export default AlbumsList;
