import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const API_URL = 'https://server-1mgg.onrender.com/api/books';

const useBookData = (initialParams) => {
  const [params, setParams] = useState(initialParams);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const pageRef = useRef(page);
  pageRef.current = page;

  // The core logic to fetch a specific page of data.
  const fetchPage = useCallback(async (pageNumber, isNewSearch = false) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.get(API_URL, {
        params: { ...params, page: pageNumber },
      });

      const newBooks = response.data;
      setBooks(prevBooks => (isNewSearch ? newBooks : [...prevBooks, ...newBooks]));

      const expectedPageSize = pageNumber === 1 ? 20 : 10;
      setHasMore(newBooks.length === expectedPageSize);

      if (!isNewSearch) {
        setPage(pageNumber);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, params]);

  const fetchMoreBooks = useCallback(() => {
    fetchPage(pageRef.current + 1, false);
  }, [fetchPage]);

  useEffect(() => {
    setPage(1);
    setBooks([]);
    setHasMore(true);

    const handler = setTimeout(() => {
      fetchPage(1, true);
    }, 300);

    return () => clearTimeout(handler);
  }, [params.region, params.seed, params.likes, params.reviews]);

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
      Likes: book.likes,
      Reviews: book.reviews.length
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
    fetchBooks: fetchMoreBooks,
    exportToCSV,
    handleParamChange,
    params,
    isLoading
  };
};

export default useBookData;
