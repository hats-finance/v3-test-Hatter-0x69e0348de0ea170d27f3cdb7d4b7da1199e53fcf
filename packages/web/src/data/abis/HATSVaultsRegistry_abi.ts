export const HATSVaultsRegistry_abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_hatVaultImplementation",
        type: "address",
      },
      {
        internalType: "address",
        name: "_hatGovernance",
        type: "address",
      },
      {
        internalType: "address",
        name: "_defaultArbitrator",
        type: "address",
      },
      {
        internalType: "address",
        name: "_HAT",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "_bountyGovernanceHAT",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "_bountyHackerHATVested",
        type: "uint16",
      },
      {
        internalType: "contract ITokenLockFactory",
        name: "_tokenLockFactory",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AmountSwappedLessThanMinimum",
    type: "error",
  },
  {
    inputs: [],
    name: "AmountToSwapIsZero",
    type: "error",
  },
  {
    inputs: [],
    name: "ChallengePeriodTooLong",
    type: "error",
  },
  {
    inputs: [],
    name: "ChallengePeriodTooShort",
    type: "error",
  },
  {
    inputs: [],
    name: "ChallengeTimeOutPeriodTooLong",
    type: "error",
  },
  {
    inputs: [],
    name: "ChallengeTimeOutPeriodTooShort",
    type: "error",
  },
  {
    inputs: [],
    name: "ClaimFeeTransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "DelayTooShort",
    type: "error",
  },
  {
    inputs: [],
    name: "HatVestingDurationSmallerThanPeriods",
    type: "error",
  },
  {
    inputs: [],
    name: "HatVestingDurationTooLong",
    type: "error",
  },
  {
    inputs: [],
    name: "HatVestingPeriodsCannotBeZero",
    type: "error",
  },
  {
    inputs: [],
    name: "NotEnoughFeePaid",
    type: "error",
  },
  {
    inputs: [],
    name: "SafetyPeriodTooLong",
    type: "error",
  },
  {
    inputs: [],
    name: "SwapFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "TotalHatsSplitPercentageShouldBeUpToMaxHATSplit",
    type: "error",
  },
  {
    inputs: [],
    name: "WithdrawPeriodTooShort",
    type: "error",
  },
  {
    inputs: [],
    name: "WithdrawRequestEnabledPeriodTooLong",
    type: "error",
  },
  {
    inputs: [],
    name: "WithdrawRequestEnabledPeriodTooShort",
    type: "error",
  },
  {
    inputs: [],
    name: "WithdrawRequestPendingPeriodTooLong",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_claimer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_descriptionHash",
        type: "string",
      },
    ],
    name: "LogClaim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_hatVaultImplementation",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_HAT",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_tokenLockFactory",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint32",
            name: "hatVestingDuration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "hatVestingPeriods",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "withdrawPeriod",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "safetyPeriod",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "withdrawRequestEnablePeriod",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "withdrawRequestPendingPeriod",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "setMaxBountyDelay",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "claimFee",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct IHATVaultsRegistry.GeneralParameters",
        name: "_generalParameters",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_bountyGovernanceHAT",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_bountyHackerHATVested",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_hatGovernance",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_defaultArbitrator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_defaultChallengePeriod",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_defaultChallengeTimeOutPeriod",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_defaultArbitratorCanChangeBounty",
        type: "bool",
      },
    ],
    name: "RegistryCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    name: "SetClaimFee",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_defaultArbitrator",
        type: "address",
      },
    ],
    name: "SetDefaultArbitrator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "_defaultArbitratorCanChangeBounty",
        type: "bool",
      },
    ],
    name: "SetDefaultArbitratorCanChangeBounty",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_defaultChallengePeriod",
        type: "uint256",
      },
    ],
    name: "SetDefaultChallengePeriod",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_defaultChallengeTimeOutPeriod",
        type: "uint256",
      },
    ],
    name: "SetDefaultChallengeTimeOutPeriod",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_defaultBountyGovernanceHAT",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_defaultBountyHackerHATVested",
        type: "uint256",
      },
    ],
    name: "SetDefaultHATBountySplit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "_isEmergencyPaused",
        type: "bool",
      },
    ],
    name: "SetEmergencyPaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_feeSetter",
        type: "address",
      },
    ],
    name: "SetFeeSetter",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_periods",
        type: "uint256",
      },
    ],
    name: "SetHatVestingParams",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_delay",
        type: "uint256",
      },
    ],
    name: "SetMaxBountyDelay",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_swapToken",
        type: "address",
      },
    ],
    name: "SetSwapToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_vault",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "_visible",
        type: "bool",
      },
    ],
    name: "SetVaultVisibility",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_withdrawRequestPendingPeriod",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_withdrawRequestEnablePeriod",
        type: "uint256",
      },
    ],
    name: "SetWithdrawRequestParams",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_withdrawPeriod",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_safetyPeriod",
        type: "uint256",
      },
    ],
    name: "SetWithdrawSafetyPeriod",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amountSwapped",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amountSent",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_tokenLock",
        type: "address",
      },
    ],
    name: "SwapAndSend",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_vault",
        type: "address",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "contract IRewardController[]",
            name: "rewardControllers",
            type: "address[]",
          },
          {
            internalType: "uint32",
            name: "vestingDuration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "vestingPeriods",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "maxBounty",
            type: "uint16",
          },
          {
            components: [
              {
                internalType: "uint16",
                name: "hackerVested",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "hacker",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "committee",
                type: "uint16",
              },
            ],
            internalType: "struct IHATVault.BountySplit",
            name: "bountySplit",
            type: "tuple",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "committee",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isPaused",
            type: "bool",
          },
          {
            internalType: "string",
            name: "descriptionHash",
            type: "string",
          },
        ],
        indexed: false,
        internalType: "struct IHATVault.VaultInitParams",
        name: "_params",
        type: "tuple",
      },
    ],
    name: "VaultCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "HAT",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HUNDRED_PERCENT",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_HAT_SPLIT",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_asset",
        type: "address",
      },
      {
        internalType: "address",
        name: "_hacker",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_hackersHatReward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_governanceHatReward",
        type: "uint256",
      },
    ],
    name: "addTokensToSwap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "contract IRewardController[]",
            name: "rewardControllers",
            type: "address[]",
          },
          {
            internalType: "uint32",
            name: "vestingDuration",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "vestingPeriods",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "maxBounty",
            type: "uint16",
          },
          {
            components: [
              {
                internalType: "uint16",
                name: "hackerVested",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "hacker",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "committee",
                type: "uint16",
              },
            ],
            internalType: "struct IHATVault.BountySplit",
            name: "bountySplit",
            type: "tuple",
          },
          {
            internalType: "contract IERC20",
            name: "asset",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "committee",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isPaused",
            type: "bool",
          },
          {
            internalType: "string",
            name: "descriptionHash",
            type: "string",
          },
        ],
        internalType: "struct IHATVault.VaultInitParams",
        name: "_params",
        type: "tuple",
      },
    ],
    name: "createVault",
    outputs: [
      {
        internalType: "address",
        name: "vault",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultArbitrator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultArbitratorCanChangeBounty",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultBountyGovernanceHAT",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultBountyHackerHATVested",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultChallengePeriod",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultChallengeTimeOutPeriod",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeSetter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "generalParameters",
    outputs: [
      {
        internalType: "uint32",
        name: "hatVestingDuration",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "hatVestingPeriods",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "withdrawPeriod",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "safetyPeriod",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "withdrawRequestEnablePeriod",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "withdrawRequestPendingPeriod",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "setMaxBountyDelay",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "claimFee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfVaults",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSafetyPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSetMaxBountyDelay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWithdrawPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWithdrawRequestEnablePeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWithdrawRequestPendingPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "governanceHatReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hackersHatReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hatVaultImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "hatVaults",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isEmergencyPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isVaultVisible",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_descriptionHash",
        type: "string",
      },
    ],
    name: "logClaim",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    name: "setClaimFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_defaultArbitrator",
        type: "address",
      },
    ],
    name: "setDefaultArbitrator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_defaultArbitratorCanChangeBounty",
        type: "bool",
      },
    ],
    name: "setDefaultArbitratorCanChangeBounty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_defaultChallengePeriod",
        type: "uint32",
      },
    ],
    name: "setDefaultChallengePeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_defaultChallengeTimeOutPeriod",
        type: "uint32",
      },
    ],
    name: "setDefaultChallengeTimeOutPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_defaultBountyGovernanceHAT",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "_defaultBountyHackerHATVested",
        type: "uint16",
      },
    ],
    name: "setDefaultHATBountySplit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_isEmergencyPaused",
        type: "bool",
      },
    ],
    name: "setEmergencyPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeSetter",
        type: "address",
      },
    ],
    name: "setFeeSetter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_duration",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_periods",
        type: "uint32",
      },
    ],
    name: "setHatVestingParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_delay",
        type: "uint32",
      },
    ],
    name: "setMaxBountyDelay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swapToken",
        type: "address",
      },
    ],
    name: "setSwapToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vault",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_visible",
        type: "bool",
      },
    ],
    name: "setVaultVisibility",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_withdrawRequestPendingPeriod",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_withdrawRequestEnablePeriod",
        type: "uint32",
      },
    ],
    name: "setWithdrawRequestParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_withdrawPeriod",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_safetyPeriod",
        type: "uint32",
      },
    ],
    name: "setWithdrawSafetyPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_beneficiaries",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "_amountOutMinimum",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_routingContract",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_routingPayload",
        type: "bytes",
      },
    ],
    name: "swapAndSend",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenLockFactory",
    outputs: [
      {
        internalType: "contract ITokenLockFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_challengePeriod",
        type: "uint32",
      },
    ],
    name: "validateChallengePeriod",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_challengeTimeOutPeriod",
        type: "uint32",
      },
    ],
    name: "validateChallengeTimeOutPeriod",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_bountyGovernanceHAT",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "_bountyHackerHATVested",
        type: "uint16",
      },
    ],
    name: "validateHATSplit",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
] as const;
