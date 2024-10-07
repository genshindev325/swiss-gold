// components/WalletConnectButton.tsx
// import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
// import getProvider from '@/lib/ethers';
import { abbrAddress } from '@/utils/utils';

const SwapButton = () => {
    const { connectWallet, disconnectWallet, address } = useWallet();
    return (
        <>
            {!address && <button
                onClick={connectWallet}
                // disabled={loading}
                className='w-full bg-[#FCD80A] px-[20px] py-[12px] rounded-[58px] text-center text-[#000000] text-[18px] font-[600] cursor-pointer'
            >
                {/* {loading ? 'Connecting...' : 'Connect Wallet'} */}
                Connect Wallet
            </button>
            }
            {address && <button
                onClick={disconnectWallet}
                // disabled={loading}
                className='w-full bg-[#FCD80A] px-[20px] py-[12px] rounded-[58px] text-center text-[#000000] text-[18px] font-[600] cursor-pointer'
            >
                {abbrAddress(address)}
            </button>
            }
        </>
    );
};

export default SwapButton;
