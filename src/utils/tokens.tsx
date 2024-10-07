import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

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