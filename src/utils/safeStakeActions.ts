import { readContract, writeContract } from '@wagmi/core';
import { Address } from 'viem';
import { Abis } from '@/utils';
import { CONTRACT_ADDRESS, TOKEN_LIST, WCRO, VVS2Router, fee, } from '../config/safeStakeConfig';
import { CONTRACT_ABI_ARY, VVS2_ABI, ABI } from '@/utils';
import { getBalance } from 'wagmi/actions';
import { toast } from 'react-toastify';
import { Config, useAccount } from "wagmi"
import { waitForTransactionReceipt } from 'wagmi/actions';
import { parseEther } from 'viem'
import { config } from '@/config/config';

export const getUserInfo = async (config: Config, owner: Address) => {
    const res = await readContract(config, {
      abi : CONTRACT_ABI_ARY,
      address: CONTRACT_ADDRESS as Address,
      functionName: "userInfo",
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

  export const Emerwithdraw = async (config: Config, address: Address | undefined) => {
    toast.warning('Please wait while EmergencyWithdraw');
    
    try {
      const res = await writeContract(config, {
        abi : CONTRACT_ABI_ARY,
        address: CONTRACT_ADDRESS as Address,
        functionName: 'emergencyWithdraw',
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