import React from 'react';
import styles from './Navigation.module.scss';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { NavLink } from '../../helpers/types';

type NavigationProps = {
  links: NavLink[];
  className?: string;
  linkClassName?: string;
};

const Navigation: React.FC<NavigationProps> = ({ links, className, linkClassName }) => {
  const location = useLocation();

  const renderLink = (link: NavLink) => {
    return (
      <Link
        to={link.href}
        className={clsx(styles.link, link.href === location.pathname && styles.active, linkClassName)}
      >
        {link.label}
      </Link>
    );
  };

  return <nav className={clsx(styles.nav, className)}>{links.map(link => renderLink(link))}</nav>;
};

export default Navigation;
