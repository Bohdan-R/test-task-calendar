import React from 'react';
import clsx from 'clsx';
import styles from './Loader.module.scss';

type LoaderProps = {
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return <span className={clsx(styles['loader'], className)}></span>;
};

export default Loader;
