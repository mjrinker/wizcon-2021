import React, { useState } from 'react';

import SpeakerScheduleCell from '../SpeakerScheduleCell/SpeakerScheduleCell';

const EVENT_YEAR = 2021;
const EVENT_MONTH = 10;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const SpeakerSchedule = ({ schedule }) => {
  const headings = Object.keys(schedule).map((day) => {
    const date = new Date(EVENT_YEAR, EVENT_MONTH - 1, Number.parseInt(day, 10));
    return (
      <th
        className='px-4 py-3 border-b-2 border-gray-300 w-1/6'
        key={day}
      >
        {`${DAYS[date.getDay()]}, ${MONTHS[date.getMonth() - 1]} ${date.getDate()}`}
      </th>
    );
  });

  const scheduleByHour = {};
  Object.entries(schedule).forEach(([day, byHour]) => {
    Object.entries(byHour).forEach(([hour, eventName]) => {
      scheduleByHour[hour] = scheduleByHour[hour]
        ? {
          ...scheduleByHour[hour],
          ...{ [day]: eventName },
        }
        : { [day]: eventName };
    });
  });

  const rows = Object.entries(scheduleByHour).map(([hour, byDay]) => {
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    const fullTime = date.toLocaleTimeString('en-US').replace(/(\d{1,2}:\d{2}):\d{2}/, '$1');
    return (
      <tr
        className='bg-gray-100 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600'
        key={hour}
      >
        <td className='px-4 py-3 bg-gray-200 dark:bg-gray-800 border-r-2 border-gray-300'>{fullTime}</td>
        {
          Object.entries(byDay).map(([day, eventName]) => (
            <SpeakerScheduleCell
              eventName={eventName}
              key={`${day}@${hour}`}
            />
          ))
        }
      </tr>
    );
  });

  return (
    <table className='table-fixed rounded-t-lg m-5 w-full mx-auto bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200'>
      <thead>
        <tr className='text-left'>
          <th className='px-4 py-3 border-b-0 w-1/6' />
          {headings}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

export default SpeakerSchedule;
