const Controls = ({ params, onParamChange }) => {
  const handleRandomSeed = () => {
    onParamChange('seed', Math.floor(Math.random() * 1000000));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 rounded-md shadow">
      <div className="flex flex-col">
        <label htmlFor="region" className="mb-2 font-medium text-sm text-gray-700">Language/Region</label>
        <select
          id="region"
          value={params.region}
          onChange={(e) => onParamChange('region', e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en-US">English (USA)</option>
          <option value="de-DE">German (Germany)</option>
          <option value="ja">Japanese (Japan)</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="seed" className="mb-2 font-medium text-sm text-gray-700">Seed</label>
        <div className="flex">
          <input
            id="seed"
            type="number"
            value={params.seed}
            onChange={(e) => onParamChange('seed', e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleRandomSeed}
            title="Generate Random Seed"
            className="px-4 bg-gray-200 border border-gray-300 border-l-0 rounded-r-md text-lg hover:bg-gray-300 transition"
          >
            🎲
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="likes" className="mb-2 font-medium text-sm text-gray-700">
          Avg Likes <span className="text-gray-500">({params.likes})</span>
        </label>
        <input
          id="likes"
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={params.likes}
          onChange={(e) => onParamChange('likes', parseFloat(e.target.value).toFixed(1))}
          className="accent-blue-600"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="reviews" className="mb-2 font-medium text-sm text-gray-700">Avg Reviews</label>
        <input
          id="reviews"
          type="number"
          min="0"
          step="0.1"
          value={params.reviews}
          onChange={(e) => onParamChange('reviews', e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Controls;
