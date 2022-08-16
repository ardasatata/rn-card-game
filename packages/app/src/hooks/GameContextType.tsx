import {CardItemType} from "../type";

export type GameContextType = {
  shuffleCards(): void,
  turns: number,
  cards: CardItemType[],
  handleChoice(card: CardItemType): void,
  choiceOne: CardItemType | null,
  choiceTwo: CardItemType | null,
  disabled: boolean,
}