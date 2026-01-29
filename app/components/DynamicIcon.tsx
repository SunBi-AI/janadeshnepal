// components/DynamicHugeicon.tsx
'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import * as CoreIcons from '@hugeicons/core-free-icons';
import React from 'react';

type IconName = keyof typeof CoreIcons;

interface DynamicHugeiconProps {
  iconName: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const DynamicHugeicon: React.FC<DynamicHugeiconProps> = ({
  iconName,
  size = 10,
  color = 'currentColor',
  strokeWidth = 1,
}) => {
  const IconComponent = CoreIcons[iconName as IconName];

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" does not exist in Hugeicons.`);
    return null;
  }

  return (
    <HugeiconsIcon
      icon={IconComponent}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  );
};

export default DynamicHugeicon;
