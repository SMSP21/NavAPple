"use client";
import { useState,useEffect, useRef } from 'react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface NavItemProps {
  href: string;
  text: string;
  children?: ReactNode;
  setActiveItem: (item: string) => void;
  isActive: boolean;
}

const NavItem = ({ href, text, children, setActiveItem, isActive }: NavItemProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownHeight(isActive ? dropdownRef.current.scrollHeight : 0);
    }
  }, [isActive]);

  const handleMouseEnter = () => {
    setActiveItem(text);
  };

  const dropdownMouseLeave = () => {
    if (dropdownRef.current && !dropdownRef.current.contains(document.activeElement)) {
      setActiveItem('');
    }
  };
  
  

  return (
    <div
      className="relative"
      ref={navContainerRef}
      onMouseEnter={handleMouseEnter}
    >
      <Link href={href} passHref>
        <span className="hover:text-gray-300">{text}</span>
      </Link>
      <div
        ref={dropdownRef}
        className={`fixed left-0 right-0 bg-black z-40 backdrop-blur overflow-hidden transition-all duration-500 ease-in-out ${
          isActive ? 'animate-fadeIn' : 'opacity-0'
        }`}
        style={{ 
          height: `${dropdownHeight}px`,
          pointerEvents: isActive ? 'auto' : 'none'
        }}
        onMouseLeave={dropdownMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-3 gap-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChildSidebarOpen, setIsChildSidebarOpen] = useState(false);
  const [childSidebarContent, setChildSidebarContent] = useState<ReactNode | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetActiveItem = (item: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveItem(item);
  };

  const handleCloseDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveItem('');
    }, 500);
  };
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleChildSidebarToggle = (content: ReactNode) => {
    setChildSidebarContent(content);
    setIsChildSidebarOpen(true);
  };

  const handleChildSidebarClose = () => {
    setIsChildSidebarOpen(false);
  };


  return (
    <nav className="bg-black text-white p-6 h-12 fixed top-0 left-0 right-0 z-50">
     <div className="hidden md:flex max-w-7xl mx-auto justify-between items-center">
        <div className="flex-shrink-0">
          <Link href="/" className="text-white">
            {/* Apple logo */}
          </Link>
        </div>
        <div className=" fixed md:flex space-x-8 text-sm">
        <NavItem 
            href="/store" 
            text="Store" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Store'}
          >
          <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/mac" className="text-md font-semibold hover:text-gray-300">Explore All Mac</Link>
                </li>
                <li><Link href="/macbook-air" className="text-md font-semibold hover:text-gray-300">MacBook Air</Link></li>
                <li><Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-300">MacBook Pro</Link></li>
                <li><Link href="/imac" className="text-md font-semibold hover:text-gray-300">iMac</Link></li>
              
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extralight mb-4">Shop Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/shop-mac" className="text-md font-semibold hover:text-gray-300">Shop Mac</Link></li>
                <li><Link href="/mac-accessories" className="text-md font-semibold hover:text-gray-300">Mac Accessories</Link></li>
                <li><Link href="/apple-trade-in" className="text-md font-semibold hover:text-gray-300">Apple Trade In</Link></li>
                <li><Link href="/financing" className="text-md font-semibold hover:text-gray-300">Financing</Link></li>
                <li><Link href="/college-student-offer" className="text-md font-semibold hover:text-gray-300">College Student Offer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extralight mb-4">More from Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/mac-support" className="text-md font-semibold hover:text-gray-300">Mac Support</Link></li>
                <li><Link href="/applecare-plus-mac" className="text-md font-semibold hover:text-gray-300">AppleCare+ for Mac</Link></li>
                <li><Link href="/macos-preview" className="text-md font-semibold hover:text-gray-300">macOS Sequoia Preview</Link></li>
                <li><Link href="/apps-by-apple" className="text-md font-semibold hover:text-gray-300">Apps by Apple</Link></li>
                <li><Link href="/continuity" className="text-md font-semibold hover:text-gray-300">Continuity</Link></li>
                <li><Link href="/icloud-plus" className="text-md font-semibold hover:text-gray-300">iCloud+</Link></li>
                <li><Link href="/mac-for-business" className="text-md font-semibold hover:text-gray-300">Mac for Business</Link></li>
                <li><Link href="/education" className="text-md font-semibold hover:text-gray-300">Education</Link></li>
              </ul>
            </div>
            </NavItem>

            <NavItem 
            href="/mac" 
            text="Mac" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Mac'}
          >
            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/mac" className="text-md font-semibold hover:text-gray-300">Explore All Mac</Link></li>
                <li><Link href="/macbook-air" className="text-md font-semibold hover:text-gray-300">MacBook Air</Link></li>
                <li><Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-300">MacBook Pro</Link></li>
                <li><Link href="/imac" className="text-md font-semibold hover:text-gray-300">iMac</Link></li>
                <li><Link href="/mac-mini" className="text-md font-semibold hover:text-gray-300">Mac mini</Link></li>
                <li><Link href="/mac-studio" className="text-md font-semibold hover:text-gray-300">Mac Studio</Link></li>
                <li><Link href="/mac-pro" className="text-md font-semibold hover:text-gray-300">Mac Pro</Link></li>
                <li><Link href="/displays" className="text-md font-semibold hover:text-gray-300">Displays</Link></li>
                <li><Link href="/compare-mac" className="text-md font-semibold hover:text-gray-300">Compare Mac</Link></li>
                <li><Link href="/mac-does-that" className="text-md font-semibold hover:text-gray-300">Mac Does That</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extralight mb-4">Shop Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/shop-mac" className="text-md font-semibold hover:text-gray-300">Shop Mac</Link></li>
                <li><Link href="/mac-accessories" className="text-md font-semibold hover:text-gray-300">Mac Accessories</Link></li>
                <li><Link href="/apple-trade-in" className="text-md font-semibold hover:text-gray-300">Apple Trade In</Link></li>
                <li><Link href="/financing" className="text-md font-semibold hover:text-gray-300">Financing</Link></li>
                <li><Link href="/college-student-offer" className="text-md font-semibold hover:text-gray-300">College Student Offer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extralight mb-4">More from Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/mac-support" className="text-md font-semibold hover:text-gray-300">Mac Support</Link></li>
                <li><Link href="/applecare-plus-mac" className="text-md font-semibold hover:text-gray-300">AppleCare+ for Mac</Link></li>
                <li><Link href="/macos-preview" className="text-md font-semibold hover:text-gray-300">macOS Sequoia Preview</Link></li>
                <li><Link href="/apps-by-apple" className="text-md font-semibold hover:text-gray-300">Apps by Apple</Link></li>
                <li><Link href="/continuity" className="text-md font-semibold hover:text-gray-300">Continuity</Link></li>
                <li><Link href="/icloud-plus" className="text-md font-semibold hover:text-gray-300">iCloud+</Link></li>
                <li><Link href="/mac-for-business" className="text-md font-semibold hover:text-gray-300">Mac for Business</Link></li>
                <li><Link href="/education" className="text-md font-semibold hover:text-gray-300">Education</Link></li>
              </ul>
            </div>
          </NavItem>
          <NavItem 
            href="/mac" 
            text="Mac" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Mac'}
          >
            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/mac" className="text-md font-semibold hover:text-gray-300">Explore All Mac</Link></li>
                <li><Link href="/macbook-air" className="text-md font-semibold hover:text-gray-300">MacBook Air</Link></li>
                <li><Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-300">MacBook Pro</Link></li>
                <li><Link href="/imac" className="text-md font-semibold hover:text-gray-300">iMac</Link></li>
                <li><Link href="/mac-mini" className="text-md font-semibold hover:text-gray-300">Mac mini</Link></li>
                <li><Link href="/mac-studio" className="text-md font-semibold hover:text-gray-300">Mac Studio</Link></li>
                <li><Link href="/mac-pro" className="text-md font-semibold hover:text-gray-300">Mac Pro</Link></li>
                <li><Link href="/displays" className="text-md font-semibold hover:text-gray-300">Displays</Link></li>
                <li><Link href="/compare-mac" className="text-md font-semibold hover:text-gray-300">Compare Mac</Link></li>
                <li><Link href="/mac-does-that" className="text-md font-semibold hover:text-gray-300">Mac Does That</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extralight mb-4">Shop Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/shop-mac" className="text-md font-semibold hover:text-gray-300">Shop Mac</Link></li>
                <li><Link href="/mac-accessories" className="text-md font-semibold hover:text-gray-300">Mac Accessories</Link></li>
                <li><Link href="/apple-trade-in" className="text-md font-semibold hover:text-gray-300">Apple Trade In</Link></li>
                <li><Link href="/financing" className="text-md font-semibold hover:text-gray-300">Financing</Link></li>
                <li><Link href="/college-student-offer" className="text-md font-semibold hover:text-gray-300">College Student Offer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extralight mb-4">More from Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/mac-support" className="text-md font-semibold hover:text-gray-300">Mac Support</Link></li>
                <li><Link href="/applecare-plus-mac" className="text-md font-semibold hover:text-gray-300">AppleCare+ for Mac</Link></li>
                <li><Link href="/macos-preview" className="text-md font-semibold hover:text-gray-300">macOS Sequoia Preview</Link></li>
                <li><Link href="/apps-by-apple" className="text-md font-semibold hover:text-gray-300">Apps by Apple</Link></li>
                <li><Link href="/continuity" className="text-md font-semibold hover:text-gray-300">Continuity</Link></li>
                <li><Link href="/icloud-plus" className="text-md font-semibold hover:text-gray-300">iCloud+</Link></li>
                <li><Link href="/mac-for-business" className="text-md font-semibold hover:text-gray-300">Mac for Business</Link></li>
                <li><Link href="/education" className="text-md font-semibold hover:text-gray-300">Education</Link></li>
              </ul>
            </div>
          </NavItem>
          <NavItem 
            href="/mac" 
            text="Mac" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Mac'}
          >            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/mac" className="text-md font-semibold hover:text-gray-300">Explore All Mac</Link></li>
                <li><Link href="/macbook-air" className="text-md font-semibold hover:text-gray-300">MacBook Air</Link></li>
                <li><Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-300">MacBook Pro</Link></li>
                <li><Link href="/imac" className="text-md font-semibold hover:text-gray-300">iMac</Link></li>
                <li><Link href="/mac-mini" className="text-md font-semibold hover:text-gray-300">Mac mini</Link></li>
                <li><Link href="/mac-studio" className="text-md font-semibold hover:text-gray-300">Mac Studio</Link></li>
                <li><Link href="/mac-pro" className="text-md font-semibold hover:text-gray-300">Mac Pro</Link></li>
                <li><Link href="/displays" className="text-md font-semibold hover:text-gray-300">Displays</Link></li>
                <li><Link href="/compare-mac" className="text-md font-semibold hover:text-gray-300">Compare Mac</Link></li>
                <li><Link href="/mac-does-that" className="text-md font-semibold hover:text-gray-300">Mac Does That</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extralight mb-4">Shop Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/shop-mac" className="text-md font-semibold hover:text-gray-300">Shop Mac</Link></li>
                <li><Link href="/mac-accessories" className="text-md font-semibold hover:text-gray-300">Mac Accessories</Link></li>
                <li><Link href="/apple-trade-in" className="text-md font-semibold hover:text-gray-300">Apple Trade In</Link></li>
                <li><Link href="/financing" className="text-md font-semibold hover:text-gray-300">Financing</Link></li>
                <li><Link href="/college-student-offer" className="text-md font-semibold hover:text-gray-300">College Student Offer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extralight mb-4">More from Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/mac-support" className="text-md font-semibold hover:text-gray-300">Mac Support</Link></li>
                <li><Link href="/applecare-plus-mac" className="text-md font-semibold hover:text-gray-300">AppleCare+ for Mac</Link></li>
                <li><Link href="/macos-preview" className="text-md font-semibold hover:text-gray-300">macOS Sequoia Preview</Link></li>
                <li><Link href="/apps-by-apple" className="text-md font-semibold hover:text-gray-300">Apps by Apple</Link></li>
                <li><Link href="/continuity" className="text-md font-semibold hover:text-gray-300">Continuity</Link></li>
                <li><Link href="/icloud-plus" className="text-md font-semibold hover:text-gray-300">iCloud+</Link></li>
                <li><Link href="/mac-for-business" className="text-md font-semibold hover:text-gray-300">Mac for Business</Link></li>
                <li><Link href="/education" className="text-md font-semibold hover:text-gray-300">Education</Link></li>
              </ul>
            </div>
          </NavItem>
          <NavItem 
            href="/mac" 
            text="Mac" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Mac'}
          >            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/mac" className="text-md font-semibold hover:text-gray-300">Explore All Mac</Link></li>
                <li><Link href="/macbook-air" className="text-md font-semibold hover:text-gray-300">MacBook Air</Link></li>
                <li><Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-300">MacBook Pro</Link></li>
                <li><Link href="/imac" className="text-md font-semibold hover:text-gray-300">iMac</Link></li>
                <li><Link href="/mac-mini" className="text-md font-semibold hover:text-gray-300">Mac mini</Link></li>
                <li><Link href="/mac-studio" className="text-md font-semibold hover:text-gray-300">Mac Studio</Link></li>
                <li><Link href="/mac-pro" className="text-md font-semibold hover:text-gray-300">Mac Pro</Link></li>
                <li><Link href="/displays" className="text-md font-semibold hover:text-gray-300">Displays</Link></li>
                <li><Link href="/compare-mac" className="text-md font-semibold hover:text-gray-300">Compare Mac</Link></li>
                <li><Link href="/mac-does-that" className="text-md font-semibold hover:text-gray-300">Mac Does That</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extralight mb-4">Shop Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/shop-mac" className="text-md font-semibold hover:text-gray-300">Shop Mac</Link></li>
                <li><Link href="/mac-accessories" className="text-md font-semibold hover:text-gray-300">Mac Accessories</Link></li>
                <li><Link href="/apple-trade-in" className="text-md font-semibold hover:text-gray-300">Apple Trade In</Link></li>
                <li><Link href="/financing" className="text-md font-semibold hover:text-gray-300">Financing</Link></li>
                <li><Link href="/college-student-offer" className="text-md font-semibold hover:text-gray-300">College Student Offer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extralight mb-4">More from Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/mac-support" className="text-md font-semibold hover:text-gray-300">Mac Support</Link></li>
                <li><Link href="/applecare-plus-mac" className="text-md font-semibold hover:text-gray-300">AppleCare+ for Mac</Link></li>
                <li><Link href="/macos-preview" className="text-md font-semibold hover:text-gray-300">macOS Sequoia Preview</Link></li>
                <li><Link href="/apps-by-apple" className="text-md font-semibold hover:text-gray-300">Apps by Apple</Link></li>
                <li><Link href="/continuity" className="text-md font-semibold hover:text-gray-300">Continuity</Link></li>
                <li><Link href="/icloud-plus" className="text-md font-semibold hover:text-gray-300">iCloud+</Link></li>
                <li><Link href="/mac-for-business" className="text-md font-semibold hover:text-gray-300">Mac for Business</Link></li>
                <li><Link href="/education" className="text-md font-semibold hover:text-gray-300">Education</Link></li>
              </ul>
            </div>
          </NavItem>
          <NavItem 
            href="/mac" 
            text="Mac" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Mac'}
          >            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/mac" className="text-md font-semibold hover:text-gray-300">Explore All Mac</Link></li>
                <li><Link href="/macbook-air" className="text-md font-semibold hover:text-gray-300">MacBook Air</Link></li>
                <li><Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-300">MacBook Pro</Link></li>
                <li><Link href="/imac" className="text-md font-semibold hover:text-gray-300">iMac</Link></li>
                <li><Link href="/mac-mini" className="text-md font-semibold hover:text-gray-300">Mac mini</Link></li>
                <li><Link href="/mac-studio" className="text-md font-semibold hover:text-gray-300">Mac Studio</Link></li>
                <li><Link href="/mac-pro" className="text-md font-semibold hover:text-gray-300">Mac Pro</Link></li>
                <li><Link href="/displays" className="text-md font-semibold hover:text-gray-300">Displays</Link></li>
                <li><Link href="/compare-mac" className="text-md font-semibold hover:text-gray-300">Compare Mac</Link></li>
                <li><Link href="/mac-does-that" className="text-md font-semibold hover:text-gray-300">Mac Does That</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extralight mb-4">Shop Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/shop-mac" className="text-md font-semibold hover:text-gray-300">Shop Mac</Link></li>
                <li><Link href="/mac-accessories" className="text-md font-semibold hover:text-gray-300">Mac Accessories</Link></li>
                <li><Link href="/apple-trade-in" className="text-md font-semibold hover:text-gray-300">Apple Trade In</Link></li>
                <li><Link href="/financing" className="text-md font-semibold hover:text-gray-300">Financing</Link></li>
                <li><Link href="/college-student-offer" className="text-md font-semibold hover:text-gray-300">College Student Offer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extralight mb-4">More from Mac</h3>
              <ul className="space-y-2">
                <li><Link href="/mac-support" className="text-md font-semibold hover:text-gray-300">Mac Support</Link></li>
                <li><Link href="/applecare-plus-mac" className="text-md font-semibold hover:text-gray-300">AppleCare+ for Mac</Link></li>
                <li><Link href="/macos-preview" className="text-md font-semibold hover:text-gray-300">macOS Sequoia Preview</Link></li>
                <li><Link href="/apps-by-apple" className="text-md font-semibold hover:text-gray-300">Apps by Apple</Link></li>
                <li><Link href="/continuity" className="text-md font-semibold hover:text-gray-300">Continuity</Link></li>
                <li><Link href="/icloud-plus" className="text-md font-semibold hover:text-gray-300">iCloud+</Link></li>
                <li><Link href="/mac-for-business" className="text-md font-semibold hover:text-gray-300">Mac for Business</Link></li>
                <li><Link href="/education" className="text-md font-semibold hover:text-gray-300">Education</Link></li>
              </ul>
            </div>
          </NavItem>
          
        </div>
        
      </div>
      <div className="flex justify-between items-center md:hidden lg:hidden">
  <div className="flex items-end space-x-4 ml-auto">
    <button className="text-white pb-5">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </button>
    <button className="text-white pb-5">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
      </svg>
    </button>
    <button className="text-white pb-5" onClick={handleSidebarToggle}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </div>
</div>


{/* Full-screen dropdown sidebar */}
<div 
  className={`fixed inset-0 bg-black z-50 transition-all duration-300 ease-in-out ${
    isSidebarOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
  }`}
>
  <div className="flex flex-col h-full items-end"> {/* Align items to the end (right) */}
    <div className="flex justify-between items-center p-4 w-full">
      <button 
        className="text-white ml-auto" 
        onClick={handleSidebarToggle}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <div className="flex-grow overflow-y-auto p-4 w-full">
      <ul className="space-y-4 text-2xl "> {/* Align text to the right */}
        <NavItem 
          href="/" 
          text="Mac" 
          setActiveItem={setActiveItem}
          isActive={activeItem === 'Mac'}
        >
          <div>
            <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
            <ul className="space-y-2">
              <li><Link href="/mac" className="text-md font-semibold hover:text-gray-300">Explore All Mac</Link></li>
              <li><Link href="/macbook-air" className="text-md font-semibold hover:text-gray-300">MacBook Air</Link></li>
              <li><Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-300">MacBook Pro</Link></li>
              <li><Link href="/imac" className="text-md font-semibold hover:text-gray-300">iMac</Link></li>
              <li><Link href="/mac-mini" className="text-md font-semibold hover:text-gray-300">Mac mini</Link></li>
              <li><Link href="/mac-studio" className="text-md font-semibold hover:text-gray-300">Mac Studio</Link></li>
              <li><Link href="/mac-pro" className="text-md font-semibold hover:text-gray-300">Mac Pro</Link></li>
              <li><Link href="/displays" className="text-md font-semibold hover:text-gray-300">Displays</Link></li>
              <li><Link href="/compare-mac" className="text-md font-semibold hover:text-gray-300">Compare Mac</Link></li>
              <li><Link href="/mac-does-that" className="text-md font-semibold hover:text-gray-300">Mac Does That</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-extralight mb-4">Shop Mac</h3>
            <ul className="space-y-2">
              <li><Link href="/shop-mac" className="text-md font-semibold hover:text-gray-300">Shop Mac</Link></li>
              <li><Link href="/mac-accessories" className="text-md font-semibold hover:text-gray-300">Mac Accessories</Link></li>
              <li><Link href="/apple-trade-in" className="text-md font-semibold hover:text-gray-300">Apple Trade In</Link></li>
              <li><Link href="/financing" className="text-md font-semibold hover:text-gray-300">Financing</Link></li>
              <li><Link href="/college-student-offer" className="text-md font-semibold hover:text-gray-300">College Student Offer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-extralight mb-4">More from Mac</h3>
            <ul className="space-y-2">
              <li><Link href="/mac-support" className="text-md font-semibold hover:text-gray-300">Mac Support</Link></li>
              <li><Link href="/applecare-plus-mac" className="text-md font-semibold hover:text-gray-300">AppleCare+ for Mac</Link></li>
              <li><Link href="/macos-preview" className="text-md font-semibold hover:text-gray-300">macOS Sequoia Preview</Link></li>
              <li><Link href="/apps-by-apple" className="text-md font-semibold hover:text-gray-300">Apps by Apple</Link></li>
              <li><Link href="/continuity" className="text-md font-semibold hover:text-gray-300">Continuity</Link></li>
              <li><Link href="/icloud-plus" className="text-md font-semibold hover:text-gray-300">iCloud+</Link></li>
              <li><Link href="/mac-for-business" className="text-md font-semibold hover:text-gray-300">Mac for Business</Link></li>
              <li><Link href="/education" className="text-md font-semibold hover:text-gray-300">Education</Link></li>
            </ul>
          </div>
        </NavItem>
        <NavItem 
          href="/" 
          text="Store" 
          setActiveItem={setActiveItem}
          isActive={activeItem === 'Store'}
        >
          <div>
            <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
            <ul className="space-y-2">
              <li><Link href="/mac" className="text-md font-semibold hover:text-gray-300">Explore All Mac</Link></li>
              <li><Link href="/macbook-air" className="text-md font-semibold hover:text-gray-300">MacBook Air</Link></li>
              <li><Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-300">MacBook Pro</Link></li>
              <li><Link href="/imac" className="text-md font-semibold hover:text-gray-300">iMac</Link></li>
              <li><Link href="/mac-mini" className="text-md font-semibold hover:text-gray-300">Mac mini</Link></li>
              <li><Link href="/mac-studio" className="text-md font-semibold hover:text-gray-300">Mac Studio</Link></li>
              <li><Link href="/mac-pro" className="text-md font-semibold hover:text-gray-300">Mac Pro</Link></li>
              <li><Link href="/displays" className="text-md font-semibold hover:text-gray-300">Displays</Link></li>
              <li><Link href="/compare-mac" className="text-md font-semibold hover:text-gray-300">Compare Mac</Link></li>
              <li><Link href="/mac-does-that" className="text-md font-semibold hover:text-gray-300">Mac Does That</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-extralight mb-4">Shop Mac</h3>
            <ul className="space-y-2">
              <li><Link href="/shop-mac" className="text-md font-semibold hover:text-gray-300">Shop Mac</Link></li>
              <li><Link href="/mac-accessories" className="text-md font-semibold hover:text-gray-300">Mac Accessories</Link></li>
              <li><Link href="/apple-trade-in" className="text-md font-semibold hover:text-gray-300">Apple Trade In</Link></li>
              <li><Link href="/financing" className="text-md font-semibold hover:text-gray-300">Financing</Link></li>
              <li><Link href="/college-student-offer" className="text-md font-semibold hover:text-gray-300">College Student Offer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-extralight mb-4">More from Mac</h3>
            <ul className="space-y-2">
              <li><Link href="/mac-support" className="text-md font-semibold hover:text-gray-300">Mac Support</Link></li>
              <li><Link href="/applecare-plus-mac" className="text-md font-semibold hover:text-gray-300">AppleCare+ for Mac</Link></li>
              <li><Link href="/macos-preview" className="text-md font-semibold hover:text-gray-300">macOS Sequoia Preview</Link></li>
              <li><Link href="/apps-by-apple" className="text-md font-semibold hover:text-gray-300">Apps by Apple</Link></li>
              <li><Link href="/continuity" className="text-md font-semibold hover:text-gray-300">Continuity</Link></li>
              <li><Link href="/icloud-plus" className="text-md font-semibold hover:text-gray-300">iCloud+</Link></li>
              <li><Link href="/mac-for-business" className="text-md font-semibold hover:text-gray-300">Mac for Business</Link></li>
              <li><Link href="/education" className="text-md font-semibold hover:text-gray-300">Education</Link></li>
            </ul>
          </div>
        </NavItem>
      </ul>
    </div>
  </div>
</div>

      </nav>
    
  );
};

export default Navbar;