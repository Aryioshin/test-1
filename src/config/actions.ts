export const addNewChain = async (newChain: any): Promise<boolean> => {
  if (window.ethereum) {
    console.log(window.ethereum)
    try {
      const res = await window.ethereum.request({
        "method": 'wallet_addEthereumChain',
        "params": [newChain],
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