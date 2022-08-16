/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {color, spacing} from "../../styles";
import {HStack, VStack} from "../../components/view-stack";
import {Text} from "../../components/text/text";
import {Spacer} from "../../components/spacer";
import {CardItem} from "./card-item";
import {GameContext} from "../../hooks/GameContextProvider";
import alert from "../../components/alert";

const GameMain:React.FC = ({}) => {

  const {
    shuffleCards,
    cards,
    disabled,
    handleChoice,
    turns,
    choiceOne,
    choiceTwo,
    pairsCompleted
  } = useContext(GameContext)

  const winAlert = () =>
    alert(
      "Congratulations!",
      `You win this game by ${turns} steps!`,
      [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        { text: "Try another round", onPress: () => {
          shuffleCards()
        } }
      ]
    );

  useEffect(()=>{
    if(pairsCompleted === cards.length / 2){
      winAlert()
    }
  },[pairsCompleted])

  return (
    <VStack top={spacing.large} style={[styles.mainContainer, Platform.OS === 'web' ? styles.containerWeb : null]}>
      <HStack horizontal={spacing.large} vertical={spacing.small}>
        <TouchableOpacity onPress={shuffleCards}>
          <Text style={styles.restartButton}>
            Restart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={winAlert}>
          <Text style={styles.restartButton}>
            Win
          </Text>
        </TouchableOpacity>
        <Spacer/>
        <VStack>
          <Text style={styles.textSteps}>
            STEPS:
            <Text style={styles.textStepsNumber}>
              {turns}
              {pairsCompleted}
            </Text>
          </Text>
        </VStack>
      </HStack>
      <VStack horizontal={spacing.small} vertical={spacing.small} style={styles.cardContainer}>
        {cards.map((card) => {
          return (
            <CardItem
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
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height: '100%',
    justifyContent: 'center'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: color.dark900
  },
  containerWeb: {
    maxWidth: 480,
    alignSelf: 'center'
  },
  textSteps: {
    color: color.white,
    fontSize: spacing.large
  },
  textStepsNumber: {
    color: color.primary900,
    fontSize: spacing.extraLarge
  },
  restartButton: {
    color: color.primary900,
    fontSize: spacing.extraMedium
  }
});
export default GameMain;
