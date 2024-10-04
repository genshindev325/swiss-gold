// src/components/Header.tsx

'use client'

import React from 'react';
import Image from 'next/image';

// links
const handleHome = () => {
}

const handleInvest = () => {
}

const handleTerms = () => {
}

const handleBlog = () => {
}

const handleSwap = () => {
}

const handleStaking = () => {
}

const handlePrivacy = () => {
}

// social buttons
const handleTwitter = () => {
}

const handleTelegram = () => {
}

const handleInstagram = () => {
}

const handleYoutube = () => {
}

const handleDiscord = () => {
}

const handleCoin = () => {
}

const handleCoingecko = () => {
}

const handleGithub = () => {
}

const description = 'SwissGold is the most modern way of gold investing. You can use your $SWCH yokens and receive $SGOLD tokens. Our advanced trading bots trade with your assets and make profit for you. SwissGold is the most modern way of gold investing.'

const Footer: React.FC = () => {
  return (
    <div className='w-full flex flex-col xl:flex-row mt-auto border-x-0 border-b-0 border-t-2 sm:border border-[#EAAD2A] rounded-t-3xl rounded-b-none sm:rounded-3xl px-2 sm:px-3 md:px-4 lg:px-5 2xl:px-7 3xl:px-8 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14'>
      <div className='justify-center md:flex-1 2xl:mr-20 flex'>
        <div className='flex flex-col items-center xl:flex-row'>
          <Image src={'/image/logo-small.png'} alt='logo-small' width={246} height={227} />
          <div className='block xl:hidden'>
            <Image src={'/image/div.png'} alt='div' width={959} height={39} />
          </div>
          {/* description */}
          <div className='hidden 2xl:block'>
            <div className='flex flex-col py-4'>
              <div className='ml-8'>
                <h2 className='text-[#FFD900] text-xl font-semibold'>SwissGold</h2>
                <h2 className='text-yellow-100 text-sm max-w-[300px]'>{description}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex flex-col items-center md:flex-row'>
          {/* link */}
          <div className='flex mx-auto space-x-4 sm:space-x-20 md:space-x-4 lg:space-x-16 xl:space-x-4 xl:mx-2 2xl:justify-around'>
            <div className='flex flex-col 2xl:mr-4'>
              <button className='flex flex-row text-start my-4' onClick={handleHome}>
                <h2 className={`hover:text-[#FCD80A] text-yellow-100 text-sm duration-300`}>Home</h2>
              </button>
              <button className='flex flex-row text-start my-4' onClick={handleInvest}>
                <h2 className={`hover:text-[#FCD80A] text-yellow-100 text-sm duration-300`}>Invest</h2>
              </button>
              <button className='flex flex-row text-start my-4' onClick={handleTerms}>
                <h2 className={`hover:text-[#FCD80A] text-yellow-100 text-sm duration-300`}>Terms & Conditions</h2>
              </button>
              <button className='flex flex-row text-start my-4' onClick={handleBlog}>
                <h2 className={`hover:text-[#FCD80A] text-yellow-100 text-sm duration-300`}>Blog</h2>
              </button>
            </div>
            <div className='flex flex-col'>
              <button className='flex flex-row text-start my-4' onClick={handleSwap}>
                <h2 className={`hover:text-[#FCD80A] text-yellow-100 text-sm duration-300`}>Swap Gold</h2>
              </button>
              <button className='flex flex-row text-start my-4' onClick={handleStaking}>
                <h2 className={`hover:text-[#FCD80A] text-yellow-100 text-sm duration-300`}>Staking</h2>
              </button>
              <button className='flex flex-row text-start my-4' onClick={handlePrivacy}>
                <h2 className={`hover:text-[#FCD80A] text-yellow-100 text-sm duration-300`}>Privacy Policy</h2>
              </button>
            </div>
          </div>
          {/* division */}
          <div className='block md:hidden'>
            <Image src={'/image/div.png'} alt='div' width={959} height={39} />
          </div>
          {/* social */}
          <div className='m-auto'>
            <div className='flex flex-col space-y-8 mx-1 sm:mx-2 md:mx-3 lg:mx-0'>
              <div className='flex space-x-8 sm:space-x-16 md:space-x-8 2xl:justify-around'>
                <button type='button' onClick={handleTwitter}>
                  <Image src={'/image/social-twitter.png'} alt='social-twitter' width={29} height={29} />
                </button>
                <button type='button' onClick={handleTelegram}>
                  <Image src={'/image/social-telegram.png'} alt='social-telegram' width={29} height={29} />
                </button>
                <button type='button' onClick={handleInstagram}>
                  <Image src={'/image/social-instagram.png'} alt='social-instagram' width={30} height={29} />
                </button>
                <button type='button' onClick={handleYoutube}>
                  <Image src={'/image/social-youtube.png'} alt='social-youtube' width={30} height={29} />
                </button>
              </div>
              <div className='flex space-x-8 sm:space-x-16 md:space-x-8 2xl:justify-around'>
                <button type='button' onClick={handleDiscord}>
                  <Image src={'/image/social-discord.png'} alt='social-discord' width={29} height={30} />
                </button>
                <button type='button' onClick={handleCoin}>
                  <Image src={'/image/social-coin.png'} alt='social-coin' width={29} height={30} />
                </button>
                <button type='button' onClick={handleCoingecko}>
                  <Image src={'/image/social-coingecko.png'} alt='social-coingecko' width={29} height={29} />
                </button>
                <button type='button' onClick={handleGithub}>
                  <Image src={'/image/social-github.png'} alt='social-github' width={30} height={29} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;