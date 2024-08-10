'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';

function TopBar() {
  return (
    <div className="flex w-full fixed justify-end p-2">
      <ConnectButton />
    </div>
  );
}

export default TopBar;
