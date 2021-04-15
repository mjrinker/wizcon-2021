import React from 'react';
import { SimpleImg } from 'react-simple-img';

const SpeakerLoader = () => (
  <div className='animate-pulse'>
    <div className='space-y-6'>
      <div className='grid grid-cols-6 mb-5 h-9'>
        <div className='h-9 bg-blue-400 dark:bg-gray-500 rounded col-span-2' />
        <div className='col-span-3' />
        <div className='flex justify-end'>
          <div className='icon-heart-loading text-2xl' />
        </div>
      </div>
      <div className='mb-6 relative h-96 w-96 mx-auto'>
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
      <div className='h-5 w-11/12 bg-blue-400 dark:bg-gray-500 rounded' />
      <div className='h-5 w-full bg-blue-400 dark:bg-gray-500 rounded' />
      <div className='h-5 w-3/5 bg-blue-400 dark:bg-gray-500 rounded' />
      <div className='h-px bg-blue-400 dark:bg-gray-500 my-7' />
      <div className='h-9 w-1/3 bg-blue-400 dark:bg-gray-500 rounded mx-auto' />
      <div className='grid grid-cols-6 gap-3 mb-5'>
        <div className='h-9 bg-blue-400 dark:bg-gray-500 rounded col-span-6' />
        {Array.from({ length: 54 }, () => <div className='h-9 bg-blue-400 dark:bg-gray-500 rounded col-span-1' />)}
      </div>
    </div>
  </div>
);

export default SpeakerLoader;
