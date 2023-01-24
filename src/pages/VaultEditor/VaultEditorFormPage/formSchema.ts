import { TFunction } from "react-i18next";
import * as Yup from "yup";
import { getTestAddressOrUrl, getTestEmailAddress, getTestNumberInBetween, getTestWalletAddress } from "utils/yup.utils";
import { COMMITTEE_CONTROLLED_SPLIT, HATS_GOV_SPLIT, HATS_REWARD_SPLIT } from "./utils";

export const getEditedDescriptionYupSchema = (intl: TFunction) =>
  Yup.object().shape({
    version: Yup.string(),
    includesStartAndEndTime: Yup.boolean(),
    "project-metadata": Yup.object({
      icon: Yup.string().required(intl("required")),
      tokenIcon: Yup.string().required(intl("required")),
      website: Yup.string().required(intl("required")),
      name: Yup.string().required(intl("required")),
      type: Yup.string().required(intl("required")),
      starttime: Yup.number()
        .positive(intl("required"))
        .typeError(intl("required"))
        .test(
          "isRequired",
          intl("required"),
          (val, ctx: any) => (ctx.from[1].value.includesStartAndEndTime && val) || !ctx.from[1].value.includesStartAndEndTime
        ),
      endtime: Yup.number()
        .positive(intl("required"))
        .typeError(intl("required"))
        .when("starttime", (starttime: number, schema: any) => {
          if (starttime) return schema.min(starttime, intl("endtimeGreaterThanStarttime"));
        })
        .test(
          "isRequired",
          intl("required"),
          (val, ctx: any) => (ctx.from[1].value.includesStartAndEndTime && val) || !ctx.from[1].value.includesStartAndEndTime
        ),
      emails: Yup.array()
        .of(Yup.object({ address: Yup.string().test(getTestEmailAddress(intl)).required(intl("required")) }))
        .min(1, intl("required"))
        .required(intl("required")),
    }),
    committee: Yup.object({
      "multisig-address": Yup.string().test(getTestAddressOrUrl(intl)).required(intl("required")),
      members: Yup.array().of(
        Yup.object({
          name: Yup.string().required(intl("required")),
          address: Yup.string().test(getTestAddressOrUrl(intl)),
          "pgp-keys": Yup.array()
            .of(Yup.object({ publicKey: Yup.string().required(intl("required")) }))
            .min(1, intl("required"))
            .required(intl("required")),
          "twitter-link": Yup.string().required(intl("required")),
          "image-ipfs-link": Yup.string(),
        })
      ),
    }),
    "contracts-covered": Yup.array().of(
      Yup.object({
        name: Yup.string().required(intl("required")),
        address: Yup.string().test(getTestAddressOrUrl(intl)).required(intl("required")),
        severities: Yup.array().min(1, intl("required")),
      })
    ),
    "vulnerability-severities-spec": Yup.object({
      name: Yup.string(),
      severities: Yup.array().of(
        Yup.object({
          name: Yup.string().required(intl("required")),
          description: Yup.string().required(intl("required")),
          index: Yup.number()
            .typeError(intl("enterValidNumber"))
            .when("version", (version: "v1" | "v2", schema: any) =>
              version === "v1" ? schema.required(intl("required")) : undefined
            ),
          percentage: Yup.number()
            .min(0, intl("min0"))
            .max(100, intl("max100"))
            .typeError(intl("enterValidNumber"))
            .when("version", (version: "v1" | "v2", schema: any) =>
              version === "v2" ? schema.required(intl("required")) : undefined
            ),
          "nft-metadata": Yup.object({
            name: Yup.string().required(intl("required")),
            description: Yup.string().required(intl("required")),
            image: Yup.string().required(intl("required")),
            animation_url: Yup.string().required(intl("required")),
          }),
        })
      ),
    }),
    assets: Yup.array().of(
      Yup.object({
        address: Yup.string().test(getTestWalletAddress(intl)).required(intl("required")),
        chainId: Yup.string().required(intl("required")),
      })
    ),
    parameters: Yup.object({
      fixedCommitteeControlledPercetange: Yup.number().oneOf([COMMITTEE_CONTROLLED_SPLIT], intl("cantChangeThisValue")),
      fixedHatsGovPercetange: Yup.number().oneOf([HATS_GOV_SPLIT], intl("cantChangeThisValue")),
      fixedHatsRewardPercetange: Yup.number().oneOf([HATS_REWARD_SPLIT], intl("cantChangeThisValue")),
      maxBountyPercentage: Yup.number().test(getTestNumberInBetween(intl, 0, 90, true)).required(intl("required")),
      // The sum of the following 3 parameters should be 100
      committeePercentage: Yup.number().test(getTestNumberInBetween(intl, 0, 10, true)).required(intl("required")),
      immediatePercentage: Yup.number().test(getTestNumberInBetween(intl, 0, 100, true)).required(intl("required")),
      vestedPercentage: Yup.number().test(getTestNumberInBetween(intl, 0, 100, true)).required(intl("required")),
    }),
    // "communication-channel": Yup.object({
    //   "pgp-pk": Yup.array().min(1, intl("required")).required(intl("required")),
    // }).required(intl("required")),
  });