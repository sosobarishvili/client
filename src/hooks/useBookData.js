import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const API_URL = 'https://server-1mgg.onrender.com/api/books';

const useBookData = (initialParams) => {
  const [params, setParams] = useState(initialParams);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = useCallback(async (isNewSearch = false, paramsArg = params) => {
    if (isLoading) return;

    setIsLoading(true);
    const currentPage = isNewSearch ? 1 : page;

    try {
      const response = await axios.get(API_URL, {
        params: { ...paramsArg, page: currentPage },
      });

      const newBooks = response.data;
      setBooks(prevBooks => (isNewSearch ? newBooks : [...prevBooks, ...newBooks]));
      setHasMore(newBooks.length > 0);
      if (!isNewSearch) {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading]);

  useEffect(() => {
    setPage(1);
    setBooks([]);
    setHasMore(true);

    const handler = setTimeout(() => {
      fetchBooks(true, params);
    }, 300);

    return () => clearTimeout(handler);
  }, [params]);

  const handleParamChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const exportToCSV = () => {
    const dataToExport = books.map(book => ({
      Index: book.index,
      ISBN: book.isbn,
      Title: book.title,
      Authors: book.authors,
      Publisher: book.publisher,
      Likes: book.likes
    }));

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'books.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    books,
    hasMore,
    fetchBooks,
    exportToCSV,
    handleParamChange,
    params
  };
};

export default useBookData;
