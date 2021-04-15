import React from 'react';

const SpeakerSearchbar = ({
  searchQuery,
  setSearchQuery,
}) => (
  <div className='mb-6'>
    <input
      className='shadow appearance-none border rounded w-full dark:bg-gray-900 dark:border-gray-700 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      id='username'
      onChange={(event) => setSearchQuery(event.target.value)}
      placeholder='Search by name'
      type='text'
      value={searchQuery}
    />
  </div>
);

export default SpeakerSearchbar;
