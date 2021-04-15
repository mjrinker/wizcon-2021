import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import ReactNotification from 'react-notifications-component';

import {
  ThemeContext,
  ThemeProvider,
  THEMES,
} from '../../contexts/ThemeContext';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';

const LayoutComponent = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mouseDown, setMouseDown] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('mousedown', () => {
        setMouseDown(true);
      });

      document.addEventListener('keydown', () => {
        setMouseDown(false);
      });
    }
  }, []);
  if (typeof window !== 'undefined') {
    document.querySelectorAll('html')[0].classList.toggle('dark', theme === THEMES.DARK);
  }

  return (
    <div className={`layout overflow-auto bg-gray-50 dark:bg-gray-800 dark:text-gray-400 ${mouseDown ? 'mousedown' : ''}`}>
      <ReactNotification />
      <div className='mx-4 my-3'>
        <Header />
        <Menu />
        {children}
        <Footer />
      </div>
    </div>
  );
};

const Layout = ({ children }) => (
  <ThemeProvider initialTheme={THEMES.DARK}>
    <LayoutComponent>{children}</LayoutComponent>
  </ThemeProvider>
);

export default Layout;
