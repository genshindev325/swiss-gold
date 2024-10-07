// src/app/pages/stake/page.tsx

'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6';

import MainPanelWrapper from '@/components/MainPanelWrapper'
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StakePanel from '@/components/StakePanel';
import GraphPanel from '@/components/GraphPanel';
import { formatNumber } from '@/utils/utils';
import { getTokenPriceInUsdWithChangePercentage } from '@/utils/tokens';

interface IGraphPanel {
  positionNumber: number;
  percentUp: number;
  cost: number;
  current: number;
  PNL: string;
}

const Stake: React.FC = () => {
  const [tab, setTab] = useState<'new' | 'current'>('new');
  const [graphData, setGraphData] = useState<IGraphPanel[]>([]);
  const [goldPrice, setGoldPrice] = useState(0.00);
  const [goldPriceChangePercent, setGoldPriceChangePercent] = useState(0.00);
  useEffect(() => {
    const fetchPrice = async () =>{
      try {
        const tokenId = 'tether-gold';
        const {tokenPrice, tokenPriceChangePercent} = await getTokenPriceInUsdWithChangePercentage(tokenId);
        setGoldPrice(tokenPrice || 0);
        setGoldPriceChangePercent(tokenPriceChangePercent);
      } catch (error) {
        console.log("Failed to get gold price. Error :" + error);
      }
    }
    fetchPrice();
  }, []);

  useEffect(() => {
    // will be fetched from the server...
    setGraphData([
      {
        positionNumber: 1,
        percentUp: 133,
        cost: 1500,
        current: 1870,
        PNL: '+370 (%20)',
      },
      {
        positionNumber: 2,
        percentUp: 133,
        cost: 1500,
        current: 1870,
        PNL: '+370 (%20)',
      },
      {
        positionNumber: 3,
        percentUp: 133,
        cost: 1500,
        current: 1870,
        PNL: '+370 (%20)',
      },
      {
        positionNumber: 4,
        percentUp: 133,
        cost: 1500,
        current: 1870,
        PNL: '+370 (%20)',
      },
    ])
  }, []);

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
          <div className='flex flex-col w-full p-4 sm:p-5 md:p-6 justify-center'>
            {/* title */}
            <div className='flex flex-row justify-start mb-8 md:mb-16 mt-8 md:mt-0'>
              <div className='mt-1'>
                <Image src={'/image/stake-logo.png'} alt='stake-logo' width={82} height={82} />
              </div>
              <div className='pl-4'>
                <div className='text-[#FCD80A] text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold pb-2'>
                  Stake $SGOLD Token
                </div>
                <div className='text-[#E4F4FF] text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold'>
                  Stake your $SGOLD Tokens and Earn Money
                </div>
              </div>
            </div>
            {/* tab */}
            <div className='flex flex-row justify-center px-2 space-x-4 md:space-x-6 pb-4'>
              <button
                type='button'
                className={`${tab === 'new' ? 'bg-[#FFD900] text-black rounded-full' : 'text-[#FFD900] bg-transparent'} rounded-full text-md font-bold px-4 py-2 duration-300 min-w-[135px]`}
                onClick={() => setTab('new')}
              >
                New Position
              </button>
              <button
                type='button'
                className={`${tab === 'current' ? 'bg-[#FFD900] text-black rounded-full' : 'text-[#FFD900] bg-transparent'} rounded-full text-md font-bold px-4 py-2 duration-300 min-w-[135px]`}
                onClick={() => setTab('current')}
              >
                Current Positions
              </button>
            </div>
            {/* body */}
            {tab === 'new' ?
              <div className='relative mb-20'>
                <div className='relative flex flex-col justify-center px-2 z-20'>
                  <StakePanel/>
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
              :
              <div className='flex flex-col items-center'>
                <div className='grid grid-cols-2 2xl:grid-cols-4 gap-4 lg:justify-center w-full'>
                  {graphData.map((data, index) => (
                    <GraphPanel key={index} positionNumber={data.positionNumber} percentUp={data.percentUp} cost={data.cost} current={data.current} PNL={data.PNL} />
                  ))}
                </div>
                {/* gold price */}
                <div className='flex flex-row py-4 justify-center'>
                  <h2 className='text-[#FCD80A] text-xl font-semibold'>Gold = ${formatNumber(goldPrice)}</h2>
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
            }
            
          </div>
          <Footer />
        </MainPanelWrapper>
      </div>
    </div>
  )
}

export default Stake;