/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';
import {color, layout, roundness, spacing} from "../styles";
import {HStack, VStack} from "../components/view-stack";
import {Text} from "../components/text/text";
import {Spacer} from "../components/spacer";

import {AnimeContext} from "../hooks/AnimeContextProvider";

type CardItemType = {
  number: number;
  status: boolean;
  key: string
}

const shuffle = (arr: CardItemType[]) => (
  arr.sort(() => Math.random() - 0.5)
)

function randomInteger(min: number, max: number):number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const CARD_PAIRS_VALUE:Array<CardItemType> = [
//   {
//     number: 1,
//     status: false
//   },
//   {
//     number: 3,
//     status: false
//   },
//   {
//     number: 5,
//     status: false
//   },
//   {
//     number: 7,
//     status: false
//   },
//   {
//     number: 9,
//     status: false
//   },
//   {
//     number: 11,
//     status: false
//   },
// ];

export const PAIR_LENGTH = 6
export const ANIMATION_DURATION = 500

// @ts-ignore
const CARD_PAIRS_VALUE:Array<CardItemType> = new Array<CardItemType>(PAIR_LENGTH).fill().map(()=> {
  const generatedNumber = randomInteger(0, 100)
  return {
    number: generatedNumber,
    status: false,
    key: generatedNumber.toString()
  }
});

const randomizedCards = (): CardItemType[] => {
  const cards = shuffle(CARD_PAIRS_VALUE)
  const duplicated_cards = [...cards, ...cards].map((card, i) => ({ ...card, key: `${card.key}-${i}` }))
  return shuffle(duplicated_cards)
}

const Card:React.FC = ({ card, handleChoice, flipped, disabled }) => {

  const animated = useRef(new Animated.Value(0)).current;
  let valueAnimated = useRef(0).current;

  animated.addListener(({value}) => {
    valueAnimated = value
  })

  const frontInterpolate = animated.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg']
  })
  const backInterpolate = animated.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  })

  const styles = StyleSheet.create({
    container: {
      flexBasis: '33.3%',
      flex: 1,
      height: '25%',
      padding: spacing.tiny,
    },
    card:{
      backgroundColor: color.primary900,
      borderRadius: roundness.lg,
      borderColor: color.white,
      borderWidth: spacing.nano,
      height: '100%',
      backfaceVisibility: "hidden"
    },
    cardNumber:{
      backgroundColor: color.white,
      position: 'absolute',
      width: '100%',
      top: spacing.tiny,
      left: spacing.tiny
    }
  });

  const flipCard = () => {
    if(valueAnimated > 90){
      Animated.timing(animated, {
        useNativeDriver: true,
        toValue: 0,
        duration: ANIMATION_DURATION
      }).start()
    } else {
      Animated.timing(animated, {
        useNativeDriver: true,
        toValue: 180,
        duration: ANIMATION_DURATION
      }).start()
    }
  }

  useEffect(()=>{
    // flipCard()
    if(flipped){
      Animated.timing(animated, {
        useNativeDriver: true,
        toValue: 180,
        duration: ANIMATION_DURATION
      }).start()
    } else {
      Animated.timing(animated, {
        useNativeDriver: true,
        toValue: 0,
        duration: ANIMATION_DURATION
      }).start()
    }
  },[flipped])

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
    // flipCard()
  }

  return (
    <TouchableOpacity
      onPress={handleClick}
      style={styles.container}
    >
      <Animated.View style={[layout.flexCenterMid, styles.card, {
        transform: [
          {
            rotateY: frontInterpolate
          }
        ]
      }]}>
        <Text style={{color: color.white, fontSize: spacing.extraLarge}}>
          ?
        </Text>
      </Animated.View>
      <Animated.View style={[layout.flexCenterMid, styles.card, styles.cardNumber, {
        transform: [
          {
            rotateY: backInterpolate
          }
        ]
      }]}>
        <Text style={{color: color.dark900, fontSize: spacing.extraLarge}}>
          {card.number}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )
};

const AnimeList:React.FC = ({}) => {

  const [cards, setCards] = useState<Array<CardItemType>>([])
  const [turns, setTurns] = useState<number>(0)
  const [choiceOne, setChoiceOne] = useState<CardItemType | null>(null)
  const [choiceTwo, setChoiceTwo] = useState<CardItemType | null>(null)
  const [disabled, setDisabled] = useState<boolean>(false)

  // shuffle cards for new game
  const shuffleCards = () => {

    const shuffledCards = randomizedCards()

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
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
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), ANIMATION_DURATION)
      }

    }
  }, [choiceOne, choiceTwo])

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

  return (
    <VStack top={spacing.large} style={{flex: 1, backgroundColor: color.dark900}}>
      <HStack horizontal={spacing.large} vertical={spacing.medium}>
        <TouchableOpacity onPress={shuffleCards}>
          <Text>
            Restart
          </Text>
        </TouchableOpacity>
        <Spacer/>
        <VStack>
          <Text>
            Moves: {turns}
          </Text>
        </VStack>
      </HStack>
      <VStack horizontal={spacing.small} vertical={spacing.small} style={styles.container}>
        {cards.map((card, index) => {
          return (
            <Card
              key={card.key}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.status}
              disabled={disabled || card === choiceOne || card === choiceTwo}
            />
          );
        })}
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height: '100%',
  },
});
export default AnimeList;
