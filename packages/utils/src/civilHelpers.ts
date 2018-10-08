import { EthAddress, Hex } from "@joincivil/typescript-types";
import { soliditySha3 } from "./crypto";

export function getVoteSaltHash(vote: string, salt: string): string {
  return soliditySha3(["uint", "uint"], [vote, salt]);
}

/** For Proof of Use UserGroups smart-contract forceUnion */
export function prepareForceUnionMessage(
  userGroupsAddress: EthAddress,
  addressA: EthAddress,
  addressB: EthAddress,
): Hex {
  return soliditySha3(
    ["address", "bytes32"],
    [userGroupsAddress, soliditySha3(["address", "address"], [addressA, addressB])],
  );
}

export function prepareMaxGroupSizeMessage(userGroupsAddress: EthAddress, nonce: number, groupSize: number): Hex {
  return soliditySha3(["address", "bytes32"], [userGroupsAddress, soliditySha3(["uint", "uint"], [nonce, groupSize])]);
}

export function prepareNewsroomMessage(newsroomAddress: EthAddress, contentHash: Hex): Hex {
  // TODO(ritave): We might want to use Metamask's typed signining procedure which would explain
  //               Sadly it's only supported by Metamask so not yet
  //               https://medium.com/metamask/scaling-web3-with-signtypeddata-91d6efc8b290
  return soliditySha3(["address", "bytes32"], [newsroomAddress, contentHash]);
}

export function prepareUserFriendlyNewsroomMessage(newsroomAddress: EthAddress, contentHash: Hex): string {
  return `I authorize this newsroom with address ${newsroomAddress} to publish this article whose content hashes to ${contentHash} using keccak256`;
}

export function prepareConstitutionSignMessage(newsroomAddress: EthAddress, constitutionHash: Hex): string {
  return `By signing this message, I am agreeing on behalf of the Newsroom to abide by the Civil Community's ethical principles as described in the Civil Constitution.\n\nNewsrooom Address:\n${newsroomAddress}\n\nConstitution Hash:\n${constitutionHash}`;
}

// TODO(jon): Update this to support the proper blocks by network
export function getDefaultFromBlock(network: number = 4): number {
  // A map of the network id to its corresponding default fromBlock, which
  // could be the TCR genesis block or possibly the geneis block of the
  // first Newsroom contract on that network
  const defaultFromBlocks: { [index: string]: number } = {
    4: 2848355,
  };
  return defaultFromBlocks[network.toString()];
}

export enum Parameters {
  minDeposit = "minDeposit",
  pMinDeposit = "pMinDeposit",
  applyStageLen = "applyStageLen",
  pApplyStageLen = "pApplyStageLen",
  commitStageLen = "commitStageLen",
  pCommitStageLen = "pCommitStageLen",
  revealStageLen = "revealStageLen",
  pRevealStageLen = "pRevealStageLen",
  dispensationPct = "dispensationPct",
  pDispensationPct = "pDispensationPct",
  voteQuorum = "voteQuorum",
  pVoteQuorum = "pVoteQuorum",
  pProcessBy = "pProcessBy",
  challengeAppealLen = "challengeAppealLen",
  challengeAppealCommitLen = "challengeAppealCommitLen",
  challengeAppealRevealLen = "challengeAppealRevealLen",
}

export enum GovernmentParameters {
  requestAppealLen = "requestAppealLen",
  judgeAppealLen = "judgeAppealLen",
  appealFee = "appealFee",
  appealVotePercentage = "appealVotePercentage",
}
