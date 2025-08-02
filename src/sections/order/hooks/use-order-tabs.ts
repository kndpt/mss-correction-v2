import React, { useState } from 'react';

import { useRouter } from 'src/routes/hooks';
import { useSearchParams } from 'src/routes/hooks/use-search-params';

// ----------------------------------------------------------------------

// Tab options for URL management
export const TAB_OPTIONS = ['details', 'history', 'messages'] as const;
export type TabValue = (typeof TAB_OPTIONS)[number];

// Utility function to generate tab URLs for emails
export const getOrderTabUrl = (tabName: TabValue, orderId: string) => {
  if (tabName === 'details') {
    return `/dashboard/order/${orderId}`;
  }
  return `/dashboard/order/${orderId}?tab=${tabName}`;
};

export function useOrderTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Tab management with URL sync
  const getTabFromUrl = React.useCallback((): number => {
    const tabParam = searchParams.get('tab') as TabValue;
    const index = TAB_OPTIONS.indexOf(tabParam);
    return index >= 0 ? index : 0;
  }, [searchParams]);

  const [currentTab, setCurrentTab] = useState(() => getTabFromUrl());

  // Sync tab with URL on mount and when URL changes
  React.useEffect(() => {
    setCurrentTab(getTabFromUrl());
  }, [getTabFromUrl]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const tabName = TAB_OPTIONS[newValue];
    const params = new URLSearchParams(searchParams.toString());

    if (tabName === 'details') {
      // Remove tab param for default tab to keep URL clean
      params.delete('tab');
    } else {
      params.set('tab', tabName);
    }

    const queryString = params.toString();
    const currentPath = window.location.pathname;
    const newUrl = queryString ? `${currentPath}?${queryString}` : currentPath;

    router.replace(newUrl, { scroll: false });
    setCurrentTab(newValue);
  };

  return {
    currentTab,
    handleTabChange,
  };
}
