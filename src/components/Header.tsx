// src/components/Header.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaCaretUp, FaCaretDown } from 'react-icons/fa6';
import Image from 'next/image';
import NavbarModal from '@/components/NavbarModal';
import WalletConnectButton from '@/components/WalletConnectButton';
import { formatNumber } from '@/utils/utils';

import { getTokenPriceInUsdWithChangePercentage } from '@/utils/tokens';

const Header: React.FC = () => {
  const [goldPrice, setGoldPrice] = useState(0.00);
  const [goldPriceChangePercent, setGoldPriceChangePercent] = useState(0.00);
  const [viewMenu, setViewMenu] = useState(false);

  useEffect(() => {
    const fetchPrice = async () =>{
      try {
        const tokenId = 'tether-gold';
        const {tokenPrice, tokenPriceChangePercent} = await getTokenPriceInUsdWithChangePercentage(tokenId);
        setGoldPrice(tokenPrice || 0);
        setGoldPriceChangePercent(tokenPriceChangePercent);
      } catch (error) {
        console.log("Failed to get gold price. Error: " + error);
      }
    }
    fetchPrice();
  }, [])

  const handleNetwork = () => {

  };

  return (
    <div className='flex flex-row w-full px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 3xl:px-14'>
      <div className='hidden xl:block'>
        <div className='flex flex-row'>
          <h2 className='text-[#FCD80A] text-xl font-semibold'>Gold(oz) = ${formatNumber(goldPrice)}</h2>
          {
            goldPriceChangePercent >= 0 ? 
            (<div className='flex text-[#00D320] my-auto mx-2 items-center'>
              <FaCaretUp />
              <h2 className='text-xl'>%{formatNumber(goldPriceChangePercent)}</h2>
            </div> )
            :
            (<div className='flex text-[#FF0000] my-auto mx-2 items-center'>
              <FaCaretDown />
              <h2 className='text-xl'>%{formatNumber(-goldPriceChangePercent)}</h2>
            </div> )
          }  
        </div>
      </div>
      <div className='block md:hidden'>
        <Image src={'/image/mark.png'} alt='mark' width={156} height={45} />
      </div>
      <div className='flex flex-row space-x-1 sm:space-x-2 lg:space-x-4 ml-auto items-center'>
        <button type='button' onClick={handleNetwork} className='flex flex-row items-center space-x-2 p-2 text-white text-lg lg:rounded-full lg:border lg:border-white lg:bg-white/20 lg:hover:bg-white/50 lg:duration-500 min-w-[65px]'>
          <Image src={'/image/chains/polygon.png'} alt='polygon-mark.png' width={28} height={28} />
          <h2 className='hidden lg:block'>Polygon Network</h2>
          <FaChevronDown className='ml-2' />
        </button>
        <WalletConnectButton />
        <div className='block md:hidden'>
          <Image src={'/image/menu.png'} alt='menu' width={18} height={14} className='min-w-[18px]' onClick={() => setViewMenu(true)} />
        </div>
      </div>
      <NavbarModal isOpen={viewMenu} onClose={() => setViewMenu(false)} />
    </div>
  )
}

export default Header;