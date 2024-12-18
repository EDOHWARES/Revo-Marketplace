import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product';

interface UsePaginationProps {
  items: Product[];
  itemsPerPage: number;
  infinite?: boolean;
}

export function usePagination({ items, itemsPerPage, infinite = false }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setPaginatedItems([]);
  }, [items]);

  useEffect(() => {
    if (infinite) {
      const end = currentPage * itemsPerPage;
      setPaginatedItems(prevItems => {
        const newItems = items.slice(0, end);
        return newItems;
      });
      setHasMore(end < items.length);
    } else {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setPaginatedItems(items.slice(start, end));
    }
  }, [currentPage, items, itemsPerPage, infinite]);

  const loadMore = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    items: paginatedItems,
    currentPage,
    totalPages,
    hasMore,
    loadMore,
    goToPage
  };
} 