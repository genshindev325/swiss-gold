// src/components/Header.tsx

'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatNumber } from '@/utils/formatNumber';

const Header: React.FC = () => {
  const [price, setPrice] = useState(2671.37);
  const [percentUp, setPercentUp] = useState(0.54);

  const handleNetwork = () => {

  };

  const handleWallet = () => {

  };

  return (
    <div className='flex flex-row w-full px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 3xl:px-14'>
      <div className='hidden xl:block'>
        <div className='flex flex-row'>
          <h2 className='text-[#FCD80A] text-xl font-semibold'>Gold(oz) = ${formatNumber(price)}</h2>
          <div className='my-auto mx-2'>
            <Image src={'/image/icon-up.png'} alt='up' width={14} height={8} />
          </div>
          <h2 className='text-[#00D320] text-xl'>%{formatNumber(percentUp)}</h2>
        </div>
      </div>
      <div className='block md:hidden'>
        <Image src={'/image/mark.png'} alt='mark' width={156} height={45} />
      </div>
      <div className='flex flex-row space-x-1 sm:space-x-2 lg:space-x-4 ml-auto items-center'>
        <button type='button' onClick={handleNetwork} className='flex flex-row items-center space-x-2 p-2 text-white text-lg lg:rounded-full lg:border lg:border-white lg:bg-white/20 lg:hover:bg-white/50 lg:duration-500'>
          <Image src={'/image/polygon-mark.png'} alt='polygon-mark.png' width={28} height={28} />
          <h2 className='hidden lg:block'>Polygon Network</h2>
          <Image src={'/image/icon-down.png'} alt='icon-down' width={13} height={8} />
        </button>
        <button type='button' onClick={handleWallet} className='py-2 px-2 sm:px-10 text-gray-700 font-bold text-xs sm:text-sm md:text-md lg:text-lg rounded-full bg-gradient-to-r from-[#FCD80A] to-[#FFBB01]'>
          Connect Wallet
        </button>
        <div className='block md:hidden'>
          <Image src={'/image/menu.png'} alt='menu' width={18} height={14} />
        </div>
      </div>
    </div>
  )
}

export default Header;