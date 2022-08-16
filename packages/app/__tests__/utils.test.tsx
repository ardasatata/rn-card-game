import {randomInteger, randomizedCards, shuffle} from "../src/utils";
import {MOCK_CARDS} from "../src/screens/game/consts";

describe("Util Test Cases", () => {
  test('shuffle function return the same length', async () => {
    const cards = shuffle(MOCK_CARDS)
    expect(shuffle(MOCK_CARDS).length).toBe(cards.length)
  })

  test('randomInteger should return number', async () => {
    expect(typeof randomInteger(0, 100)).toBe("number")
  })

  test('randomizedCards should return twice the length', async () => {
    const shuffledCards = randomizedCards(MOCK_CARDS)
    expect(shuffledCards.length).toBe(MOCK_CARDS.length * 2)
  })
})