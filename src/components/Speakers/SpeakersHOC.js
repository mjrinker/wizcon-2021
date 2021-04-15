import React, { useState } from 'react';
import { compose } from 'recompose';

import { REQUEST_STATUS } from '../../reducers/request';
import Speaker from '../Speaker/Speaker';
import SpeakerLoader from '../SpeakerLoader/SpeakerLoader';
import SpeakerSearchbar from '../SpeakerSearchbar/SpeakerSearchbar';
import withRequest from '../HOCs/withRequest';
import withSpecialMessage from '../HOCs/withSpecialMessage';

const Speakers = ({
  error,
  put,
  records: speakers,
  specialMessage,
  status,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onFavoriteToggleHandler = async (speaker) => {
    put({
      ...speaker,
      isFavorite: !speaker.isFavorite,
    });
  };

  const success = status === REQUEST_STATUS.SUCCESS;
  const isLoading = status === REQUEST_STATUS.LOADING;
  const hasErrored = status === REQUEST_STATUS.ERROR;

  return (
    <div>
      <SpeakerSearchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {
        specialMessage?.length > 0 && (
          <div
            className='bg-yellow-100 border-l-8 border-yellow-500 text-yellow-700 p-4 text-2xl'
            role='alert'
          >
            <p className='font-bold'>Special Message</p>
            <p>{specialMessage}</p>
          </div>
        )
      }

      {hasErrored && (
        <div>
          Loading error... Is the server running/accessible?<br />
          <b>ERROR: {error.message}</b>
        </div>
      )}

      <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12'>
        {isLoading && (
          <>
            <SpeakerLoader />
            <SpeakerLoader />
            <SpeakerLoader />
          </>
        )}
        {
          success && (
            <>
              {speakers
                .filter(({ name }) => searchQuery.length === 0
                || name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((speaker) => (
                  <Speaker
                    bio={speaker.bio}
                    firstName={speaker.firstName}
                    id={speaker.id}
                    isFavorite={speaker.isFavorite}
                    key={speaker.id}
                    lastName={speaker.lastName}
                    onFavoriteToggle={() => onFavoriteToggleHandler(speaker)}
                    prefix={speaker.prefix}
                  />
                ))}
            </>
          )
        }
      </div>
    </div>
  );
};

export default compose(
  withRequest('http://localhost:4000', '/speakers'),
  withSpecialMessage(),
)(Speakers);
