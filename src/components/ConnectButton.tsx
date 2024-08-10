'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSwitchChain, useChainId, } from 'wagmi';
import { base, cronos, cronosTestnet, mainnet } from 'viem/chains';
import { addNewChain } from '@/config/actions';
import { cronosConfig } from '@/config';

export default function ConnectWalletButton() {
  const { chains, switchChain, error } = useSwitchChain();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        const chainId = useChainId();
        const switchChainHandle = async () => {
          if (!isExistChain(cronos.id)) {
            console.log("Adding start")
            const res:boolean = await addNewChain(cronosConfig);
            // if(res) switchChain({chainId:base.id})
          }
        }

        const isExistChain = (chainId: number) => {
          const isExist = chains.find((item: any) => item.id == chainId);
          if (isExist) return true
          else return false
        }

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button"
                    className='w-full py-3 bg-green-600 text-xl text-black font-bold uppercase tracking-widest shadow-2s'>
                    Connect Wallet
                  </button>
                );
              }

              if (chainId != cronos.id && chainId != cronosTestnet.id) {
                return (
                  <button onClick={switchChainHandle} type="button"
                    className='w-full py-3 bg-green-600 text-xl text-black font-bold uppercase tracking-widest shadow-2s'>
                    Switch Chain
                  </button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button"
                    className='w-full py-3 bg-green-600 text-xl text-black font-bold uppercase tracking-widest shadow-2s'>
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={() => { console.log("confirm!") }}
                    type="button"
                    className='w-full py-3 bg-green-600 text-xl text-black font-bold uppercase tracking-widest shadow-2s'
                  >
                    Confirm
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  )
}