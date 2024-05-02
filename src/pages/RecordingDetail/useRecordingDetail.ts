
import { getRecordingDetail } from "@/api/musicBrainzApi";
import { useCallback, useEffect, useState } from "react";

const useRecordingDetail = (id: string) => {
  const [recording, setRecording] = useState<Recording | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getRecordingDetail(id);
      setRecording(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [id])

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id])

  return { recording, fetchData, isLoading };
};

export default useRecordingDetail;
