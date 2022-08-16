import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {AppRegistry, View} from 'react-native';
import "./index.css";

import Navigator from "./routes";
import {GameContextProvider} from "@anilist-fe/app/src/hooks/GameContextProvider";

export function App(): JSX.Element {
  return (
    <View style={{height: '100vh'}}>
      <GameContextProvider>
        <Navigator/>
      </GameContextProvider>
    </View>
  );
}

AppRegistry.registerComponent('main', () => App);
AppRegistry.runApplication('main', {
  rootTag: document.getElementById('root'),
});
