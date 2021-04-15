import React, {
  useContext,
  useState,
} from 'react';

import {
  DataContext,
  DataProvider,
} from '../../contexts/DataContext';
import { REQUEST_STATUS } from '../../reducers/request';
import SpeakerCard from '../SpeakerCard/SpeakerCard';
import SpeakerCardLoader from '../SpeakerCardLoader/SpeakerCardLoader';
import SpeakerSearchbar from '../SpeakerSearchbar/SpeakerSearchbar';

const SpeakersComponent = () => {
  const {
    data: speakers,
    error,
    put,
    status,
  } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const specialMessage = '';

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
            <SpeakerCardLoader />
            <SpeakerCardLoader />
            <SpeakerCardLoader />
          </>
        )}
        {
          success && (
            <>
              {speakers
                .filter(({ name }) => searchQuery.length === 0
                || name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((speaker) => (
                  <SpeakerCard
                    key={speaker.id}
                    put={put}
                    {...speaker}
                  />
                ))}
            </>
          )
        }
      </div>
    </div>
  );
};

const Speakers = (props) => (
  <DataProvider baseUrl='http://localhost:4000' route='/speakers'>
    <SpeakersComponent {...props} />
  </DataProvider>
);

export default Speakers;
