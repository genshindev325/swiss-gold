// src/app/pages/home/page.tsx

'use client'

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const text1 = 'SwissGold is the most modern way of gold investing. You can use your $SWCH yokens and receive $SGOLD tokens. Our advanced trading bots trade with your assets and make profit for you.';
const text2 = 'Gold can be a hedge against inflation because its price tends to rise when the cost of living increases. Investors can periodically see gold prices soar and the stock market plunge during high-inflation years.';

const Home: React.FC = () => {
  return (
    <div>
      <div className="w-full min-h-screen flex flex-row md:space-x-8 bg-[#0e0e0e] bg-cover bg-no-repeat bg-[url('/image/bg.png')] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 3xl:px-36 py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 3xl:py-32">
        {/* Navbar */}
        <div className='hidden md:block'>
          <Navbar />
        </div>
        {/* Container */}
        <div className='w-full min-h-screen border border-[#EAAD2A] rounded-3xl bg-[#161616] flex flex-col items-start justify-start pt-4 sm:pt-5 md:pt-6 lg:pt-8 xl:pt-10 2xl:pt-12 3xl:pt-14'>
          <Header />
          {/* container */}
          <div className='flex flex-col w-full p-4 sm:p-5 md:p-6 items-center justify-center'>
            {/* big logo image */}
            <div className='flex flex-row'>
              <div className='flex flex-col'>
                <div className='block lg:hidden'>
                  <Image src={'/image/ad-main.png'} alt='ad-main' width={747} height={368} />
                </div>
                <Image src={'/image/logo.png'} alt='logo' width={614} height={565} />
                <div className='block lg:hidden'>
                  <Image src={'/image/button-1.png'} alt='ad-main' width={533} height={224} />
                </div>
              </div>
              <div className='hidden lg:block'>
                <div className='flex flex-col'>
                  <Image src={'/image/ad-main.png'} alt='ad-main' width={747} height={368} />
                  <Image src={'/image/button-1.png'} alt='ad-main' width={533} height={224} />
                </div>
              </div>
            </div>
            {/* swap image */}
            <div className='flex flex-col lg:flex-row py-4'>
              <div className='flex flex-col'>
                <Image src={'/image/ad-1.png'} alt='ad-1' width={480} height={200} />
                <h2 className='text-yellow-100 text-sm max-w-[500px] pl-20 pr-2'>{text1}</h2>
              </div>
              <div className='flex flex-col'>
                <Image src={'/image/image-1.png'} alt='image-1' width={538} height={487} />
              </div>
            </div>
            {/* division */}
            <div className='py-4'>
              <Image src={'/image/div.png'} alt='div' width={959} height={39} />
            </div>
            {/* graph image */}
            <div className='flex flex-col-reverse lg:flex-row py-4'>
              <div className='flex flex-col'>
                <Image src={'/image/image-2.png'} alt='image-2' width={579} height={504} />
              </div>
              <div className='flex flex-col'>
                <Image src={'/image/ad-2.png'} alt='ad-2' width={497} height={200} />
                <h2 className='text-yellow-100 text-sm max-w-[500px] pl-20 pr-2'>{text2}</h2>
              </div>
            </div>
            {/* How it works? */}
            <div className='flex flex-col py-4'>
              <div className='flex flex-col items-center'>
                <Image src={'/image/work-text.png'} alt='work-text' width={311} height={66} />
              </div>
              <div className='flex flex-col lg:flex-row items-center'>
                <div>
                  <Image src={'/image/work-1.png'} alt='work-1' width={224} height={311} />
                </div>
                <div>
                  <Image src={'/image/work-2.png'} alt='work-2' width={252} height={315} />
                </div>
                <div>
                  <Image src={'/image/work-3.png'} alt='work-3' width={238} height={315} />
                </div>
              </div>
            </div>
            {/* division */}
            <div className='py-4'>
              <Image src={'/image/div.png'} alt='div' width={959} height={39} />
            </div>
            {/* SwissGold */}
            <div className='flex flex-col py-4'>
              <div className='flex flex-col items-center'>
                <div className='hidden lg:block'>
                  <Image src={'/image/swiss-text.png'} alt='swiss-text' width={803} height={66} />
                </div>
                <div className='block lg:hidden'>
                  <Image src={'/image/swiss-text-1.png'} alt='swiss-text-1' width={372} height={105} />
                </div>
                <h2 className='text-yellow-100 text-sm max-w-[800px] p-10'>{text1}</h2>
              </div>
              <div className='flex flex-col items-center'>
                <div>
                  <Image src={'/image/logo-2.png'} alt='logo-2' width={359} height={186} />
                </div>
              </div>
              {/* Gold Bars */}
              <div className='flex flex-col items-center'>
                <div className='hidden lg:block'>
                  <div>
                    <Image src={'/image/gold-text.png'} alt='gold-text' width={711} height={66} />
                  </div>
                  <div className='flex flex-row justify-center'>
                    <Image src={'/image/gold-sm-text.png'} alt='gold-sm-text' width={471} height={59} />
                  </div>
                </div>
                <div className='block lg:hidden'>
                  <div>
                    <Image src={'/image/gold-text-1.png'} alt='gold-text-1' width={333} height={102} />
                  </div>
                  <div className='flex flex-row justify-center'>
                    <Image src={'/image/gold-sm-text-1.png'} alt='gold-sm-text-1' width={254} height={92} />
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div>
                  <Image src={'/image/button-2.png'} alt='button-2' width={641} height={270} />
                </div>
              </div>
            </div>
            {/* division */}
            <div className='py-4'>
              <Image src={'/image/div.png'} alt='div' width={959} height={39} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home;