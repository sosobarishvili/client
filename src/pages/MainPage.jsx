import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useBookData from '../hooks/useBookData';
import Controls from '../components/Controls';
import BookRow from '../components/BookRow';

const MainPage = () => {
  const {
    books,
    hasMore,
    fetchBooks,
    exportToCSV,
    handleParamChange,
    params
  } = useBookData({
    region: 'en-US',
    seed: 42,
    likes: 3.7,
    reviews: 4.7,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-200 min-h-screen">
      <header className="text-center border-b border-gray-300 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Book Data Generator</h1>
        <p className="text-gray-700">Use the controls to generate realistic test data for a bookstore application.</p>
      </header>

      <div className="mb-6">
        <Controls params={params} onParamChange={handleParamChange} />
      </div>

      <div className="text-right mb-6">
        <button
          onClick={exportToCSV}
          disabled={books.length === 0}
          className={`px-5 py-2 font-semibold rounded-md transition ${books.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
        >
          Export Displayed to CSV
        </button>
      </div>

      <InfiniteScroll
        dataLength={books.length}
        next={() => fetchBooks(false)}
        hasMore={hasMore}
        loader={<h4 className="text-center text-gray-500 py-4">Loading more books...</h4>}
        endMessage={<p className="text-center text-gray-500 py-4"><b>You have seen all the books!</b></p>}
      >
        <div className="overflow-x-auto shadow rounded-lg bg-white">
          <table className="min-w-full table-auto text-left text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">ISBN</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Author(s)</th>
                <th className="px-6 py-4">Publisher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books.map(book => (
                <BookRow key={book.id} book={book} />
              ))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MainPage;
