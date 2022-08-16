import React, {createContext} from "react";
import {CardItemType} from "../type";
import {useEffect, useMemo, useState} from "react";
import {logger, randomizedCards} from "../utils";
import {ANIMATION_DURATION} from "../screens/game/consts";
import {GameContextType} from "./GameContextType";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const GameContext = createContext<GameContextType>(null);

export const GameContextProvider:React.FC = ({children}) => {

  const [cards, setCards] = useState<Array<CardItemType>>([])
  const [turns, setTurns] = useState<number>(0)
  const [choiceOne, setChoiceOne] = useState<CardItemType | null>(null)
  const [choiceTwo, setChoiceTwo] = useState<CardItemType | null>(null)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [pairsCompleted, setPairsCompleted] = useState<number>(0)

  // shuffle cards for new game
  const shuffleCards = () => {

    const shuffledCards = randomizedCards()

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setPairsCompleted(0)
  }

  // handle a choice
  const handleChoice = (card: CardItemType) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.number === choiceTwo.number) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.number === choiceOne.number) {
              return { ...card, status: true }
            } else {
              return card
            }
          })
        })
        setPairsCompleted( prevState => prevState + 1)
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), ANIMATION_DURATION)
      }

    }
  }, [choiceOne, choiceTwo, pairsCompleted])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start new game automagically
  useEffect(() => {
    shuffleCards()
  }, [])

  const appContextValue = useMemo(
    () => ({
      shuffleCards,
      turns,
      cards,
      handleChoice,
      choiceOne,
      choiceTwo,
      disabled,
      pairsCompleted
    }),
    [
      shuffleCards,
      turns,
      cards,
      handleChoice,
      choiceOne,
      choiceTwo,
      disabled,
      pairsCompleted
    ]
  );

  return(
    <GameContext.Provider value={appContextValue} >
      {children}
    </GameContext.Provider>
  )
}