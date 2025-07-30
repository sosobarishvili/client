import React, { useState } from 'react';
import BookCover from './BookCover';

const BookRow = ({ book }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr
        className="cursor-pointer transition hover:bg-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="px-6 py-4">{book.index}</td>
        <td className="px-6 py-4">{book.isbn}</td>
        <td className="px-6 py-4">{book.title}</td>
        <td className="px-6 py-4">{book.authors}</td>
        <td className="px-6 py-4">{book.publisher}</td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan="5" className="bg-gray-50 px-6 py-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div>
                <BookCover title={book.title} authors={book.authors} />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">Details</h4>
                  <p className="text-sm text-gray-700">
                    <strong>Likes:</strong> {book.likes} ❤️
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">
                    Reviews ({book.reviews.length})
                  </h4>
                  <div className="mt-2 max-h-52 overflow-y-auto border-l-4 border-blue-500 pl-4 space-y-4">
                    {book.reviews.length > 0 ? (
                      book.reviews.map((review, index) => (
                        <div key={index} className="text-sm text-gray-700">
                          <p className="italic mb-1">"{review.text}"</p>
                          <strong className="block text-gray-800">- {review.author}</strong>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No reviews for this book.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default BookRow;
