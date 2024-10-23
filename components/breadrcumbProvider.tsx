"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbProps {
  subItems?: boolean;
}

const BreadcrumbProvider = ({ subItems = false }: BreadcrumbProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <a href="/" className="text-blue-500">
            <BreadcrumbPage>Home</BreadcrumbPage>
          </a>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {segments.map((segment, index) => {
          const url = `/${segments.slice(0, index + 1).join("/")}`;

          const displayName =
            segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <BreadcrumbItem key={url}>
              <a href={url} className="text-blue-500">
                <BreadcrumbPage>{displayName}</BreadcrumbPage>
              </a>
            </BreadcrumbItem>
          );
        })}

        {/* Optionally render subItems if needed */}
        {subItems && (
          <BreadcrumbItem>
            {/* Example sub-item */}
            <BreadcrumbPage className="line-clamp-1">Sub Page</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbProvider;
