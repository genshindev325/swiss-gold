// components/WalletConnectButton.tsx

import { useWallet } from '@/context/WalletContext';
import { abbrAddress } from '@/utils/utils';

const ConnectWalletButton = () => {
    const { connectWallet, disconnectWallet, address } = useWallet();
    const style = "h-full py-2 px-2 sm:px-10 text-gray-700 font-bold text-xs sm:text-sm md:text-md lg:text-lg rounded-full bg-gradient-to-r from-[#FCD80A] to-[#FFBB01] min-w-[103px]";
    return (
        <>
            {!address && <button
                onClick={connectWallet}
                // disabled={loading}
                className={style}
            >
                {/* {loading ? 'Connecting...' : 'Connect Wallet'} */}
                Connect Wallet
            </button>
            }
            {address && <button
                onClick={disconnectWallet}
                // disabled={loading}
                className={style}
            >
                {abbrAddress(address)}
            </button>
            }
        </>
    );
};

export default ConnectWalletButton;
