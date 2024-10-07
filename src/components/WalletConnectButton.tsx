// components/WalletConnectButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';
import { abbrAddress } from '@/utils/utils';

const ConnectWalletButton = () => {
    const { connectWallet, disconnectWallet, account } = useWallet();

    // Create state for window width
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

    // Update window width on resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine the button text based on the window width
    const buttonText = windowWidth < 640 ? 'Connect' : 'Connect Wallet';

    const style = "h-full px-2 sm:px-10 py-1 sm:py-2  text-gray-700 font-bold text-xs sm:text-sm md:text-md lg:text-lg rounded-full bg-gradient-to-r from-[#FCD80A] to-[#FFBB01] min-w-[103px]";
    return (
        <>
            {!account && <button
                onClick={connectWallet}
                // disabled={loading}
                className={style}
            >
                {/* {loading ? 'Connecting...' : 'Connect Wallet'} */}
                { buttonText }
            </button>
            }
            {account && <button
                onClick={disconnectWallet}
                // disabled={loading}
                className={style}
            >
                {abbrAddress(account)}
            </button>
            }
        </>
    );
};

export default ConnectWalletButton;
