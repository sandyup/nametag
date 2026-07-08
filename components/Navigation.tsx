'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavigationSearch from './NavigationSearch';
import UserMenu from './UserMenu';

interface NavigationProps {
  userEmail?: string;
  userName?: string | null;
  userNickname?: string | null;
  currentPath?: string;
}

export default function Navigation({ userEmail, userName, userNickname, currentPath }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/people', label: 'People' },
    { href: '/groups', label: 'Groups' },
    { href: '/relationship-types', label: 'Relationships' },
  ];

  const isActive = (href: string) => {
    if (!currentPath) return false;
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section: Logo, Search (desktop), Nav items (desktop) */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link href="/dashboard" className="flex items-center flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="NameTag Logo"
                width={64}
                height={64}
                className="text-gray-900 dark:text-white"
              />
            </Link>

            {/* Desktop search */}
            <div className="hidden md:block">
              <NavigationSearch />
            </div>

            {/* Desktop nav items */}
            <div className="hidden lg:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive(item.href)
                      ? 'text-blue-600 dark:text-blue-400 px-3 py-2 rounded-md text-sm font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right section: User menu (all screens), Hamburger (mobile) */}
          <div className="flex items-center space-x-2">
            {userEmail && (
              <UserMenu userEmail={userEmail} userName={userName} userNickname={userNickname} />
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

      </div>

      {/* Mobile menu overlay - slides in from right */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile menu panel */}
          <div className="lg:hidden fixed top-0 right-0 bottom-0 w-[90%] max-w-md bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
            <div className="h-full flex flex-col">
              {/* Menu header with close button */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile search */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
                <NavigationSearch />
              </div>

              {/* Mobile nav items */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={
                        isActive(item.href)
                          ? 'flex items-center px-4 py-3 rounded-lg text-base font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 transition-colors'
                          : 'flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
