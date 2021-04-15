import React from 'react';
import Link from 'next/link';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import SpeakerFavoriteButton from '../SpeakerFavoriteButton/SpeakerFavoriteButton';
import SpeakerImage from '../SpeakerImage/SpeakerImage';

const MAX_BIO_PREVIEW_LENGTH = 70;

const SpeakerCardComponent = ({
  bio,
  firstName,
  id,
  isFavorite,
  lastName,
  prefix,
  put,
  showErrorCard,
  ...extraData
}) => (
  showErrorCard
    ? (
      <div className='rounded overflow-hidden shadow-lg p-6 bg-white dark:bg-gray-700'>
        <div className='grid grid-cols-4 mb-6'>
          <div className='font-bold text-lg col-span-3 dark:text-gray-400'>Error Showing Speaker</div>
          <div className='flex justify-end'>
            <SpeakerFavoriteButton
              isFavorite={isFavorite}
              showErrorButton={showErrorCard}
            />
          </div>
        </div>
        <div className='mb-6'>
          <SpeakerImage
            fullName='Dummy speaker image'
            speakerId='dummy-wizard'
          />
        </div>
        <div className='text-gray-600 dark:text-gray-400'>Contact site owner to resolve.</div>
      </div>
    )
    : (
      <div className='rounded overflow-hidden shadow-lg p-6 bg-white dark:bg-gray-700'>
        <div className='grid grid-cols-4 mb-6'>
          <div className='font-bold text-lg col-span-3 dark:text-gray-400'>{`${prefix || ''} ${firstName} ${lastName || ''}`}</div>
          <div className='flex justify-end'>
            <SpeakerFavoriteButton
              isFavorite={isFavorite}
              onToggle={() => {
                put({
                  bio,
                  firstName,
                  id,
                  isFavorite: !isFavorite,
                  lastName,
                  ...extraData,
                });
              }}
            />
          </div>
        </div>
        <div className='mb-6'>
          <Link href={`/speaker/${id}`}>
            <a>
              <SpeakerImage
                fullName={`${prefix || ''} ${firstName} ${lastName || ''}`}
                speakerId={id}
              />
            </a>
          </Link>
        </div>
        <div className='text-gray-600 dark:text-gray-400'>{`${bio.slice(0, MAX_BIO_PREVIEW_LENGTH)}...`}</div>
      </div>
    )
);

const SpeakerCard = React.memo((props) => (
  <ErrorBoundary errorUI={<SpeakerCardComponent showErrorCard={true} />}>
    <SpeakerCardComponent {...props} />
  </ErrorBoundary>
));

export default SpeakerCard;
