/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {color, spacing} from "../../styles";
import {HStack, VStack} from "../../components/view-stack";
import {Text} from "../../components/text/text";
import {Spacer} from "../../components/spacer";
import {CardItem} from "./card-item";
import {GameContext} from "../../hooks/GameContextProvider";

const GameMain:React.FC = ({}) => {

  const {
    shuffleCards,
    cards,
    disabled,
    handleChoice,
    turns,
    choiceOne,
    choiceTwo,
  } = useContext(GameContext)

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
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height: '100%',
  },
});
export default GameMain;
