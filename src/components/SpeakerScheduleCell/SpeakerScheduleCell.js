import React, { useState } from 'react';

const MAX_EVENT_NAME_LENGTH = 10;
const ON_HOVER_Z_INDEX = 50;

const SpeakerScheduleCell = ({ eventName }) => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  const defaultEventText = eventName === false ? 'Busy' : 'Free';
  const eventText = eventName ? `${eventName}` : defaultEventText;
  const defaultEventComponent = eventText === 'Busy' ? <span className='text-gray-400 antialiased'>{eventText}</span> : <span className='text-gray-500 dark:text-gray-300 antialiased'>{eventText}</span>;
  const eventComponent = eventName ? <span className='dark:text-blue-200 font-bold antialiased'>{eventText}</span> : defaultEventComponent;
  return (
    <td
      className='px-4 pb-6 relative'
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      role='cell'
      style={{
        cursor: 'default',
        zIndex: hover ? ON_HOVER_Z_INDEX : 0,
      }}
    >
      <div className='absolute bg-gray-100 dark:bg-gray-700'>
        {
          hover || eventText.length < MAX_EVENT_NAME_LENGTH
            ? eventComponent
            : <span className='dark:text-blue-200 font-semibold antialiased'>{`${`${eventText}`.slice(0, MAX_EVENT_NAME_LENGTH)}...`}</span>}
      </div>
    </td>
  );
};

export default SpeakerScheduleCell;
