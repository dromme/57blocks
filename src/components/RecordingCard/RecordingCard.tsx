import { Link } from 'react-router-dom';
import styles from './RecordingCard.module.scss';

interface SongCardProps {
  song: Recording,
  onFavorite: (song: Recording) => void
}

const SongCard = ({ song, onFavorite }: SongCardProps) => {
  return (
    <div className={styles.box}>
      <div className={styles.details}>
        <span>{song.title}</span>
        <div >
          {song.artists?.map(artist => {
            return <span
              key={artist.id}
              className={styles.artist}>
              {artist.name}</span>
          })}
        </div>
        <Link target="_blank" to={`/song/${song.id}`}>{`more >>`}</Link>
      </div>
      <span
        className={`${styles.favorite} ${song.isFavorite && styles.favorited}`}
        onClick={() => onFavorite(song)}>
        ♥️
      </span>
    </div>
  )
}

export default SongCard;