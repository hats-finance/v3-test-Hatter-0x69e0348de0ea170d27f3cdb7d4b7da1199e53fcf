import { IHackerProfile } from "@hats-finance/shared";
import { axiosClient } from "config/axiosClient";
import { BASE_SERVICE_URL } from "settings";

/**
 * Creates or updates a profile by username
 */
export async function upsertProfile(profile: IHackerProfile): Promise<IHackerProfile | undefined> {
  try {
    const response = await axiosClient.post(`${BASE_SERVICE_URL}/profile/${profile.username}`, profile);
    return response.data.profile;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

/**
 * Gets a profile by username
 */
export async function getProfileByUsername(username?: string): Promise<IHackerProfile | undefined> {
  try {
    if (!username) return undefined;

    const response = await axiosClient.get(`${BASE_SERVICE_URL}/profile/by-username/${username}`);
    return response.data.profile;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

/**
 * Gets a profile by address
 */
export async function getProfileByAddress(address?: string): Promise<IHackerProfile | undefined> {
  try {
    if (!address) return undefined;

    const response = await axiosClient.get(`${BASE_SERVICE_URL}/profile/by-address/${address}`);
    return response.data.profile;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

/**
 * Gets the availability of a username
 */
export async function isUsernameAvailable(username?: string): Promise<boolean> {
  try {
    if (!username) return false;
    console.log(1);

    const dataInStorage = JSON.parse(sessionStorage.getItem(`profileUsernameAvailability-${username.toLowerCase()}`) ?? "null");
    console.log(dataInStorage);
    if (dataInStorage !== null) return dataInStorage;
    console.log(2);

    const response = await axiosClient.get(`${BASE_SERVICE_URL}/profile/availability/${username}`);
    const isAvailable = !response.data.isUsed;
    sessionStorage.setItem(`profileUsernameAvailability-${username.toLowerCase()}`, JSON.stringify(isAvailable));
    console.log(3);

    return isAvailable;
  } catch (error) {
    console.log(error);
    return false;
  }
}