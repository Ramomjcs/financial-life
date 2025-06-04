'use client';

import { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Card.module.scss';

type CardProps = {
  children: ReactNode;
  className?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
};

export default function Card({
  children,
  className,
  width = '100%',
  height = 'auto',
  backgroundColor = '#ffffff',
  borderRadius = '8px',
  boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)',
}: CardProps) {
  const style: CSSProperties = {
    width,
    height,
    backgroundColor,
    borderRadius,
    boxShadow,
  };

  return (
    <div className={clsx(styles.card, className)} style={style}>
      {children}
    </div>
  );
}
