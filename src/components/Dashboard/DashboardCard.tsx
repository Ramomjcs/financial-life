'use client';

import { useState, ReactNode, CSSProperties } from 'react';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import clsx from 'clsx';
import Card from '../ui/Card/Card';

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  backgroundColor: string;
  className?: string;
  hide?: boolean;
}

export default function DashboardCard({
  icon,
  title,
  value,
  backgroundColor,
  className,
  hide = false,
}: DashboardCardProps) {
  const [isVisible, setIsVisible] = useState(!hide);

  const toggleVisibility = () => setIsVisible((prev) => !prev);
  
  return (
    <Card
      className={clsx('flex items-center justify-between', className)}
      backgroundColor={backgroundColor}
      height="100%"
      borderRadius="12px"
    >
      <div className="flex items-center gap-4 w-full">
        <div className="text-3xl">{icon}</div>

        <div className="flex flex-col flex-1">
          <span className="text-sm opacity-80">{title}</span>
          <span className="text-xl font-semibold">
            {isVisible ? value : '•••••'}
          </span>
        </div>

        <IconButton onClick={toggleVisibility} className="text-white">
          {isVisible ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </div>
    </Card>
  );
}
