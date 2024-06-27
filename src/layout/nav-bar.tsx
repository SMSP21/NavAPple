"use client";
import Link from 'next/link';
import { useState, ReactNode } from 'react';

interface NavItemProps {
  href: string;
  text: string;
  children?: ReactNode;
}

const NavItem = ({ href, text, children }: NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={href} className="hover:text-gray-300">
        {text}
      </Link>
      {isHovered && children && (
        <div className="relative left-0 mt-2  w-full bg-black rounded-md shadow-lg py-1 z-10 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link href="/" className="text-white">
            {/* Apple logo */}
          </Link>
        </div>
        <div className="hidden md:flex space-x-10 text-sm">
          <NavItem href="/store" text="Store">
            <NavItem href="/mac" text="Mac">
              <Link href="/macbook-air" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">MacBook Air</Link>
              <Link href="/macbook-pro" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">MacBook Pro</Link>
            </NavItem>
            <NavItem href="/ipad" text="iPad">
              <Link href="/ipad-pro" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">iPad Pro</Link>
              <Link href="/ipad-air" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">iPad Air</Link>
            </NavItem>
            <NavItem href="/iphone" text="iPhone">
              <Link href="/iphone-13" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">iPhone 13</Link>
              <Link href="/iphone-12" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">iPhone 12</Link>
            </NavItem>
          </NavItem>
          <NavItem href="/mac" text="Mac">
            <Link href="/macbook-air" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">MacBook Air</Link>
            <Link href="/macbook-pro" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">MacBook Pro</Link>
          </NavItem>
          <NavItem href="/ipad" text="iPad">
            <Link href="/ipad-pro" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">iPad Pro</Link>
            <Link href="/ipad-air" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">iPad Air</Link>
          </NavItem>
          <NavItem href="/iphone" text="iPhone">
            <Link href="/iphone-13" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">iPhone 13</Link>
            <Link href="/iphone-12" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">iPhone 12</Link>
          </NavItem>
          <NavItem href="/watch" text="Watch">
            <Link href="/watch-series-7" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Watch Series 7</Link>
            <Link href="/watch-se" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Watch SE</Link>
          </NavItem>
          <NavItem href="/vision" text="Vision">
            <Link href="/vision-pro" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Vision Pro</Link>
            <Link href="/vision-se" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Vision SE</Link>
          </NavItem>
          <NavItem href="/airpods" text="AirPods">
            <Link href="/airpods-pro" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">AirPods Pro</Link>
            <Link href="/airpods-3" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">AirPods 3</Link>
          </NavItem>
          <NavItem href="/tv-home" text="TV & Home">
            <Link href="/apple-tv" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Apple TV</Link>
            <Link href="/homepod" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">HomePod</Link>
          </NavItem>
          <NavItem href="/entertainment" text="Entertainment">
            <Link href="/apple-music" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Apple Music</Link>
            <Link href="/apple-tv-plus" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Apple TV+</Link>
          </NavItem>
          <NavItem href="/accessories" text="Accessories">
            <Link href="/cases" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Cases</Link>
            <Link href="/chargers" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Chargers</Link>
          </NavItem>
          <NavItem href="/support" text="Support">
            <Link href="/support-docs" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Support Docs</Link>
            <Link href="/contact-support" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Contact Support</Link>
          </NavItem>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
