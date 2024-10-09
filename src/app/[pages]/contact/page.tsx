// src/app/pages/stake/page.tsx

'use client'

import Image from 'next/image';

import MainPanelWrapper from '@/components/MainPanelWrapper'
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact: React.FC = () => {

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
                  Contact Us
                </div>
                <div className='text-[#E4F4FF] text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-semibold'>
                  
                </div>
              </div>
            </div>
            <div className='flex flex-row justify-center px-2 space-x-4 md:space-x-6 pb-4 text-[#E4F4FF] text-[40px] lg:text-[80px] font-semibold h-[400px]'>
              Coming Soon
            </div>

          </div>
          <Footer />
        </MainPanelWrapper>
      </div>
    </div>
  )
}

export default Contact;