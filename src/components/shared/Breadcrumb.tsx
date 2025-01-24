"use client";

import React from "react";
import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href: string; isCurrent?: boolean }[]; // Agregamos `isCurrent` para la página actual
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.isCurrent ? (
              <span className="text-black">{item.label}</span> // Estilo para la página actual
            ) : (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            )}
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
