import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="rounded-[20px] max-w-[295px] w-screen">
      <div className="animate-pulse">
        <div className="bg-gray-300 max-w-[295px] max-h-[295px] w-screen h-screen rounded-[20px] mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="flex items-center mb-2">
          <div className="h-4 bg-gray-300 rounded w-1/4 mr-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/6"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
} 