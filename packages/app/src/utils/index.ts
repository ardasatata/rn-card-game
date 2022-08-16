import {CardItemType} from "../type";
import {PAIR_LENGTH} from "../screens/game/consts";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const shuffle = (arr: CardItemType[]) => (
  arr.sort(() => Math.random() - 0.5)
)

export const randomInteger = (min: number, max: number):number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

export const randomizedCards = (_cards: CardItemType[]): CardItemType[] => {
    const cards = shuffle(_cards)
    const duplicated_cards = [...cards, ...cards].map((card, i) => ({ ...card, key: `${card.key}-${i}` }))
    return shuffle(duplicated_cards)
}