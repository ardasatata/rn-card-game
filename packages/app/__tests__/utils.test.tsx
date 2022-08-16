import {randomizedCards, shuffle} from "../src/utils";
import {CARD_PAIRS_VALUE} from "../src/screens/game/consts";

test('shuffle function return the same length', async () => {

  const cards = randomizedCards()

  expect(cards.length).toBe(CARD_PAIRS_VALUE.length * 2)
})