import Menu from "./components/Menu";
import LoginPage from "./components/LoginPage";
import ScanPage from "./pages/Scan";
import UVCPage from "./pages/UVC";
import React, { useEffect, useState } from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, useHistory } from "react-router-dom";
import MockUVIGetter from "./services/uviservice/mock";
import RemoteGetter from "./services/uviservice/http";
import MockGetter from "./services/sensor/mock";
import BTGetter from "./services/sensor/btadaptor";
import RemoteTrendGetter from "./services/trend/http";
import { Plugins } from "@capacitor/core";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import firebase from "firebase";

// Firebase Configuration Snippet
import config from "./.firebase.conf.json";
import TrendPage from "./pages/Trend";

// Bluetooth config
import { ServerMAC } from "./.bluetooth.conf.json";

const { App: CapApp } = Plugins;

firebase.initializeApp(config);

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInSuccessfulUrl: "https://sensoplas.web.app/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const mockUVGetter = new MockUVIGetter();

  const remoteUVIGetter = new RemoteGetter(
    "https://sensoplas.web.app/api",
    firebase.auth(),
    new MockGetter()
    // new BTGetter(ServerMAC)
  );

  const remoteTrendGetter = new RemoteTrendGetter(
    "https://sensoplas.web.app/api",
    firebase.auth()
  );

  let content = isSignedIn ? (
    <IonSplitPane contentId="main">
      <Menu />
      <IonRouterOutlet id="main">
        <Route
          path="/page/Scan"
          component={() => <ScanPage scanner={remoteUVIGetter} />}
          exact
        />
        <Route
          path="/page/Trend"
          component={() => <TrendPage getter={remoteTrendGetter} />}
        ></Route>
        <Route
          path="/page/UVC"
          component={() => <UVCPage scanner={mockUVGetter} />}
        ></Route>
        <Redirect from="/" to="/page/Scan" exact />
      </IonRouterOutlet>
    </IonSplitPane>
  ) : (
    <LoginPage conf={uiConfig}></LoginPage>
  );

  return (
    <IonApp>
      <IonReactRouter>
        <AppUrlListener></AppUrlListener>
        {content}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

const AppUrlListener: React.FC<any> = () => {
  let history = useHistory();
  useEffect(() => {
    CapApp.addListener("appUrlOpen", (data: any) => {
      // Example url: https://beerswift.app/tabs/tab2
      // slug = /tabs/tab2
      const slug = data.url.split(".app").pop();
      if (slug) {
        history.push(slug);
      }
      // If no match, do nothing - let regular routing
      // logic take over
    });
  }, []);

  return null;
};
