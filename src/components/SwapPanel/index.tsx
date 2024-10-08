// src/components/Header.tsx

'use client'

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Image from "next/image";
import { FaArrowDown, FaChevronDown } from "react-icons/fa6";
import { toast } from 'react-toastify';

import { useWallet } from '@/context/WalletContext';
import { getErc20TokenContract, getERC20Balance, getSwissGoldContract, getTokenPriceInUSD, extractErrorMessage } from '@/utils/tokens';
import TOKENS from '@/config/tokens.json';

import SwapButton from "./SwapButton";

/* To review */
import { SWISS_GOLD_CONTRACT_ADDRESS } from "@/config";

const percentToPayStyle = 'rounded-[20px] md:rounded-[32px] border border-[#BCAE43B0] bg-[#F0DC9B26] text-center px-2 md:px-2 lg:px-5 xl:px-6 py-2 md:py-3 min-w-[48px]';

// import { ErrorDecoder } from 'ethers-decode-error';
// import type { DecodedError } from 'ethers-decode-error';
// const errorDecoder = ErrorDecoder.create();

const SwapPanel: React.FC = () => {
  const [tokenFrom] = useState(TOKENS['swch']);
  const [tokenTo] = useState(TOKENS['sgold']);
  const [tokenValueFrom, setTokenValueFrom] = useState(0.00);
  const [tokenValueTo, setTokenValueTo] = useState(0.00);
  const [tokenPriceFrom, setTokenPriceFrom] = useState<number | null>(null);
  const [tokenPriceTo, setTokenPriceTo] = useState<number | null>(null);
  const [tokenBalanceFrom, setTokenBalanceFrom] = useState('---');
  const [tokenBalanceTo, setTokenBalanceTo] = useState('---');
  const [tokenMinValueTo] = useState('---');
  const [swapRatio, setSwapRatio] = useState(0);
  const [readyToSwap, setReadyToSwap] = useState(false);

  const {provider, signer, account} = useWallet();

  // const [isSwapping, setSwapping] = useState<boolean>(false);

  useEffect(() => {
    const fetchBalance = async function(){
      // Get token balance
      if(account && tokenFrom && provider){
        const balance = await getERC20Balance(tokenFrom.address, account, provider);
        setTokenBalanceFrom(balance?balance.toString() : '---');
        if(tokenValueFrom > 0 && tokenValueFrom <= Number(balance))
        {
          setReadyToSwap(true);
        }else{
          setReadyToSwap(false);
        }
      }else{
        setTokenBalanceFrom('---');
      }
    }
    fetchBalance();

    
  }, [account, tokenFrom, provider, tokenValueFrom]);

  useEffect(() => {
    const fetchPrice = async () => {
      if(tokenFrom){
        try {
          const tokenPriceInUSD = await getTokenPriceInUSD(tokenFrom.tokenId);
          setTokenPriceFrom(tokenPriceInUSD);
          if(tokenPriceTo && tokenPriceInUSD){
            setSwapRatio(tokenPriceInUSD / tokenPriceTo);
          }
        } catch (error) {
          toast.error(`Failed to get ${tokenFrom.symbol} token price: ` + error);
        }
      }
    }

    fetchPrice();
    
  }, [tokenFrom, tokenPriceTo]);

  useEffect(() => {
    const fetchBalance = async function(){
      // Get token balance
      if(account && tokenTo && provider){
        const balance = await getERC20Balance(tokenTo.address, account, provider);
        setTokenBalanceTo(balance?balance.toString() : '---');
      }else{
        setTokenBalanceTo('---');
      }
    }
    fetchBalance();
  }, [account, tokenTo, provider]);

  useEffect(() => {
    const fetchPrice = async () => {
      if(tokenTo){
        try {
          const tokenPriceInUSD = await getTokenPriceInUSD(tokenTo.tokenId);
          setTokenPriceTo(tokenPriceInUSD);
          if(tokenPriceFrom && tokenPriceInUSD){
            setSwapRatio(tokenPriceFrom / tokenPriceInUSD);
          }
        } catch (error) {
          toast.error(`Failed to get ${tokenTo.symbol} token price: ` + error);
        }
      }
    }

    fetchPrice();
  }, [tokenTo, tokenPriceFrom]);

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if(value > 0 && value <= Number(tokenBalanceFrom))
    {
      setReadyToSwap(true);
    }else{
      setReadyToSwap(false);
    }
    
    setTokenValueFrom(value);

    // Update the 'tokenValueTo' based on 'tokenValueFrom' and exchange rate
    if (value) {
      setTokenValueTo(value * swapRatio);
    }
  };

  // Function to handle input change for the "to" currency
  const handleToValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTokenValueTo(value);

    // Update the 'tokenValueFrom' based on 'tokenValueTo' and exchange rate
    if (value) {
      setTokenValueFrom(value / swapRatio); // Round to 4 decimal places for display
    }
  };

  const handleSwap = async () => {
    try {
      if(signer){
        const signerAddr = await signer.getAddress();
        const collectorContract = getSwissGoldContract(SWISS_GOLD_CONTRACT_ADDRESS, signer);
        // const tokenFromAddr = await getTokenContractAddress(collectorContract, "SWCH");
        // const tokenFromContract = getErc20TokenContract(tokenFromAddr, signer);
        const tokenFromContract = getErc20TokenContract(tokenFrom.address, signer);

        if(!tokenValueFrom || !tokenPriceFrom || !tokenPriceTo){
          console.log("Undefined prices");
          return;
        }

        const goldAmountToReceive = tokenValueFrom * tokenPriceFrom / tokenPriceTo;

        if(collectorContract != undefined){
          const tokenFromDecimals = await tokenFromContract.decimals();
          const tokenFromAmountToDeposit = ethers.parseUnits(tokenValueFrom.toString(), tokenFromDecimals);

          const txApprove = await tokenFromContract.approve(await collectorContract.getAddress(), tokenFromAmountToDeposit);
          let receipt = await txApprove.wait();
          if(receipt.status === 1){
            const explorerLink = `https://polygonscan.com/tx/${receipt.hash}`;
            toast.success(
              <a
                href={explorerLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}
              >
                <div>
                  <p>Approved successfully! 🎉</p>
                  <p>Click here to view on Polygonscan</p>
                </div>
              </a>,
              
              {
                autoClose: false,
              }
            );
          }else{
            toast.error('Failed to approve');
            return;
          }
          
          const txDeposit = await collectorContract.depositSWCH(tokenFromAmountToDeposit);
          receipt = await txDeposit.wait();
          if(receipt.status === 1){
            const explorerLink = `https://polygonscan.com/tx/${receipt.hash}`;
            toast.success(
              <a
                href={explorerLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}
              >
                <div>
                  <p>Deposited successfully! 🎉</p>
                  <p>Click here to view on Polygonscan</p>
                </div>
              </a>, 
              {
                autoClose: false,
              }
            );
          }else{
            toast.error("Failed to deposit");
            return;
          }

          // Store deposit info to the database...
          const response = await fetch(`/api/users/deposit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                wallet: signerAddr,
                amount: tokenValueFrom,
                amountGold: goldAmountToReceive,
                txHash: receipt.hash,
              }),
          });
      
          if (response.status === 201) {
            toast.success("Saved successfully! 🎉");
          } else {
            toast.error("Failed to save transaction history.");
          }
        }else{
          toast.error("Failed to connect SwissCheeseGold contract.");
        }
      }
    } catch (error) {
      // const decodedError: DecodedError = await errorDecoder.decode(error);
      // toast.error(decodedError.reason);
      // console.log(`Revert reason: ${decodedError.reason}`)
      // console.log(error);

      // Handle errors and display the error message in the toast
      const errorMessage = extractErrorMessage(error);
      toast.error(`Transaction failed: ${errorMessage}`, {
        autoClose: false,
        closeOnClick: true,
      });
    }
  }

  useEffect(() => {

  });
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
            Balance: {tokenBalanceFrom}
          </div>
        </div>
        <div className='flex items-center py-[10px]'>
          <input
              type="number"
              value={tokenValueFrom}
              onChange={handleFromValueChange}
              className={`bg-transparent border-none text-left placeholder-gray-400 max-w-[150px] md:max-w-[200px] focus:outline-none text-[24px] md:text-[36px] leading-[20px] md:leading-[28px] font-[500] pr-2 mr-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              placeholder="0.00"
            />
          <div className='flex flex-row rounded-[20px] md:rounded-[32px] border border-[#BCAE43B0] bg-[#F0DC9B26] items-center px-2 sm:px-[20px] py-1 sm:py-[10px] cursor-pointer'>
            <Image src={tokenFrom.image} alt='nav-home' width={31} height={31} />
            <div className='text-sm md:text-md lg:text-lg font-semibold ml-2'>
              {tokenFrom.symbol}
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
            You receive
          </div>
          <div>
            Balance: {tokenBalanceTo}
          </div>
        </div>
        <div className='flex items-center py-[10px]'>
          <input
              type="number"
              value={tokenValueTo}
              onChange={handleToValueChange}
              className={`bg-transparent border-none text-left placeholder-gray-400 max-w-[150px] md:max-w-[200px] focus:outline-none text-[24px] md:text-[36px] leading-[20px] md:leading-[28px] font-[500] pr-2 mr-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              placeholder="0.0"
            />
          <div className='flex flex-row rounded-[20px] md:rounded-[32px] border-[1px] border-[#BCAE43B0] bg-[#F0DC9B26] items-center px-2 sm:px-[20px] py-1 sm:py-[10px] cursor-pointer'>
            <Image src={tokenTo.image} alt='nav-home' width={31} height={31} />
            <div className='text-sm md:text-md lg:text-lg font-semibold ml-2'>
              {tokenTo.symbol}
            </div>
            <FaChevronDown className='ml-2' />
          </div>
        </div>
        <div className='flex text-[12px] md:text-[18px] leading-[12px] md:leading-[14px] font-[500]'>
          Min.receive: {tokenMinValueTo}
        </div>
      </div>
      <div className='text-sm md:text-md lg:text-lg font-semibold text-[#FFD900] text-center py-[10px]'>
        {1} {'SWCH'} = {swapRatio} {'SGOLD'}
      </div>
      <div>
        {/* <div className='w-full bg-[#FCD80A] px-[20px] py-[12px] rounded-[58px] text-center text-[#000000] text-[18px] font-[600] cursor-pointer'>
          Connect Wallet
        </div> */}
        <SwapButton swapHandler={handleSwap} readyToSwap={readyToSwap} />
      </div>
    </div>
  )
}

export default SwapPanel;