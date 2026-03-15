import { useState, useCallback } from "react";

export function useRefresh(onRefreshAction?: () => Promise<void> | void) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (onRefreshAction) {
        await onRefreshAction();
      } else {
        // mock delay if no action provided
        await new Promise((resolve) => setTimeout(resolve, 750));
      }
    } finally {
      setRefreshing(false);
    }
  }, [onRefreshAction]);

  return { refreshing, onRefresh };
}
