import React, { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

const Header = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className='bg-gray-200 dark:bg-gray-600 dark:text-gray-300 rounded-md mb-6 p-6 pt-12 pb-12'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='col-span-1 text-center mb-6 md:mb-0'>
          <h6 className='uppercase'>October 19-23&nbsp;&nbsp;2021</h6>
          <h6 className='uppercase'>Matamata, New Zealand</h6>
        </div>
        <div className='col-span-2 text-center md:text-right'>
          <div className='flex justify-center md:justify-end'>
            <img
              alt='logo'
              src={`/images/WClogo-${theme}.png`}
              width={70}
            />
          </div>
          <h2 className='dark:text-gray-300'>WizCon 2021</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
