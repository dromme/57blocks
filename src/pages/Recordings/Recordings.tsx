
import styles from './Recordings.module.scss';
import { useState } from 'react';
import { useFavorites } from '@/utils/Recordings';
import useRecordings from './useRecordings';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RecordingCard, RecordingSearchBar } from '@/components';

const LIMIT = 20;

const Recordings = () => {
  const [query, setQuery] = useState('');
  const { recordings, suggestions, fetchData, fetchSuggestions, hasMore, isLoading } = useRecordings({ limit: LIMIT });
  const { enhanceAllWithFavorite, saveNewFavorite } = useFavorites();
  const recordingsWithFavorites = enhanceAllWithFavorite(recordings);

  const handleSearch = async (value: string) => {
    await fetchData(value, { reset: true });
  }

  const handleOnSearchType = async (value: string) => {
    setQuery(value);
    await fetchSuggestions(value);
  }

  return (
    <div className={styles.page}>
      <RecordingSearchBar
        suggestions={suggestions}
        value={query}
        onSearch={handleSearch}
        onChange={handleOnSearchType}
      />
      <InfiniteScroll
        className={styles.list}
        dataLength={recordingsWithFavorites.length}
        next={() => fetchData(query)}
        scrollThreshold={1}
        hasMore={hasMore}
        loader={isLoading && <div>...loading</div>}
        endMessage={<p>Yay! You have seen it all :)</p>
        }
      >
        {recordingsWithFavorites?.map((song: Recording) =>
          <RecordingCard
            onFavorite={saveNewFavorite}
            key={song.id}
            song={song} />
        )}
      </InfiniteScroll>
    </div>
  )
}

export default Recordings;
