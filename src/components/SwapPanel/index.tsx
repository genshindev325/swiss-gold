// src/components/Header.tsx

'use client'

import React, { useState } from 'react';
import Image from "next/image";
import { FaArrowDown, FaChevronDown } from "react-icons/fa6";

import SwapButton from "./SwapButton";

const percentToPayStyle = 'rounded-[20px] md:rounded-[32px] border border-[#BCAE43B0] bg-[#F0DC9B26] text-center px-2 md:px-2 lg:px-5 xl:px-6 py-2 md:py-3 min-w-[48px]';


const tokenBalanceToPay = 2500;

const tokenBalanceToReceive = 350;
const minReceive = 3496.30;

const swapRatio = 20.56;


const SwapPanel: React.FC = () => {
  const [fromValue, setFromValue] = useState(0.00);
  const [toValue, setToValue] = useState(0.00);

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

  const handleSwap = async () => {
    // try {
    //   const provider = await getProvider();
    //   const signer = await provider.getSigner();
    //   const swchAddr = await getTokenContractAddress("SWCH");
    //   const swchTokenContract = getErc20TokenContract(swchAddr, signer);
    //   const collectorContract = getSwissGoldContract(signer);

    //   if(!fromValue || !swchPriceInUSD || !goldPriceInUSD){
    //     console.log("Undefined prices");
    //     return;
    //   }
    //   const goldAmountToReceive = Number(fromValue) * swchPriceInUSD / goldPriceInUSD;

    //   if(collectorContract != undefined){
    //     const swchDecimals = await swchTokenContract.decimals();
    //     const swchAmountToDeposit = ethers.parseUnits(fromValue, swchDecimals);

    //     const txApprove = await swchTokenContract.approve(await collectorContract.getAddress(), swchAmountToDeposit);
    //     await txApprove.wait();
    //     toast.success("Approved successfully");
    //     // console.log(txApprove);

    //     const txDeposit = await collectorContract.depositSWCH(swchAmountToDeposit);
    //     await txDeposit.wait();
    //     toast.success("Deposited successfully");

        
    //     // Store deposit info to the database...
    //     const response = await fetch(`/api/users/deposit`, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(
    //         {
    //           wallet: signer.address,
    //           amount: fromValue,
    //           amountGold: goldAmountToReceive,
    //         }),
    //     });
    
    //     if (response.status === 201) {
    //       toast.success("Deposit success.");
    //     } else {
          
    //     }
    //   }else{
    //     toast.error("Failed to connect SwissChessGold contract");
    //     console.log("Failed to connect SwissCheeseGold contract");
    //   }
    // } catch (error) {
    //   const decodedError: DecodedError = await errorDecoder.decode(error);
    //   console.log(`Revert reason: ${decodedError.reason}`)
    //   toast.error(decodedError.reason);
    // }
  }
  return (
    <div className='w-full lg:w-4/5 xl:w-1/2 lg:min-w-[600px] border-[2px] border-[#BCAE43B0] bg-[#F0DC9B26] backdrop-blur-sm bg-opacity-5 rounded-[20px] md:rounded-[32px] px-[15px] md:px-[25px] py-[11px] md:py-[33px] text-white mx-auto'>
      <div className='text-[20px] md:text-[36px] leading-[26px] md:leading-[44px] text-center font-[800] mb-[30px]'>
        Buy <span className='text-[#EECB1C]'>$SGOLD</span> Token
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
            <Image src={'/image/tokens/swch-small.png'} alt='nav-home' width={31} height={31} />
            <div className='text-sm md:text-md lg:text-lg font-semibold ml-2'>
              {'SWCH'}
            </div>
            <FaChevronDown className='ml-2 stroke-4' />
          </div>
        </div>
        <div className='flex flex-row justify-between text-[12px] md:text-[18px] leading-[9.6px] md:leading-[14.4px] font-[500]'>
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
            You pay
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
            <Image src={'/image/tokens/sgold-small.png'} alt='nav-home' width={31} height={31} />
            <div className='text-sm md:text-md lg:text-lg font-semibold ml-2'>
              {'SGOLD'}
            </div>
            <FaChevronDown className='ml-2' />
          </div>
        </div>
        <div className='flex text-[12px] md:text-[18px] leading-[12px] md:leading-[14px] font-[500]'>
          Min.receive: {minReceive}
        </div>
      </div>
      <div className='text-sm md:text-md lg:text-lg font-semibold text-[#FFD900] text-center py-[10px]'>
        {1} {'SWCH'} = {swapRatio} {'SGOLD'}
      </div>
      <div>
        {/* <div className='w-full bg-[#FCD80A] px-[20px] py-[12px] rounded-[58px] text-center text-[#000000] text-[18px] font-[600] cursor-pointer'>
          Connect Wallet
        </div> */}
        <SwapButton swapHandler={handleSwap} isReadyToSwap={fromValue > 0} />
      </div>
    </div>
  )
}

export default SwapPanel;