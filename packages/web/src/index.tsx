import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {AppRegistry, Platform, View} from 'react-native';
import "./index.css";
// import { App } from "@anilist-fe/app";
import reportWebVitals from "./reportWebVitals";
import {subplatform} from "@anilist-fe/app/src/config";

import Navigator from "./routes";
import {GameContextProvider} from "@anilist-fe/app/src/hooks/GameContextProvider";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

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
