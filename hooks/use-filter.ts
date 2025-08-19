import { useState, useMemo } from 'react';

export function useFilter<T>(
  items: T[],
  filterFn: (item: T, filter: string) => boolean
) {
  const [filter, setFilter] = useState<string>('all');

  const filteredItems = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((item) => filterFn(item, filter));
  }, [items, filter, filterFn]);

  return {
    filter,
    setFilter,
    filteredItems,
  };
}
