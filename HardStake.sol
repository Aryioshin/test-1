// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SwapPro.sol"; // Import your swap contract
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract HardStake is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Reference to your swap contract
    SwapPro public swapContract;

    // Info of each user.
    struct UserInfo {
        uint256 amount;     // How many tokens the user has staked.
        uint256 rewardDebt; // Reward debt.
    }

    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardToken;

    // Total amount staked
    uint256 public totalStaked;

    // Info of each user that stakes tokens.
    mapping (address => UserInfo) public userInfo;

    // Accumulated rewards per share, times 1e12.
    uint256 public accTokensPerShare;

    // Total rewards distributed
    uint256 public totalRewards;

    // Minimum volume required to participate
    uint256 public minimumVolumeRequired;

    // Event declarations
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event Claim(address indexed user, uint256 amount);
    event RewardAdded(uint256 amount);

    constructor(
        address _stakingToken,
        address payable _swapContract,
        uint256 _minimumVolumeRequired
    ) Ownable(msg.sender) {  // Pass msg.sender to the Ownable constructor
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_stakingToken); // Assuming rewards are in the same token
        swapContract = SwapPro(_swapContract);
        minimumVolumeRequired = _minimumVolumeRequired;
    }


    // Function called by swap contract to notify about new rewards
    function notifyRewardAmount(uint256 reward) external {
        require(msg.sender == address(swapContract) || msg.sender == owner(), "Not authorized");
        if (totalStaked == 0) {
            // No stakers, do nothing
            return;
        }
        // Update accTokensPerShare
        accTokensPerShare += (reward * 1e12) / totalStaked;
        totalRewards += reward;
        emit RewardAdded(reward);
    }

    // View function to see pending Reward on frontend.
    function pendingReward(address _user) external view returns (uint256) {
        UserInfo storage user = userInfo[_user];
        uint256 pending = (user.amount * accTokensPerShare) / 1e12 - user.rewardDebt;
        return pending;
    }

    // Stake tokens
    function deposit(uint256 _amount) external nonReentrant {
        uint256 userVol = swapContract.userVolume(msg.sender);
        require(userVol >= minimumVolumeRequired, "Insufficient DApp volume to stake");

        UserInfo storage user = userInfo[msg.sender];

        // Update user's rewards before changing the amount
        if (user.amount > 0) {
            uint256 pending = (user.amount * accTokensPerShare) / 1e12 - user.rewardDebt;
            if (pending > 0) {
                rewardToken.safeTransfer(msg.sender, pending);
                emit Claim(msg.sender, pending);
            }
        }

        if (_amount > 0) {
            stakingToken.safeTransferFrom(msg.sender, address(this), _amount);
            user.amount += _amount;
            totalStaked += _amount;
        }

        user.rewardDebt = (user.amount * accTokensPerShare) / 1e12;
        emit Deposit(msg.sender, _amount);
    }

    // Withdraw staked tokens
    function withdraw(uint256 _amount) external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];
        require(user.amount >= _amount, "Withdraw amount exceeds balance");

        // Update user's rewards before changing the amount
        uint256 pending = (user.amount * accTokensPerShare) / 1e12 - user.rewardDebt;
        if (pending > 0) {
            rewardToken.safeTransfer(msg.sender, pending);
            emit Claim(msg.sender, pending);
        }

        if (_amount > 0) {
            user.amount -= _amount;
            totalStaked -= _amount;
            stakingToken.safeTransfer(msg.sender, _amount);
            emit Withdraw(msg.sender, _amount);
        }

        user.rewardDebt = (user.amount * accTokensPerShare) / 1e12;
    }

    // Claim rewards without withdrawing staked tokens
    function claimRewards() external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];
        uint256 pending = (user.amount * accTokensPerShare) / 1e12 - user.rewardDebt;
        require(pending > 0, "No rewards to claim");
        rewardToken.safeTransfer(msg.sender, pending);
        user.rewardDebt = (user.amount * accTokensPerShare) / 1e12;
        emit Claim(msg.sender, pending);
    }

    // Emergency function to withdraw tokens without caring about rewards
    function emergencyWithdraw() external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];
        uint256 amount = user.amount;
        require(amount > 0, "Nothing to withdraw");
        totalStaked -= amount;
        user.amount = 0;
        user.rewardDebt = 0;
        stakingToken.safeTransfer(msg.sender, amount);
        emit Withdraw(msg.sender, amount);
    }

    // Function to update the minimum volume required
    function updateMinimumVolumeRequired(uint256 _newVolume) external onlyOwner {
        minimumVolumeRequired = _newVolume;
    }

    // Function to recover tokens sent to contract by mistake
    function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyOwner {
        require(tokenAddress != address(stakingToken), "Cannot recover staking token");
        IERC20(tokenAddress).safeTransfer(owner(), tokenAmount);
    }
}
