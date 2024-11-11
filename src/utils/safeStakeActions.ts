import { readContract, writeContract } from '@wagmi/core';
import { Address } from 'viem';
import { Abis, CONTRACT_ABI_HARD } from '@/utils';
import { CONTRACT_ADDRESS, TOKEN_LIST, WCRO, VVS2Router, fee, CONTRACT_ADDRESS_HARD, } from '../config/safeStakeConfig';
import { CONTRACT_ABI_ARY, VVS2_ABI, ABI } from '@/utils';
import { getBalance } from 'wagmi/actions';
import { toast } from 'react-toastify';
import { Config, useAccount } from "wagmi"
import { waitForTransactionReceipt } from 'wagmi/actions';
import { parseEther } from 'viem'
import { config } from '@/config/config';
const { ethers } = require("ethers");

export const getUserInfo = async (config: Config, owner: Address) => {
    const res = await readContract(config, {
      abi : CONTRACT_ABI_ARY,
      address: CONTRACT_ADDRESS as Address,
      functionName: "userInfo",
      args: [owner],
    });
    
    return res;
  }

  export const getUserInfoHard = async (config: Config, owner: Address) => {
    const res = await readContract(config, {
      abi : CONTRACT_ABI_HARD,
      address: CONTRACT_ADDRESS_HARD as Address,
      functionName: "stakers",
      args: [owner],
    });
    
    return res;
  }

  export const getTotalStaked = async () => {
    try {
      console.log(config, "AAAAAAAAAAAAAAAA");
      const totalStaked = await readContract(config, {
        abi : CONTRACT_ABI_ARY,
        address: CONTRACT_ADDRESS as Address,
        functionName: "totalStaked",
      });
      console.log(totalStaked, "SADAAAAAAAAAAAAAA")
      return totalStaked;
    } catch (error) {
      console.log("EEEEEEEEEEEEE", error);
    }
    
  }

  export const getHardTotalStaked = async () => {
    try {
      console.log(config, "AAAAAAAAAAAAAAAA");
      const totalStaked = await readContract(config, {
        abi : CONTRACT_ABI_HARD,
        address: CONTRACT_ADDRESS_HARD as Address,
        functionName: "getTotalStaked",
      });
      console.log(totalStaked, "SADAAAAAAAAAAAAAA")
      return totalStaked;
    } catch (error) {
      console.log("EEEEEEEEEEEEE", error);
    }
    
  }

  export const getSoftAPR = async () => {
    try {
      console.log(config, "af");
      const softPercent = await readContract(config, {
        abi : CONTRACT_ABI_ARY,
        address: CONTRACT_ADDRESS as Address,
        functionName: "apr",
      });
      console.log(softPercent, "SADAAAAAAAAAAAAAA")
      return softPercent;
    } catch (error) {
      console.log("EEEEEEEEEEEEE", error);
    }
  }

  export const getHardRate = async () => {
    try {
      console.log(config, "af");
      const softPercent = await readContract(config, {
        abi : CONTRACT_ABI_HARD,
        address: CONTRACT_ADDRESS_HARD as Address,
        functionName: "FEE_PERCENTAGE",
      });
      console.log(softPercent, "SADAAAAAAAAAAAAAA")
      return softPercent;
    } catch (error) {
      console.log("EEEEEEEEEEEEE", error);
    }
  }

  export const getUserVolumeHard = async (config: Config, owner: Address) => {
    const res = await readContract(config, {
      abi : CONTRACT_ABI_HARD,
      address: CONTRACT_ADDRESS_HARD as Address,
      functionName: "getUserVolume",
      args: [owner],
    });
    return convertBignitTofloat(res, 18) / 100;
  }

  export const convertBignitTofloat = (value: any, decimal: number) => {
    return parseFloat((Number(value) / Math.pow(10, decimal)).toFixed(3))
  }

  export const getHardUnlock = async () => {
    try {
      console.log(config, "af");
      const softPercent = await readContract(config, {
        abi : CONTRACT_ABI_HARD,
        address: CONTRACT_ADDRESS_HARD as Address,
        functionName: "WITHDRAWAL_LOCK_PERIOD",
      });
      console.log(softPercent, "SADAAAAAAAAAAAAAA")
      return softPercent;
    } catch (error) {
      console.log("EEEEEEEEEEEEE", error);
    }
  }

  export const getImmeFee = async () => {
    try {
      console.log(config, "af");
      const softPercent = await readContract(config, {
        abi : CONTRACT_ABI_HARD,
        address: CONTRACT_ADDRESS_HARD as Address,
        functionName: "IMMEDIATE_WITHDRAWAL_FEE_PERCENTAGE",
      });
      console.log(softPercent, "SADAAAAAAAAAAAAAA")
      return softPercent;
    } catch (error) {
      console.log("EEEEEEEEEEEEE", error);
    }
  }

  export const getSoftUnlock = async () => {
    try {
      console.log(config, "af");
      const softPercent = await readContract(config, {
        abi : CONTRACT_ABI_ARY,
        address: CONTRACT_ADDRESS as Address,
        functionName: "lockDuration",
      });
      console.log(softPercent, "SADAAAAAAAAAAAAAA")
      return softPercent;
    } catch (error) {
      console.log("EEEEEEEEEEEEE", error);
    }
  }

  export const getRewardRemain = async () => {
    try {
      console.log(config, "AAAAAAAAAAAAAAAA");
      const rewardRemain = await readContract(config, {
        abi : CONTRACT_ABI_ARY,
        address: CONTRACT_ADDRESS as Address,
        functionName: "rewardsRemaining",
      });
      console.log(rewardRemain, "SADAAAAAAAAAAAAAA")
      return rewardRemain;
    } catch (error) {
      console.log("EEEEEEEEEEEEE", error);
    }
    
  }

  export const approve = async (config: Config, tokenId: number, amount: any, spenderAddress: Address = CONTRACT_ADDRESS) => {
    toast.warning('Please wait');
    console.log(amount + "---------------------");
    console.log(spenderAddress + "--------------------");
    const token = TOKEN_LIST[tokenId];
    const tokenAddress = token.address;
    const abi = Abis[token.name]
    const appr = await writeContract(config, {
      abi,
      functionName: "approve",
      address: tokenAddress as Address, args: [spenderAddress, amount]
    }).then(async (hash) => {
      console.log("Approve Tx:", hash);
      toast.warning('Please wait');
      await waitForTransactionReceipt(config, {
        hash,
      });
      toast.success("approve success");
      return true
    }).catch((reason) => {
      console.log("Approve faild:", reason);
      toast.error("approve failed");
      return false;
    });
    

    return appr

  }

  export const deposit = async (config: Config, amount: number, address: Address | undefined) => {
    if(amount === 0) {
      toast.error("Input amount correctly");
      return false;
    } 
    const approveRes = await approve(config, 2, amount, address);
    if(!approveRes) return false;
    try {
      const res = await writeContract(config, {
        abi: CONTRACT_ABI_ARY,
        address: CONTRACT_ADDRESS as Address,
        functionName: 'deposit',
        args: [amount],
      }).then(async (hash) => {
        console.log("Approve Tx:", hash);
        toast.warning('Please wait');
        await waitForTransactionReceipt(config, {
          hash,
        });
        return true
      })
        .catch((reason) => {
          console.log("Approve faild:", reason);
          toast.error("deposit failed");
          return false
        });
      console.log(res)
      window.location.reload();
      toast.success("deposit success");

      return res
    } catch (error) {
      console.log(error)
      toast.error("Transcation failed");
      return false;
    }
  }

  export const depositHard = async (config: Config, amount: number, address: Address | undefined) => {
    if(amount === 0) {
      toast.error("Input amount correctly");
      return false;
    } 
    const approveRes = await approve(config, 2, amount, address);
    if(!approveRes) return false;
    const payableAmount = 1;
    const payableCro = ethers.parseEther(payableAmount.toString())
    try {
      const res = await writeContract(config, {
        abi: CONTRACT_ABI_HARD,
        address: CONTRACT_ADDRESS_HARD as Address,
        functionName: 'stake',
        args: [amount],
        value: payableCro
      }).then(async (hash) => {
        console.log("Approve  Tx:", hash);
        toast.warning('Please wait!');
        await waitForTransactionReceipt(config, {
          hash,
        });
        return true
      })
        .catch((reason) => {
          console.log("Approve faild:", reason);
          toast.error("deposit failed");
          return false
        });
      console.log(res)
      window.location.reload();
      toast.success("deposit success");

      return res
    } catch (error) {
      console.log(error)
      toast.error("Transcation failed");
      return false;
    }
  }

  export const claimRewards = async (config: Config) => {
    toast.warning('Please wait while claimReward');
    try {
      const res = await writeContract(config, {
        abi : CONTRACT_ABI_ARY,
        address: CONTRACT_ADDRESS as Address,
        functionName: 'claimRewards',
        args: [],
      }).then(async (hash) => {
        console.log("Tx:", hash);
        toast.warning('Please wait');
        await waitForTransactionReceipt(config, {
          hash,
        });
      window.location.reload();

        toast.success('claim success');

        return true
      })
        .catch((reason) => {
          console.log("Faild claim:", reason);
          toast.error("claim Faild");
          return false
        });
      return res;
    } catch (error) {
      console.log(error);
      toast.error("claim Faild");
      return false
    }
  }

  export const claimRewardsHard = async (config: Config) => {
    toast.warning('Please wait while claimReward');
    try {
      const res = await writeContract(config, {
        abi : CONTRACT_ABI_HARD,
        address: CONTRACT_ADDRESS_HARD as Address,
        functionName: 'withdrawRewards',
        args: [],
      }).then(async (hash) => {
        console.log("Tx:", hash);
        toast.warning('Please wait');
        await waitForTransactionReceipt(config, {
          hash,
        });
      window.location.reload();

        toast.success('claim success');

        return true
      })
        .catch((reason) => {
          console.log("Faild claim:", reason);
          toast.error("claim Faild");
          return false
        });
      return res;
    } catch (error) {
      console.log(error);
      toast.error("claim Faild");
      return false
    }
  }

  export const withdraw = async (config: Config, address: Address | undefined) => {
    toast.warning('Please wait while withdrawing');
    
    try {
      const res = await writeContract(config, {
        abi : CONTRACT_ABI_ARY,
        address: CONTRACT_ADDRESS as Address,
        functionName: 'withdraw',
        args: [],
      }).then(async (hash) => {
        console.log("Tx:", hash);
        toast.warning('Please wait');
        await waitForTransactionReceipt(config, {
          hash,
        });
      window.location.reload();

        toast.success('withdraw success');
        return true
      })
        .catch((reason) => {
          console.log("Faild withdraw:", reason);
          toast.error("Transaction Faild");
          return false
        });
      return res;
    } catch (error) {
      console.log(error);
      toast.error("Transcation Faild");
      return false
    }
  }

  export const withdrawHard = async (config: Config, address: Address | undefined) => {
    toast.warning('Please wait while withdrawing');
    
    try {
      const res = await writeContract(config, {
        abi : CONTRACT_ABI_HARD,
        address: CONTRACT_ADDRESS_HARD as Address,
        functionName: 'withdraw',
        args: [],
      }).then(async (hash) => {
        console.log("Tx:", hash);
        toast.warning('Please wait');
        await waitForTransactionReceipt(config, {
          hash,
        });
      window.location.reload();

        toast.success('withdraw success');
        return true
      })
        .catch((reason) => {
          console.log("Faild withdraw:", reason);
          toast.error("Transaction Faild");
          return false
        });
      return res;
    } catch (error) {
      console.log(error);
      toast.error("Transcation Faild");
      return false
    }
  }

  export const Emerwithdraw = async (config: Config, address: Address | undefined) => {
    toast.warning('Please wait while EmergencyWithdraw');
    
    try {
      const res = await writeContract(config, {
        abi : CONTRACT_ABI_HARD,
        address: CONTRACT_ADDRESS_HARD as Address,
        functionName: 'immediateWithdraw',
        args: [],
      }).then(async (hash) => {
        console.log("Tx:", hash);
        toast.warning('Please wait');
        await waitForTransactionReceipt(config, {
          hash,
        });
      window.location.reload();

        toast.success('EmergencyWithdraw success');
        return true
      })
        .catch((reason) => {
          console.log("Faild withdraw:", reason);
          toast.error("Emer-withdraw Faild");
          return false
        });
      return res;
    } catch (error) {
      console.log(error);
      toast.error("Emer-withdraw Faild");
      return false
    }
  }

  export const convertBignitToString = (eth: any) => {
    // const eth: any = Number(num) / 10 ** 18;
    if(eth == 0) return 0;
    const head = eth.toString().split(".")[0];
    console.log(head, "^^^^^^^^^^");
    if (head.length > 9) return head.slice(0, head.length - 9) + "B";
    if (head.length > 6) return head.slice(0, head.length - 6) + "M";
    if (head.length > 3) return head.slice(0, head.length - 3) + "K";
    return eth.toFixed(3);
  }