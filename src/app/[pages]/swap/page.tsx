// src/app/pages/swap/page.tsx

'use client'

import React from 'react';
import Image from 'next/image';

import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SwapPanel from '@/components/SwapPanel';
import MainPanelWrapper from '@/components/MainPanelWrapper';

const Swap: React.FC = () => {
  return (
    <div>
      <div className="w-full min-h-screen flex flex-row md:space-x-8 bg-[#0e0e0e] bg-cover bg-no-repeat bg-[url('/image/bg.png')] px-0 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 3xl:px-36 py-0 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 3xl:py-32">
        {/* Navbar */}
        <div className='hidden md:block'>
          <Navbar />
        </div>
        {/* Container */}
        <MainPanelWrapper>
          <Header />
          {/* container */}
          <div className='flex flex-col w-full p-2 sm:p-3 md:p-4 lg:p-6 justify-center'>
            {/* title */}
            <div className='flex flex-row mb-4'>
              <div>
                <Image src={'/image/swap-title-swap.png'} alt='nav-home' width={82} height={82} />
              </div>
              <div className='pl-4'>
                <div className='text-[#FCD80A] text-[30px] md:text-[34px] leading-[26.88px] font-[700]'>
                  Swap GOLD
                </div>
                <div className='text-[#E4F4FF] text-20 md:text-[30px] leading-[32px] md:leading-[48px] font-[600]'>
                  You Can Exchange your $SWCH to $SGOLD
                </div>
              </div>
            </div>
            {/* body */}
            <div className='relative mb-8'>
              <div className='relative flex flex-col justify-center px-2 z-20'>
                <SwapPanel/>
                <div className='block lg:hidden'>
                  <div className='flex justify-center -mt-[20px]'>
                    <Image src={'/image/gold-to-sgold.png'} alt='nav-home' width={344} height={314} />
                  </div>
                </div>
              </div>
              <div className='hidden lg:flex flex-row absolute top-0 left-0 w-full h-full'>
                <div className='content-end'>
                  <Image src={'/image/golds.png'} alt='nav-home' width={380} height={229} />
                </div>
                <div className='ml-auto'>
                  <Image src={'/image/gold-to-sgold.png'} alt='nav-home' width={344} height={314} />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </MainPanelWrapper>
      </div>
    </div>
  )
}

export default Swap;