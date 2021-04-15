import React from 'react';
import { SimpleImg } from 'react-simple-img';

const SpeakerLoader = () => (
  <div className='rounded overflow-hidden shadow-lg p-6 animate-pulse'>
    <div className='space-y-6'>
      <div className='grid grid-cols-4 mb-5 h-7'>
        <div className='h-5 bg-blue-400 dark:bg-gray-500 rounded col-span-1' />
        <div className='col-span-2' />
        <div className='flex justify-end'>
          <div className='icon-heart-loading' />
        </div>
      </div>
      <div className='mb-6 relative'>
        <div className='bg-blue-400 dark:bg-gray-500 rounded-full h-full w-full'>
          <SimpleImg
            alt='Loading'
            animationDuration='1'
            applyAspectRatio={true}
            height={540}
            imgStyle={{ borderRadius: '9999px' }}
            placeholder={false}
            src='/images/speaker-loading.png'
            width={540}
          />
        </div>
      </div>
      <div className='h-5 w-full bg-blue-400 dark:bg-gray-500 rounded' />
      <div className='h-5 w-3/5 bg-blue-400 dark:bg-gray-500 rounded' />
    </div>
  </div>
);

export default SpeakerLoader;
