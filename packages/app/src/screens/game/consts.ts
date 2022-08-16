import {CardItemType} from "../../type";
import {randomInteger} from "../../utils";

export const PAIR_LENGTH = 6
export const ANIMATION_DURATION = 500

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CARD_PAIRS_VALUE:Array<CardItemType> = new Array<CardItemType>(PAIR_LENGTH).fill().map(()=> {
  const generatedNumber = randomInteger(0, 100)
  return {
    number: generatedNumber,
    status: false,
    key: generatedNumber.toString()
  }
});