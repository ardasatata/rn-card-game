import React from "react";
import {
  Platform,
  StyleSheet,
  View,
} from "react-native";

import Navigator from "./routes";
import {GameContextProvider} from "./hooks/GameContextProvider";

export function App(): JSX.Element {
  return (
    <View style={styles.root}>
      <GameContextProvider>
        <Navigator/>
      </GameContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: Platform.OS === 'web' ? '100vh' : '100%'
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: "600",
  },
  platformRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  platformValue: {
    fontSize: 28,
    fontWeight: "500",
  },
  platformBackground: {
    backgroundColor: "#ececec",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d4d4d4",
    paddingHorizontal: 6,
    borderRadius: 6,
    alignItems: "center",
  }
});
