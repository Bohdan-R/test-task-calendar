import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Navigation from '../Navigation/Navigation';
import { NAV_LINKS } from '../../helpers/constants';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        LOGO
      </Link>
      <Navigation links={NAV_LINKS} />
    </header>
  );
};

export default Header;
