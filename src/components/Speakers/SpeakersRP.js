import React, { useState } from 'react';

import Request from '../RPs/Request';
import { REQUEST_STATUS } from '../../reducers/request';
import Speaker from '../Speaker/Speaker';
import SpeakerLoader from '../SpeakerLoader/SpeakerLoader';
import SpeakerSearchbar from '../SpeakerSearchbar/SpeakerSearchbar';
import SpecialMessageRenderProps from '../RPs/SpecialMessageRenderProps';

const Speakers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div>
      <SpeakerSearchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <SpecialMessageRenderProps>
        {
          ({ specialMessage }) => (
            <Request
              baseUrl='http://localhost:4000'
              route='/speakers'
            >
              {
                ({
                  error,
                  put,
                  records: speakers,
                  status,
                }) => {
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
                    <>
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
                                .filter(({ name }) => (
                                  searchQuery.length === 0
                                  || name.toLowerCase().includes(searchQuery.toLowerCase())
                                ))
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
                    </>
                  );
                }
              }
            </Request>
          )
        }
      </SpecialMessageRenderProps>
    </div>
  );
};

export default Speakers;
