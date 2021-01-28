import {
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import firebase from "firebase";
import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import goose from "../asserts/img/goose.jpg";
import "./LoginPage.css";

type LoginPageProps = {
  conf: firebaseui.auth.Config;
};

const LoginPage: React.FC<LoginPageProps> = ({ conf }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">SensoPlas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid fixed>
          <IonRow className="img">
            <IonCol className="img">
              <IonImg className="goose" src={goose} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter className="ion-no-border">
        <StyledFirebaseAuth
          uiConfig={conf}
          firebaseAuth={firebase.auth()}
        ></StyledFirebaseAuth>
      </IonFooter>
    </IonPage>
  );
};

export default LoginPage;
