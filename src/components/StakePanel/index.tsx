// src/components/Header.tsx

'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowDown, FaCaretUp, FaCaretDown } from "react-icons/fa6";
import { formatNumber } from "@/utils/utils";
import { getTokenPriceInUsdWithChangePercentage } from "@/utils/tokens";

const percentToPayStyle = 'rounded-[20px] md:rounded-[32px] border border-[#BCAE43B0] bg-[#F0DC9B26] px-3 md:px-2 lg:px-5 xl:px-6 py-0 sm:py-1';

const tokenBalanceToPay = 2500;
const tokenBalanceToReceive = 350;
const minReceive = 3496.3;

const StakePanel: React.FC = () => {
  const [fromValue, setFromValue] = useState(0.00);
  const [toValue, setToValue] = useState(0.00);
  const [goldPrice, setGoldPrice] = useState(0.00);
  const [goldPriceChangePercent, setGoldPriceChangePercent] = useState(0.00);

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setFromValue(value);

    // Update the 'toValue' based on 'fromValue' and exchange rate
    // if (value) {
    //   console.log(exchangeRate);
    //   const convertedValue = parseFloat(value) * exchangeRate;
    //   setToValue(convertedValue.toFixed(6)); // Round to 4 decimal places for display
    // } else {
    //   setToValue('');
    // }
  };

  // Function to handle input change for the "to" currency
  const handleToValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setToValue(value);

    // Update the 'fromValue' based on 'toValue' and exchange rate
    // if (value) {
    //   const convertedValue = parseFloat(value) / exchangeRate;
    //   setFromValue(convertedValue.toFixed(6)); // Round to 4 decimal places for display
    // } else {
    //   setFromValue('');
    // }
  };
  useEffect(() => {
    const fetchPrice = async () =>{
      try {
        const tokenId = 'tether-gold';
        const {tokenPrice, tokenPriceChangePercent} = await getTokenPriceInUsdWithChangePercentage(tokenId);
        setGoldPrice(tokenPrice || 0);
        setGoldPriceChangePercent(tokenPriceChangePercent);
      } catch (error) {
        console.log("Failed to get gold price. Error: "+ error);
      }
    }
    fetchPrice();
  }, []);
  return (
    <div className='w-full lg:w-4/5 xl:w-1/2 lg:min-w-[600px] border-[2px] border-[#BCAE43B0] bg-[#F0DC9B26] backdrop-blur-sm bg-opacity-5 rounded-[20px] md:rounded-[32px] px-[15px] md:px-[25px] py-[11px] md:py-[33px] text-white mx-auto'>
      <div className='text-[20px] md:text-[36px] text-center font-[800] mb-[30px]'>
        Buy <span className='text-[#EECB1C]'>SGOLD</span> With Your Tokens
      </div>
      <div className='w-full rounded-[20px] md:rounded-[32px] bg-[#F0DC9B26] bg-opacity-10 p-[12px] md:p-[24px]'>
        <div className='flex text-xs sm:text-sm md:text-md lg:text-lg'>
          <div className='mr-auto'>
            You pay
          </div>
          <div>
            Balance: {tokenBalanceToPay}
          </div>
        </div>
        <div className='flex items-center py-[10px]'>
          <input
            type="number"
            value={fromValue}
            onChange={handleFromValueChange}
            className={`bg-transparent border-none text-left placeholder-gray-400 max-w-[150px] md:max-w-[200px] focus:outline-none text-[24px] md:text-[36px] leading-[20px] md:leading-[28px] font-[500] pr-2 mr-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            placeholder="0.0"
          />
          <div className='flex flex-row rounded-[20px] md:rounded-[32px] border border-[#BCAE43B0] bg-[#F0DC9B26] items-center px-2 sm:px-[20px] py-1 sm:py-[10px]'>
            <Image src={'/image/tokens/sgold-small.png'} alt='nav-home' width={31} height={30} />
            <div className='text-sm md:text-md lg:text-lg font-semibold ml-2'>
              SGOLD
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-between text-xs sm:text-sm md:text-md lg:text-lg font-semibold'>
          <div className={percentToPayStyle}>
            %10
          </div>
          <div className={percentToPayStyle}>
            %25
          </div>
          <div className={percentToPayStyle}>
            %50
          </div>
          <div className={percentToPayStyle}>
            %75
          </div>
          <div className={percentToPayStyle}>
            %100
          </div>
        </div>
      </div>
      <div className='flex justify-center my-[-10px]'>
        <div className='w-[50px] h-[50px] bg-[#FCD80A] rounded-[50px] p-[10px] cursor-pointer'>
          <FaArrowDown className='fill-[#3E3E3E] w-[30px] h-[30px]'/>
        </div>
      </div>
      <div className='w-full rounded-[20px] md:rounded-[32px] bg-[#F0DC9B26] bg-opacity-10 p-[12px] md:p-[24px]'>
        <div className='flex text-xs sm:text-sm md:text-md lg:text-lg'>
          <div className='mr-auto'>
            You receive
          </div>
          <div>
            Balance: {tokenBalanceToReceive}
          </div>
        </div>
        <div className='flex items-center py-[10px]'>
          <input
              type="number"
              value={toValue}
              onChange={handleToValueChange}
              className={`bg-transparent border-none text-left placeholder-gray-400 max-w-[150px] md:max-w-[200px] focus:outline-none text-[24px] md:text-[36px] leading-[20px] md:leading-[28px] font-[500] pr-2 mr-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              placeholder="0.0"
            />
          <div className='flex flex-row rounded-[20px] md:rounded-[32px] border-[1px] border-[#BCAE43B0] bg-[#F0DC9B26] items-center px-2 sm:px-[20px] py-1 sm:py-[10px]'>
            <div className='text-sm md:text-md lg:text-lg font-semibold ml-2'>
              Tokenized Gold
            </div>
          </div>
        </div>
        <div className='flex text-[12px] md:text-[18px] leading-[12px] md:leading-[14px] font-[500]'>
          Min.receive: {minReceive}
        </div>
      </div>
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
      <div>
        <div className='w-full bg-[#FCD80A] px-[20px] py-[12px] rounded-[58px] text-center text-[#000000] text-[18px] font-[600] cursor-pointer'>
          Connect Wallet
        </div>
      </div>
    </div>
  )
}

export default StakePanel;