"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumb() {
  const pathname = usePathname();
  
  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];
    
    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({ label, href: currentPath });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (pathname === '/' || pathname === '/premium-home') return null;

  return (
    <motion.nav
      className="relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated path background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        <motion.path
          d={`M 0,25 Q ${breadcrumbs.length * 100},25 ${breadcrumbs.length * 200},25`}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="1"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((item, index) => (
          <motion.li
            key={item.href}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            )}
            
            {index === breadcrumbs.length - 1 ? (
              <span className="text-neutral-600 font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="relative group flex items-center gap-1"
              >
                {index === 0 && <Home className="w-3 h-3" />}
                <span className="text-neutral-500 hover:text-neutral-900 transition-colors">
                  {item.label}
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[1px] bg-emerald-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            )}
          </motion.li>
        ))}
      </ol>
    </motion.nav>
  );
}