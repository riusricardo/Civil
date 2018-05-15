import { isInCommitStage, isInRevealStage, isVotePassed } from "./pollHelper";
import { is0x0Address } from "@joincivil/utils";
import { ChallengeData } from "../../types";

/**
 * Checks if a Challenge is in the Commit stage
 * @param challengeData the ChallengeData to check
 */
export function isChallengeInCommitStage(challengeData: ChallengeData): boolean {
  return isInCommitStage(challengeData.poll);
}

/**
 * Checks if a Challenge is in the Reveal stage
 * @param challengeData the ChallengeData to check
 */
export function isChallengeInRevealStage(challengeData: ChallengeData): boolean {
  return isInRevealStage(challengeData.poll);
}

/**
 * Checks if an Appeal can be requested for this challenge
 * @param challengeData the ChallengeData to check
 */
export function canRequestAppeal(challengeData: ChallengeData): boolean {
  if (isChallengeInCommitStage(challengeData)) {
    return false;
  } else if (isChallengeInRevealStage(challengeData)) {
    return false;
  } else {
    if (challengeData.appeal && !is0x0Address(challengeData.appeal.requester.toString())) {
      return false;
    } else {
      return challengeData.requestAppealExpiry.toNumber() > Date.now() / 1000;
    }
  }
}

/**
 * Checks if a Challenge succeeded
 * @param challengeData the ChallengeData to check
 */
export function didChallengeSucceed(challengeData: ChallengeData): boolean {
  return isVotePassed(challengeData.poll);
}
