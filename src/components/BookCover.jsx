import React, { useMemo } from 'react';

const BookCover = ({ title, authors }) => {
  const coverStyle = useMemo(() => {
    const hue = Math.floor(Math.random() * 360);
    return {
      background: `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${hue}, 90%, 30%))`,
    };
  }, [title]);

  return (
    <div
      className="w-36 h-56 p-4 text-white rounded-md shadow-md flex flex-col justify-between text-shadow"
      style={coverStyle}
    >
      <div>
        <h3 className="font-bold text-lg leading-snug">{title}</h3>
        <p className="text-sm mt-2">{authors}</p>
      </div>
      <div className="text-xs italic text-right opacity-80">Book Cover</div>
    </div>
  );
};

export default BookCover;
