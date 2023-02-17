import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { useRemoveAlbumMutation } from "../store";

function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();
  const handleRemoveAlbum = () => {
    removeAlbum(album);
  };

  const header = (
    <div className="flex flex-row items-center gap-[20px]">
      <Button danger onClick={handleRemoveAlbum} loading={results.isLoading}>
        <GoTrashcan />
      </Button>
      <div>{album.title}</div>
    </div>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      List of photos in this album.
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
