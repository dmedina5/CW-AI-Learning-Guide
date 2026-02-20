'use client';

import { useState, useEffect } from 'react';
import type { PlatformTab } from '@/lib/constants';

export function usePlatform(): PlatformTab {
  const [platform, setPlatform] = useState<PlatformTab>('Windows');

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('mac') || ua.includes('darwin')) {
      setPlatform('Mac');
    } else if (ua.includes('linux') && !ua.includes('android')) {
      setPlatform('Linux');
    } else {
      setPlatform('Windows');
    }
  }, []);

  return platform;
}
