

export const addNewChain = async (newChain: any): Promise<boolean> => {
  if (window.ethereum) {
    console.log("newChain => ", newChain)
    const formattedChain = {
      ...newChain,
      chainId: `0x${Number(newChain.chainId).toString(16)}`, // Convert to hex
    };

    console.log("Formatted Chain => ", formattedChain);

    try {
      const res = await window.ethereum.request({
        "method": 'wallet_addEthereumChain',
        "params": [formattedChain],
      });
      return true
    } catch (error) {
      console.error('Failed to add Cronos chain:', error);
      return false
    }
  } else {
    console.error('MetaMask is not installed');
    return false
  }
};

export const reqeuestPermissions = async () => {
  const res = await window.ethereum.request({
    method: "wallet_requestPermissions",
    params: [
      {
        "eth_accounts": {}
      }
    ]
  });
  if (res) return res;
  else return null
}