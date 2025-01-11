import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useContentType } from '../../store/useContentType';

const useTrendingContent = () => {
  const { contentType } = useContentType();
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrendingContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.get(`/api/${contentType}/trending`);
      if (status === 200) {
        setContent(data.data);
        setIsLoading(false);
      } else {
        setContent('no trending content found');
      }
    } catch (err) {
      setError(err.message);
    }
  }, [contentType]);

  useEffect(() => {
    fetchTrendingContent();
  }, [fetchTrendingContent]);

  return { content, error, isLoading , setIsLoading };
};

export default useTrendingContent;