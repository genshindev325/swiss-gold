// src/app/pages/home/page.tsx

'use client'

import React from 'react';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <div className="w-full min-h-screen flex flex-row space-x-8 bg-[#0e0e0e] bg-cover bg-no-repeat bg-[url('/image/bg.png')] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 3xl:px-36 py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28 3xl:py-32">
        {/* Navbar */}
        <div className='hidden md:block'>
          <Navbar />
        </div>
        {/* Container */}
        <div className='w-full min-h-screen border border-[#EAAD2A] rounded-3xl bg-[#161616] flex flex-col items-start justify-start pt-4 sm:pt-5 md:pt-6 lg:pt-8 xl:pt-10 2xl:pt-12 3xl:pt-14'>
          <Header />

          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home;