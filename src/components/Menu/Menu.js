import React, { useContext } from 'react';
import Link from 'next/link';

import { ThemeContext } from '../../contexts/ThemeContext';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

const Menu = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <nav className='flex items-center justify-between flex-wrap bg-gray-800 dark:bg-gray-700 mb-6 px-6 h-16 rounded-md'>
      <div className='w-full flex flex-grow'>
        <div className='flex items-center flex-grow'>
          <Link href='/'>
            <a className='block md:inline-block text-gray-300 hover:text-white mr-4'>Home</a>
          </Link>
          <Link href='/speakers'>
            <a className='block md:inline-block text-gray-300 hover:text-white mr-4'>Speakers</a>
          </Link>
        </div>
        <ToggleSwitch
          idName='theme-toggle'
          onToggle={() => {
            toggleTheme();
          }}
        >
          Toggle Theme
        </ToggleSwitch>
      </div>
    </nav>
  );
};

export default Menu;
