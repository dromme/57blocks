
import { STATE_KEYS, useLocalStorage } from "../LocalStorage";

const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage(STATE_KEYS.FAVORITES, [])

  const isFavorite = (id: string) => !!favorites.find((favorite: Recording) => id === favorite.id)

  const enhanceWithFavorite = (recording: Recording) => ({ ...recording, isFavorite: isFavorite(recording?.id) });

  const enhanceAllWithFavorite = (list: Recording[]) => list.map(recording => enhanceWithFavorite(recording));

  const saveNewFavorite = (newFavorite: Recording) => {

    let newFavorites = []
    if (!newFavorite.isFavorite) {
      newFavorites = ([...favorites, { ...newFavorite, isFavorite: true }]);
    } else {
      newFavorites = favorites.filter((song: Recording) => song.id !== newFavorite.id);
    }

    setFavorites(newFavorites);
  }

  return { favorites, saveNewFavorite, enhanceAllWithFavorite, enhanceWithFavorite };

};

export default useFavorites;
