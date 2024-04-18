export const HATAirdrop_abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "CannotRecoverBeforeDeadline", type: "error" },
  { inputs: [], name: "CannotRedeemAfterDeadline", type: "error" },
  { inputs: [], name: "CannotRedeemBeforeStartTime", type: "error" },
  { inputs: [], name: "InvalidMerkleProof", type: "error" },
  { inputs: [], name: "LeafAlreadyRedeemed", type: "error" },
  { inputs: [], name: "RedeemerMustBeBeneficiary", type: "error" },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint8", name: "version", type: "uint8" }],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "string", name: "_merkleTreeIPFSRef", type: "string" },
      { indexed: false, internalType: "bytes32", name: "_root", type: "bytes32" },
      { indexed: false, internalType: "uint256", name: "_startTime", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "_deadline", type: "uint256" },
    ],
    name: "MerkleTreeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "_account", type: "address" },
      { indexed: true, internalType: "address", name: "_tokenLock", type: "address" },
      { indexed: false, internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "TokensRedeemed",
    type: "event",
  },
  {
    inputs: [],
    name: "deadline",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_merkleTreeIPFSRef", type: "string" },
      { internalType: "bytes32", name: "_root", type: "bytes32" },
      { internalType: "uint256", name: "_startTime", type: "uint256" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
      { internalType: "uint256", name: "_lockEndTime", type: "uint256" },
      { internalType: "uint256", name: "_periods", type: "uint256" },
      { internalType: "contract IERC20Upgradeable", name: "_token", type: "address" },
      { internalType: "contract ITokenLockFactory", name: "_tokenLockFactory", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "leafRedeemed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockEndTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "periods",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "bytes32[]", name: "_proof", type: "bytes32[]" },
    ],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "root",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [{ internalType: "contract IERC20Upgradeable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenLockFactory",
    outputs: [{ internalType: "contract ITokenLockFactory", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;