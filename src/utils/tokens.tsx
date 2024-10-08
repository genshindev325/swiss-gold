import axios from 'axios';
import { ethers } from "ethers";

import ERC20ABI from '@/config/ERC20-ABI.json';
import SWISSGOLDABI from '@/config/SWISSGOLD-ABI.json';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
// const SWISSGOLD_CONTRACT = process.env.SWISSGOLD_CONTRACT

export const getTokenPriceInUSD = async (tokenId: string): Promise<number | null> => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/simple/price?ids=${tokenId}&vs_currencies=usd`);
    return response.data[tokenId]?.usd ?? null; // Return price or null if not found
  } catch (error) {
    console.error('Error fetching token price in USD:', error);
    throw error;
  }
};

export const getGoldPriceInUSD = async(): Promise<number | null> => {
  try {
    const response = await axios.get("/api/tokens/price/gold");
    return response.data.data.price ?? null; // Return price or null if not found
  } catch (error) {
    console.error('Error fetching gold price in USD:', error);
    throw error;
  }
}

interface ITokenPriceChangeInfo {
  tokenPrice: number;
  tokenPriceChangePercent: number;
}

export const getTokenPriceInUsdWithChangePercentage = async (tokenId: string): Promise<ITokenPriceChangeInfo> => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/simple/price?ids=${tokenId}&vs_currencies=usd`);
    const tokenPrice = response.data[tokenId]?.usd ?? null; // Return price or null if not found

    // Fetch market data for the last 24 hours
    const marketDataResponse = await fetch(
      `${COINGECKO_API_URL}/coins/${tokenId}/market_chart?vs_currency=usd&days=1`
    );
    const marketData = await marketDataResponse.json();
    const tokenPrices = marketData.prices;
    const tokenPrice24hAgo = tokenPrices[0][1];

    // Calculate percentage change
    const tokenPriceChangePercent = ((tokenPrice - tokenPrice24hAgo) / tokenPrice24hAgo) * 100;
    return {
      tokenPrice,
      tokenPriceChangePercent,
    };

  } catch (error) {
    console.error('Error fetching token price in USD:', error);
    throw error;
  }
};

export const getErc20TokenContract = (address: string, signer: ethers.Signer) => {
  return new ethers.Contract(address, ERC20ABI, signer);
};

export const getSwissGoldContract = (address: string, signer: ethers.Signer) => {
  return new ethers.Contract(address, SWISSGOLDABI, signer);
}

export const getTokenContractAddress = async (collector: ethers.Contract, token_symbol:string) => {
  if(collector){
      if(token_symbol == "SWCH"){
          return await collector.SWCH();
      }
      if(token_symbol == "USDT"){
          return await collector.USDT();
      }
  }

  return undefined;
}

export const getERC20Balance = async (tokenAddress: string, walletAddress: string, provider: ethers.Provider) => {
  // Create a new contract instance with the token address and the ABI
  const contract = new ethers.Contract(tokenAddress, ERC20ABI, provider);

  try {
    // Call balanceOf to get the token balance
    const balance = await contract.balanceOf(walletAddress);

    // Since ERC-20 tokens often have decimals, you'll want to format the balance
    const decimals = await contract.decimals(); // Some tokens might require this if you don't know the decimals
    const formattedBalance = ethers.formatUnits(balance, decimals);

    //console.log(`Balance of wallet ${walletAddress}: ${formattedBalance} tokens`);
    return formattedBalance;
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}

export const extractErrorMessage = (error: any): string => { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (error.reason) {
    return error.reason; // Smart contract error (revert message)
  } else if (error.data?.message) {
    return error.data.message; // Detailed error message (nested in data)
  } else if (error.message) {
    return error.message; // General error message
  } else {
    return "Transaction failed with unknown error.";
  }
};