import { toWei, fromWei } from "../utils";
import { ethers, BigNumber, Contract, Signer } from "ethers";
import vaultAbi from "../data/abis/HATSVault.json";
import erc20Abi from "../data/abis/erc20.json";
import { NotificationType, TransactionStatus } from "../constants/constants";
import { Web3Provider } from "@ethersproject/providers";
import { Dispatch } from "redux";
import { toggleNotification } from "./index";

let provider: Web3Provider;
let signer: Signer;

if (window.ethereum) {
  provider = new ethers.providers.Web3Provider((window as any).ethereum);
  signer = provider.getSigner();
}

/**
 * Given token address returns it's symbol
 * @param {string} tokenAddress
 */
export const getTokenSymbol = async (tokenAddress: string): Promise<string> => {
  const contract = new Contract(tokenAddress, erc20Abi, provider);
  return await contract.symbol();
}

/**
 * Given token address and current wallet account address returns the token balance
 * @param {string} tokenAddress
 * @param {string} selectedAddress
 */
export const getTokenBalance = async (tokenAddress: string, selectedAddress: string): Promise<string> => {
  const contract = new Contract(tokenAddress, erc20Abi, provider);
  const balance: BigNumber = await contract.balanceOf(selectedAddress);
  return fromWei(balance);
}

/**
 * Checks whether a given account address and a spender can spend a given token
 * @param {string} tokenAddress
 * @param {string} selectedAddress
 * @param {string} tokenSpender
 */
export const isApproved = async (tokenAddress: string, selectedAddress: string, tokenSpender: string): Promise<boolean> => {
  const contract = new Contract(tokenAddress, erc20Abi, provider);
  const allowance: BigNumber = await contract.allowance(selectedAddress, tokenSpender);
  return allowance.gt(0);
}

/**
 * Approves a spender to spend a given token
 * @param {string} tokenAddress
 * @param {string} tokenSpender
 */
export const approveToken = async (tokenAddress: string, tokenSpender: string) => {
  const contract = new Contract(tokenAddress, erc20Abi, signer);
  return await contract.approve(tokenSpender, ethers.BigNumber.from(2).pow(255));
}

/**
 * Deposit
 * @param {string} address
 * @param {string} amount
 */
export const deposit = async (pid: string, address: string, amount: string) => {
  const contract = new Contract(address, vaultAbi, signer);
  return await contract.deposit(pid, toWei(amount));
}

/**
 * Withdraw
 * @param {string} address
 * @param {string} amount
 */
export const withdraw = async (pid: string, address: string, amount: string) => {
  const contract = new Contract(address, vaultAbi, signer);
  return await contract.withdraw(pid, toWei(amount));
}

/**
 * Claim
 * @param {stirng} address
 */
export const claim = async (pid: string, address: string) => {
  const contract = new Contract(address, vaultAbi, signer);
  return await contract.claimReward(pid);
}

/**
 * Returns the HATS reward for a user
 * @param {string} address
 * @param {stirng} pid
 * @param {string} selectedAddress
 */
export const getPendingReward = async (address: string, pid: string, selectedAddress: string) => {
  const contract = new Contract(address, vaultAbi, signer);
  return await contract.pendingReward(pid, selectedAddress);
}

/**
 * Submits the hash of the vulnerability description
 * @param {string} address
 * @param {string} descriptionHash the sha256 of the vulnerability description
 */
export const submitVulnerability = async (address: string, descriptionHash: string) => {
  const contract = new Contract(address, vaultAbi, signer);
  return await contract.claim(descriptionHash);
}

/**
 * This is a generic function that wraps a call that interacts with the blockchain
 * Dispatches automatically a notification on success or on error.
 * @param {Function} tx The function that creates the transaction on the blockchain
 * @param {Function} onSuccess Function to call on success
 * @param {Function} onFail Function to call on fail
 * @param {Dispatch} dispatch The Redux dispath function to dispatch the notification
 * @param {string} successText Optional extra text to show on success
 */
export const createTransaction = async (tx: Function, onSuccess: Function, onFail: Function, dispatch: Dispatch, successText?: string) => {
  try {
    const transaction = await tx();
    const receipt = await transaction.wait();
    if (receipt.status === TransactionStatus.Success) {
      await onSuccess();
      dispatch(toggleNotification(true, NotificationType.Success, successText ?? "Transaction successed"));
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    await onFail();
    dispatch(toggleNotification(true, NotificationType.Error, error?.message ?? "Something went wrong :("));
  }
}
