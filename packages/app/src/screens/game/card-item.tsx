import React, {useEffect, useRef} from "react";
import {Animated, StyleSheet, TouchableOpacity} from "react-native";
import {color, layout, roundness, spacing} from "../../styles";
import {Text} from "../../components/text/text";
import {CardItemType} from "../../type";

export const ANIMATION_DURATION = 500

export type CardItemProps = {
  card: CardItemType,
  handleChoice(card: CardItemType): void,
  flipped: boolean,
  disabled: boolean
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CardItem:React.FC<CardItemProps> = ({ card, handleChoice, flipped, disabled }) => {

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

  const flipCard = (flipped: boolean) => {
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
  }

  useEffect(()=>{
    flipCard(flipped)
  },[flipped])

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
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