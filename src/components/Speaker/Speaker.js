import React, { useContext } from 'react';

import {
  DataContext,
  DataProvider,
} from '../../contexts/DataContext';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { REQUEST_STATUS } from '../../reducers/request';
import SpeakerFavoriteButton from '../SpeakerFavoriteButton/SpeakerFavoriteButton';
import SpeakerImage from '../SpeakerImage/SpeakerImage';
import SpeakerLoader from '../SpeakerLoader/SpeakerLoader';
import SpeakerSchedule from '../SpeakerSchedule/SpeakerSchedule';

const SpeakerComponent = ({
  id,
  showError,
}) => {
  const {
    data: speaker,
    put,
    status,
  } = useContext(DataContext);

  const success = status === REQUEST_STATUS.SUCCESS;
  const isLoading = status === REQUEST_STATUS.LOADING;
  const hasErrored = showError || status === REQUEST_STATUS.ERROR;

  const {
    bio,
    firstName,
    isFavorite,
    lastName,
    prefix,
    schedule,
  } = speaker;

  let bioText = bio;
  let displayName = `${prefix || ''} ${firstName} ${lastName || ''}`;
  let imageAltText = `${prefix || ''} ${firstName} ${lastName || ''}`;
  let imageSpeakerId = id;
  let onFavoriteButtonToggle = () => {
    put({
      ...speaker,
      isFavorite: !isFavorite,
    });
  };

  if (hasErrored) {
    bioText = 'Contact site owner to resolve.';
    displayName = 'Error Showing Speaker';
    imageAltText = 'Dummy speaker image';
    imageSpeakerId = 'dummy-wizard';
    onFavoriteButtonToggle = () => {};
  }

  return (
    <div className='p-6 w-1/2 mx-auto'>
      {
        isLoading
          ? <SpeakerLoader />
          : success && (
            <>
              <div className='grid grid-cols-4 mb-6'>
                <div className='font-bold text-3xl col-span-3 dark:text-gray-400'>{displayName}</div>
                <div className='flex justify-end'>
                  <SpeakerFavoriteButton
                    isFavorite={isFavorite}
                    onToggle={onFavoriteButtonToggle}
                    showErrorButton={hasErrored}
                    size='2xl'
                  />
                </div>
              </div>
              <div className='mb-6 h-96 w-96 mx-auto'>
                <SpeakerImage
                  fullName={imageAltText}
                  speakerId={imageSpeakerId}
                />
              </div>
              <div className='text-gray-600 dark:text-gray-400'>{bioText}</div>
              <div className='h-px bg-gray-700 dark:bg-gray-500 my-7' />
              <div className='font-bold text-3xl dark:text-gray-400 text-center'>Lecture Schedule</div>
              <SpeakerSchedule schedule={schedule} />
            </>
          )
      }
    </div>
  );
};

const Speaker = React.memo((props) => (
  <DataProvider
    baseUrl='http://localhost:4000'
    recordId={props.id}
    route='/speakers'
  >
    <ErrorBoundary errorUI={<SpeakerComponent showError={true} />}>
      <SpeakerComponent {...props} />
    </ErrorBoundary>
  </DataProvider>
));

Speaker.displayName = 'Speaker';

export default Speaker;
