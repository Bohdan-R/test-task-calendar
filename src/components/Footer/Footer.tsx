import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import Navigation from '../Navigation/Navigation';
import { NAV_LINKS } from '../../helpers/constants';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.logo}>
        LOGO
      </Link>

      <Navigation links={NAV_LINKS} className={styles.nav} linkClassName={styles.link} />
      <span className={styles.rights}>© 2022 All rights reserved</span>
    </footer>
  );
};

export default Footer;
