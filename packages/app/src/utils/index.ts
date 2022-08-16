import { CARD_PAIRS_VALUE } from "../screens/game/consts";
import {CardItemType} from "../type";

export * from './logger'

export const shuffle = (arr: CardItemType[]) => (
  arr.sort(() => Math.random() - 0.5)
)

export function randomInteger(min: number, max: number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomizedCards = (): CardItemType[] => {
    const cards = shuffle(CARD_PAIRS_VALUE)
    const duplicated_cards = [...cards, ...cards].map((card, i) => ({ ...card, key: `${card.key}-${i}` }))
    return shuffle(duplicated_cards)
}