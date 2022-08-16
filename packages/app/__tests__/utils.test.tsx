import {shuffle} from "../src/utils";
import {CARD_PAIRS_VALUE} from "../src/screens/game/consts";

test('shuffle function return the same length', async () => {

  const cards = shuffle(CARD_PAIRS_VALUE)
  const duplicated_cards = [...cards, ...cards].map((card, i) => ({ ...card, key: `${card.key}-${i}` }))
  const shuffled =  shuffle(duplicated_cards)

  expect(shuffled.length).toBe(duplicated_cards.length)
})