"use client";
import { useState, useEffect, useRef, ReactNode, SetStateAction, Dispatch } from 'react';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  text: string;
  children?: ReactNode;
  tracker?: number;
  setActiveItem: (item: string) => void;
  isActive: boolean;
  setTracker: Dispatch<SetStateAction<number>>
}

const NavItem = ({ href, text, children, setActiveItem, isActive, tracker, setTracker }: NavItemProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const [key, setKey] = useState(0);
  const [activeTracker, setActiveTracker] = useState(tracker);

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownHeight(isActive ? dropdownRef.current.scrollHeight : 0);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      setKey(prevKey => prevKey + 1);
      setActiveTracker(undefined); // Reset tracker
    } else {
      setActiveTracker(tracker); // Set tracker when active
    }
  }, [isActive, tracker]);

  const handleMouseEnter = () => {
    setActiveItem(text);
  };

  const dropdownMouseLeave = () => {
    if (dropdownRef.current && !dropdownRef.current.contains(document.activeElement)) {
      setActiveItem('');
      setTracker(0)
    }
  };

  return (
    <div className="relative">
  <Link href={href} passHref>
    <span
      className="hover:text-gray-100"
      onMouseEnter={handleMouseEnter}
      
      ref={navContainerRef}
    >
      {text}
    </span>
  </Link>
  <div
    ref={dropdownRef}
    className={`fixed left-0 right-0 top-0 p-10 bg-black z-40 backdrop-blur transition-all duration-500 ease-in-out ${
      isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}
    style={{
      top: navContainerRef.current ? navContainerRef.current.getBoundingClientRect().bottom + 'px' : '-1000px',
      height: `${dropdownHeight}px`
    }}
    onMouseEnter={handleMouseEnter} // Ensure dropdown remains open on dropdown mouse enter
    onMouseLeave={dropdownMouseLeave} // Ensure dropdown closes on dropdown mouse leave
  >
    {isActive && (
      <div key={key} className="flex max-w-7xl items-center justify-center mx-auto px-2 py-8">        
        <div className="w-2/3 ">
          <div className="flex">
            <div className="w-1/2">{children}</div>
            <div className="ml-4">
              {activeTracker === 1 && (
                <div className="px-2 pt-8">
                  <div className="flex flex-col gap-2 ">
                    <span className="px-2 slide-in-left-1 transition duration-100">Discover the latest Macs</span>
                    <span className="px-2 slide-in-left-2 transition duration-100">Powerful performance</span>
                    <span className="px-2 slide-in-left-3 transition duration-100">Sleek design</span>
                    <span className="px-2 slide-in-left-4 transition duration-100">Innovative features</span>
                  </div>
                </div>
              )}
              {activeTracker === 2 && (
                <div className="px-2 pt-8">
                  <div className="flex flex-col gap-2 w-full">
                    <span className="px-2 slide-in-left-1 transition duration-100">Explore new iPads</span>
                    <span className="px-2 slide-in-left-2 transition duration-100">Stunning displays</span>
                    <span className="px-2 slide-in-left-3 transition duration-100">Long battery life</span>
                    <span className="px-2 slide-in-left-4 transition duration-100">Versatile design</span>
                  </div>
                </div>
              )}
              {activeTracker === 3 && (
                <div className="px-2 pt-8">
                  <div className="flex flex-col gap-2 w-full">
                    <span className="px-2 slide-in-left-1 transition duration-100">Discover the new iPhones</span>
                    <span className="px-2 slide-in-left-2 transition duration-100">Exceptional cameras</span>
                    <span className="px-2 slide-in-left-3 transition duration-100">Super Retina display</span>
                    <span className="px-2 slide-in-left-4 transition duration-100">Powerful performance</span>
                  </div>
                </div>
              )}
              {activeTracker === 4 && (
                <div className="px-2 pt-8">
                  <div className="flex flex-col gap-2 w-full">
                    <span className="px-2 slide-in-left-1 transition duration-100">Explore the latest Apple Watches</span>
                    <span className="px-2 slide-in-left-2 transition duration-100">Advanced health features</span>
                    <span className="px-2 slide-in-left-3 transition duration-100">Customizable designs</span>
                    <span className="px-2 slide-in-left-4 transition duration-100">Seamless connectivity</span>
                  </div>
                </div>
              )}
              {activeTracker === 5 && (
                <div className="px-2 pt-8">
                  <div className="flex flex-col gap-2 w-full">
                    <span className="px-2 slide-in-left-1 transition duration-100">Discover the latest iPhones</span>
                    <span className="px-2 slide-in-left-2 transition duration-100">Incredible cameras</span>
                    <span className="px-2 slide-in-left-3 transition duration-100">Super Retina XDR display</span>
                    <span className="px-2 slide-in-left-4 transition duration-100">Ultrafast performance</span>
                  </div>
                </div>
              )}
              {activeTracker === 6 && (
                <div className="px-2 pt-8">
                  <div className="flex flex-col gap-2 w-full">
                    <span className="px-2 slide-in-left-1 transition duration-100">Explore the new MacBook Pro</span>
                    <span className="px-2 slide-in-left-2 transition duration-100">Revolutionary M1 Pro and M1 Max chips</span>
                    <span className="px-2 slide-in-left-3 transition duration-100">XDR Liquid Retina display</span>
                    <span className="px-2 slide-in-left-4 transition duration-100">Thunderbolt 4 ports</span>
                  </div>
                </div>
              )}
              {activeTracker === 7 && (
                <div className="px-2 pt-8">
                  <div className="flex flex-col gap-2 w-full">
                    <span className="px-2 slide-in-left-1 transition duration-100">Discover the new iPad Air</span>
                    <span className="px-2 slide-in-left-2 transition duration-100">Stunning 10.9-inch Liquid Retina display</span>
                    <span className="px-2 slide-in-left-3 transition duration-100">Powerful A15 Bionic chip</span>
                    <span className="px-2 slide-in-left-4 transition duration-100">5G capability</span>
                  </div>
                </div>
              )}
              {activeTracker === 8 && (
                <div className="px-2 pt-8">
                  <div className="flex flex-col gap-2 w-full">
                    <span className="px-2 slide-in-left-1 transition duration-100">Explore the new AirPods Pro</span>
                    <span className="px-2 slide-in-left-2 transition duration-100">Spatial audio with dynamic head tracking</span>
                    <span className="px-2 slide-in-left-3 transition duration-100">Adaptive EQ</span>
                    <span className="px-2 slide-in-left-4 transition duration-100">Sweat and water resistance</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

  );
};




const Navbar = () => {
  const [activeItem, setActiveItem] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChildSidebarOpen, setIsChildSidebarOpen] = useState(false);
  const [childSidebarContent, setChildSidebarContent] = useState<ReactNode | null>(null);
  const [tracker, setTracker] = useState(0)
  const handleHover = ( number: SetStateAction<number>) => {
    setTracker(number);
  };
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
    <nav className="bg-black text-white p-6 h-12 fixed top-0 left-0 right-0 z-50  ">
    <div className="hidden md:flex max-w-7xl mx-auto justify-center items-center ">
        <div className="flex-shrink-0 ">
          <Link href="/" className="text-white">
            {/* Apple logo */}
          </Link>
        </div>
        <div className="fixed md:flex  justify-start text-left  space-x-8 text-sm  ">

          <NavItem 
            href="/store" 
            text="Store" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Store'}
            tracker={tracker}
            setTracker={setTracker}
          >
            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              
              <div className="space-y-2">
  <ul className="flex flex-col space-y-4">
    <li className="relative">
    <Link href="/mac" className="text-md font-semibold hover:text-gray-100 inline-block group"
          onMouseEnter={()=>handleHover(1)}>
      Explore All Mac
    </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-air" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(2)}>
        MacBook Air
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(3)}>
        MacBook Pro
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/imac" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(4)}>
        iMac
      </Link>
    </li>
  </ul>
</div>
            </div>
          </NavItem>
          <NavItem 
            href="/mac" 
            text="Mac" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Mac'}
            tracker={tracker}
            setTracker={setTracker}
          >
            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Iphone</h3>
              
              <div className="space-y-2">
  <ul className="flex flex-col space-y-4">
    <li className="relative">
    <Link href="/mac" className="text-md font-semibold hover:text-gray-100 inline-block group"
          onMouseEnter={()=>handleHover(5)}>
      Explore All Iphones
    </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-air" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(6)}>
        Iphone 15
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(7)}>
      Iphone 15 pro
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/imac" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(8)}>
      Iphone 15 pro max
      </Link>
    </li>
  </ul>
</div>
            </div>
          </NavItem>
          <NavItem 
            href="/mac" 
            text="Ipad" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Ipad'}
            tracker={tracker}
            setTracker={setTracker}
          >
            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Iphone</h3>
              
              <div className="space-y-2">
              <ul className="flex flex-col space-y-4">
                <li className="relative">
                <Link href="/mac" className="text-md font-semibold hover:text-gray-100 inline-block group"
                      onMouseEnter={()=>handleHover(5)}>
                  Explore All Iphones
                </Link>
                </li>
              </ul>
              
              <ul className="flex flex-col space-y-4">
                <li className="relative">
                  <Link href="/macbook-air" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(6)}>
                    Iphone 15
                  </Link>
                </li>
              </ul>
              
              <ul className="flex flex-col space-y-4">
                <li className="relative">
                  <Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(7)}>
                  Iphone 15 pro
                  </Link>
                </li>
              </ul>
              
              <ul className="flex flex-col space-y-4">
                <li className="relative">
                  <Link href="/imac" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(8)}>
                  Iphone 15 pro max
                  </Link>
                </li>
              </ul>
            </div>
            </div>
          </NavItem>

          <NavItem 
            href="/store" 
            text="AirPods" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'AirPods'}
            tracker={tracker}
            setTracker={setTracker}
          >
            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              
              <div className="space-y-2">
  <ul className="flex flex-col space-y-4">
    <li className="relative">
    <Link href="/mac" className="text-md font-semibold hover:text-gray-100 inline-block group"
          onMouseEnter={()=>handleHover(1)}>
      Explore All Mac
    </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-air" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(2)}>
        MacBook Air
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(3)}>
        MacBook Pro
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/imac" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(4)}>
        iMac
      </Link>
    </li>
  </ul>
</div>
            </div>
          </NavItem>
          
          <NavItem 
            href="/store" 
            text="Tvs" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Tvs'}
            tracker={tracker}
            setTracker={setTracker}
          >
            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              
              <div className="space-y-2">
  <ul className="flex flex-col space-y-4">
    <li className="relative">
    <Link href="/mac" className="text-md font-semibold hover:text-gray-100 inline-block group"
          onMouseEnter={()=>handleHover(1)}>
      Explore All Mac
    </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-air" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(2)}>
        MacBook Air
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(3)}>
        MacBook Pro
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/imac" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(4)}>
        iMac
      </Link>
    </li>
  </ul>
</div>
            </div>
          </NavItem>
          
          <NavItem 
            href="/store" 
            text="Entertainment" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Entertainment'}
            tracker={tracker}
            setTracker={setTracker}
          >
            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              
              <div className="space-y-2">
  <ul className="flex flex-col space-y-4">
    <li className="relative">
    <Link href="/mac" className="text-md font-semibold hover:text-gray-100 inline-block group"
          onMouseEnter={()=>handleHover(1)}>
      Explore All Mac
    </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-air" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(2)}>
        MacBook Air
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(3)}>
        MacBook Pro
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/imac" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(4)}>
        iMac
      </Link>
    </li>
  </ul>
</div>
            </div>
          </NavItem>
          
          <NavItem 
            href="/store" 
            text="Watch" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Watch'}
            tracker={tracker}
            setTracker={setTracker}
          >
            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              
              <div className="space-y-2">
  <ul className="flex flex-col space-y-4">
    <li className="relative">
    <Link href="/mac" className="text-md font-semibold hover:text-gray-100 inline-block group"
          onMouseEnter={()=>handleHover(1)}>
      Explore All Mac
    </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-air" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(2)}>
        MacBook Air
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(3)}>
        MacBook Pro
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/imac" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(4)}>
        iMac
      </Link>
    </li>
  </ul>
</div>
            </div>
          </NavItem>

          <NavItem 
            href="/store" 
            text="Home" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Home'}
            tracker={tracker}
            setTracker={setTracker}
          >
            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              
              <div className="space-y-2">
  <ul className="flex flex-col space-y-4">
    <li className="relative">
    <Link href="/mac" className="text-md font-semibold hover:text-gray-100 inline-block group"
          onMouseEnter={()=>handleHover(1)}>
      Explore All Mac
    </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-air" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(2)}>
        MacBook Air
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(3)}>
        MacBook Pro
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/imac" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(4)}>
        iMac
      </Link>
    </li>
  </ul>

  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/imac" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(5)}>
        iMac
      </Link>
    </li>
  </ul>

  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/imac" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(6)}>
        iMac
      </Link>
    </li>
  </ul>

  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/imac" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(7)}>
        iMac
      </Link>
    </li>
  </ul>
</div>

            </div>
          </NavItem>

          <NavItem 
            href="/store" 
            text="Accesories" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Accesories'}
            tracker={tracker}
            setTracker={setTracker}
          >
            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              
              <div className="space-y-2">
  <ul className="flex flex-col space-y-4">
    <li className="relative">
    <Link href="/mac" className="text-md font-semibold hover:text-gray-100 inline-block group"
          onMouseEnter={()=>handleHover(1)}>
      Explore All Mac
    </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-air" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(2)}>
        MacBook Air
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(3)}>
        MacBook Pro
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/imac" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(4)}>
        iMac
      </Link>
    </li>
  </ul>
</div>
            </div>
          </NavItem>

          <NavItem 
            href="/store" 
            text="Support" 
            setActiveItem={setActiveItem}
            isActive={activeItem === 'Support'}
            tracker={tracker}
            setTracker={setTracker}
          >
            <div>
              <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
              
              <div className="space-y-2">
  <ul className="flex flex-col space-y-4">
    <li className="relative">
    <Link href="/mac" className="text-md font-semibold hover:text-gray-100 inline-block group"
          onMouseEnter={()=>handleHover(1)}>
      Explore All Mac
    </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-air" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(2)}>
        MacBook Air
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(3)}>
        MacBook Pro
      </Link>
    </li>
  </ul>
  
  <ul className="flex flex-col space-y-4">
    <li className="relative">
      <Link href="/imac" className="text-md font-semibold hover:text-gray-100 inline-block group" onMouseEnter={()=>handleHover(4)}>
        iMac
      </Link>
    </li>
  </ul>
</div>
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
  className={`fixed inset-0 bg-black z-50 transition-all duration-100 ease-in-out ${
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
          setTracker={setTracker}
        >
          <div>
            <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
            <ul className="space-y-2">
              <li><Link href="/mac" className="text-md font-semibold hover:text-gray-100">Explore All Mac</Link></li>
              <li><Link href="/macbook-air" className="text-md font-semibold hover:text-gray-100">MacBook Air</Link></li>
              <li><Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-100">MacBook Pro</Link></li>
              <li><Link href="/imac" className="text-md font-semibold hover:text-gray-100">iMac</Link></li>
              <li><Link href="/mac-mini" className="text-md font-semibold hover:text-gray-100">Mac mini</Link></li>
              <li><Link href="/mac-studio" className="text-md font-semibold hover:text-gray-100">Mac Studio</Link></li>
              <li><Link href="/mac-pro" className="text-md font-semibold hover:text-gray-100">Mac Pro</Link></li>
              <li><Link href="/displays" className="text-md font-semibold hover:text-gray-100">Displays</Link></li>
              <li><Link href="/compare-mac" className="text-md font-semibold hover:text-gray-100">Compare Mac</Link></li>
              <li><Link href="/mac-does-that" className="text-md font-semibold hover:text-gray-100">Mac Does That</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-extralight mb-4">Shop Mac</h3>
            <ul className="space-y-2">
              <li><Link href="/shop-mac" className="text-md font-semibold hover:text-gray-100">Shop Mac</Link></li>
              <li><Link href="/mac-accessories" className="text-md font-semibold hover:text-gray-100">Mac Accessories</Link></li>
              <li><Link href="/apple-trade-in" className="text-md font-semibold hover:text-gray-100">Apple Trade In</Link></li>
              <li><Link href="/financing" className="text-md font-semibold hover:text-gray-100">Financing</Link></li>
              <li><Link href="/college-student-offer" className="text-md font-semibold hover:text-gray-100">College Student Offer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-extralight mb-4">More from Mac</h3>
            <ul className="space-y-2">
              <li><Link href="/mac-support" className="text-md font-semibold hover:text-gray-100">Mac Support</Link></li>
              <li><Link href="/applecare-plus-mac" className="text-md font-semibold hover:text-gray-100">AppleCare+ for Mac</Link></li>
              <li><Link href="/macos-preview" className="text-md font-semibold hover:text-gray-100">macOS Sequoia Preview</Link></li>
              <li><Link href="/apps-by-apple" className="text-md font-semibold hover:text-gray-100">Apps by Apple</Link></li>
              <li><Link href="/continuity" className="text-md font-semibold hover:text-gray-100">Continuity</Link></li>
              <li><Link href="/icloud-plus" className="text-md font-semibold hover:text-gray-100">iCloud+</Link></li>
              <li><Link href="/mac-for-business" className="text-md font-semibold hover:text-gray-100">Mac for Business</Link></li>
              <li><Link href="/education" className="text-md font-semibold hover:text-gray-100">Education</Link></li>
            </ul>
          </div>
        </NavItem>
        <NavItem 
          href="/" 
          text="Store" 
          setActiveItem={setActiveItem}
          setTracker={setTracker}
          isActive={activeItem === 'Store'}
        >
          <div>
            <h3 className="text-sm font-extralight mb-4">Explore Mac</h3>
            <ul className="space-y-2">
              <li><Link href="/mac" className="text-md font-semibold hover:text-gray-100">Explore All Mac</Link></li>
              <li><Link href="/macbook-air" className="text-md font-semibold hover:text-gray-100">MacBook Air</Link></li>
              <li><Link href="/macbook-pro" className="text-md font-semibold hover:text-gray-100">MacBook Pro</Link></li>
              <li><Link href="/imac" className="text-md font-semibold hover:text-gray-100">iMac</Link></li>
              <li><Link href="/mac-mini" className="text-md font-semibold hover:text-gray-100">Mac mini</Link></li>
              <li><Link href="/mac-studio" className="text-md font-semibold hover:text-gray-100">Mac Studio</Link></li>
              <li><Link href="/mac-pro" className="text-md font-semibold hover:text-gray-100">Mac Pro</Link></li>
              <li><Link href="/displays" className="text-md font-semibold hover:text-gray-100">Displays</Link></li>
              <li><Link href="/compare-mac" className="text-md font-semibold hover:text-gray-100">Compare Mac</Link></li>
              <li><Link href="/mac-does-that" className="text-md font-semibold hover:text-gray-100">Mac Does That</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-extralight mb-4">Shop Mac</h3>
            <ul className="space-y-2">
              <li><Link href="/shop-mac" className="text-md font-semibold hover:text-gray-100">Shop Mac</Link></li>
              <li><Link href="/mac-accessories" className="text-md font-semibold hover:text-gray-100">Mac Accessories</Link></li>
              <li><Link href="/apple-trade-in" className="text-md font-semibold hover:text-gray-100">Apple Trade In</Link></li>
              <li><Link href="/financing" className="text-md font-semibold hover:text-gray-100">Financing</Link></li>
              <li><Link href="/college-student-offer" className="text-md font-semibold hover:text-gray-100">College Student Offer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-extralight mb-4">More from Mac</h3>
            <ul className="space-y-2">
              <li><Link href="/mac-support" className="text-md font-semibold hover:text-gray-100">Mac Support</Link></li>
              <li><Link href="/applecare-plus-mac" className="text-md font-semibold hover:text-gray-100">AppleCare+ for Mac</Link></li>
              <li><Link href="/macos-preview" className="text-md font-semibold hover:text-gray-100">macOS Sequoia Preview</Link></li>
              <li><Link href="/apps-by-apple" className="text-md font-semibold hover:text-gray-100">Apps by Apple</Link></li>
              <li><Link href="/continuity" className="text-md font-semibold hover:text-gray-100">Continuity</Link></li>
              <li><Link href="/icloud-plus" className="text-md font-semibold hover:text-gray-100">iCloud+</Link></li>
              <li><Link href="/mac-for-business" className="text-md font-semibold hover:text-gray-100">Mac for Business</Link></li>
              <li><Link href="/education" className="text-md font-semibold hover:text-gray-100">Education</Link></li>
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