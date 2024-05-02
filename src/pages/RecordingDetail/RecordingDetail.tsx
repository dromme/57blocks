import { useParams } from 'react-router';
import styles from './RecordingDetail.module.scss';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/utils/Recordings';
import useRecordingDetail from './useRecordingDetail';

const RecordingDetail = () => {
  const { id = '' } = useParams();
  const { recording, isLoading } = useRecordingDetail(id || '');
  const { enhanceWithFavorite, saveNewFavorite } = useFavorites();
  const recordingEnhance = enhanceWithFavorite(recording);

  return (
    <div className={styles.container} >
      <Link to='/'> {`< back home`} </Link>
      {isLoading ? <div className={styles.title}>...loading</div> :
        <>
          <div className={styles.titleBox}>
            <span>Song:</span>
            <h1 className={styles.title}> {recordingEnhance?.title}</h1>
            <span
              className={`${styles.favorite} ${recordingEnhance.isFavorite && styles.favorited}`}
              onClick={() => saveNewFavorite(recordingEnhance)}>
              ♥️
            </span>
          </div>
          <div className={styles.box}>
            <span>Artists:</span>
            <div>
              {recordingEnhance?.artists?.map(artist => {
                return <span
                  key={artist.id}
                  className={styles.artist}>
                  {artist.name}</span>
              })}
            </div>
          </div>
        </>}
    </div >
  )
}

export default RecordingDetail;