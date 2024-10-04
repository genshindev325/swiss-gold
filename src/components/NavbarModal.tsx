// src/components/Navbar.tsx

'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface INavbarModal {
  isOpen: boolean;
  onClose: () => void;
}

const NavbarModal: React.FC<INavbarModal> = ({ isOpen, onClose }) => {
  const [selectedMenu, setSelectedMenu] = useState('home');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedMenu = sessionStorage.getItem('selectedMenu');
    if (storedMenu) {
      setSelectedMenu(storedMenu);
    }
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  if (!isOpen) return null;

  const handleMenuClick = (menu: string) => {
    sessionStorage.setItem('previewMenu', selectedMenu);
    setSelectedMenu(menu);
    sessionStorage.setItem('selectedMenu', menu);
  };

  return (
    <div className="fixed flex top-32 right-14 bg-black bg-opacity-70 z-20">
    <div ref={modalRef} className="w-[222px] h-[440px] border border-[#EAAD2A] rounded-3xl bg-[#161616] flex flex-col items-start justify-start py-10 px-8">
      <Image src={'/image/mark.png'} alt='swiss-gold' width={155} height={45} className='pb-4' priority />
      <Link href={'/pages/home'}>
        <button className='flex flex-row items-center space-x-2 my-3' onClick={() => handleMenuClick('home')}>
          {selectedMenu === 'home' ? <div className='bg-[#EAAD2A] rounded-full w-2 h-2' /> : <div className='w-2 bg-transparent'></div>}
          <Image src={'/image/nav-home.png'} alt='nav-home' width={30} height={30} />
          <h2 className={`${selectedMenu === 'home' ? 'text-[#FCD80A] font-bold text-sm' : 'text-white text-sm'} duration-500`}>Home</h2>
        </button>
      </Link>
      <Link href={'/pages/swap'}>
        <button className='flex flex-row items-center space-x-2 my-3' onClick={() => handleMenuClick('swap')}>
          {selectedMenu === 'swap' ? <div className='bg-[#EAAD2A] rounded-full w-2 h-2' /> : <div className='w-2 bg-transparent'></div>}
          <Image src={'/image/nav-swap.png'} alt='nav-home' width={30} height={30} />
          <h2 className={`${selectedMenu === 'swap' ? 'text-[#FCD80A] font-bold text-sm' : 'text-white text-sm'} duration-500`}>SwapGOLD</h2>
        </button>
      </Link>
      <Link href={'/pages/stake'}>
        <button className='flex flex-row items-center space-x-2 my-3' onClick={() => handleMenuClick('stake')}>
          {selectedMenu === 'stake' ? <div className='bg-[#EAAD2A] rounded-full w-2 h-2' /> : <div className='w-2 bg-transparent'></div>}
          <Image src={'/image/nav-stake.png'} alt='nav-home' width={30} height={30} />
          <h2 className={`${selectedMenu === 'stake' ? 'text-[#FCD80A] font-bold text-sm' : 'text-white text-sm'} duration-500`}>Stake</h2>
        </button>
      </Link>
      <Link href={'/pages/blog'}>
        <button className='flex flex-row items-center space-x-2 my-3' onClick={() => handleMenuClick('blog')}>
          {selectedMenu === 'blog' ? <div className='bg-[#EAAD2A] rounded-full w-2 h-2' /> : <div className='w-2 bg-transparent'></div>}
          <Image src={'/image/nav-blog.png'} alt='nav-home' width={30} height={30} />
          <h2 className={`${selectedMenu === 'blog' ? 'text-[#FCD80A] font-bold text-sm' : 'text-white text-sm'} duration-500`}>Blog</h2>
        </button>
      </Link>
      <Link href={'/pages/contact'}>
        <button className='flex flex-row items-center space-x-2 my-3' onClick={() => handleMenuClick('contact')}>
          {selectedMenu === 'contact' ? <div className='bg-[#EAAD2A] rounded-full w-2 h-2' /> : <div className='w-2 bg-transparent'></div>}
          <Image src={'/image/nav-contact.png'} alt='nav-home' width={30} height={30} />
          <h2 className={`${selectedMenu === 'contact' ? 'text-[#FCD80A] font-bold text-sm' : 'text-white text-sm'} duration-500`}>Contact Us</h2>
        </button>
      </Link>
      <Link href={'/pages/help'}>
        <button className='flex flex-row items-center space-x-2 my-3' onClick={() => handleMenuClick('help')}>
          {selectedMenu === 'help' ? <div className='bg-[#EAAD2A] rounded-full w-2 h-2' /> : <div className='w-2 bg-transparent'></div>}
          <Image src={'/image/nav-help.png'} alt='nav-home' width={30} height={30} />
          <h2 className={`${selectedMenu === 'help' ? 'text-[#FCD80A] font-bold text-sm' : 'text-white text-sm'} duration-500`}>Help Center</h2>
        </button>
      </Link>
    </div>
    </div>
  )
}

export default NavbarModal;