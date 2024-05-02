import useFavorites from '@/utils/Recordings/useFavorites';
import { RecordingCard } from '@/components';

const Favorites = () => {
  const { favorites, saveNewFavorite } = useFavorites()

  return (
    <div>
      {favorites?.map((song: Recording) =>
        <RecordingCard
          onFavorite={saveNewFavorite}
          key={song.id}
          song={song} />)}
    </div>
  )
}

export default Favorites;
