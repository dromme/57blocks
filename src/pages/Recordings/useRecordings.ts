
import { getRecordings } from "@/api/musicBrainzApi";
import { useState } from "react";

const useRecordings = ({ limit }: { limit: number }) => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [suggestions, setSuggestions] = useState<Recording[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (query: string, { reset = false } = {}) => {
    setIsLoading(true);
    if (reset) {
      setPage(1);
      setRecordings([]);
    }

    try {
      const offset = (page - 1) * limit
      const { recordings: newRecordings, count } = await getRecordings({ query, offset, limit });
      setRecordings((oldRecordings) => [...oldRecordings, ...newRecordings]);
      setHasMore(count > (page * limit));
      setPage(page + 1);
    } catch (error) {
      console.error('There was an error');
    } finally {
      setIsLoading(false);
    }
  }

  const fetchSuggestions = async (query: string) => {
    try {
      const { recordings } = await getRecordings({ query, offset: 1, limit: 5 });
      setSuggestions(recordings)
    } catch (e) {
      console.error('There was an error');
    }
  }

  return { recordings, suggestions, fetchData, fetchSuggestions, hasMore, isLoading };
};

export default useRecordings;
