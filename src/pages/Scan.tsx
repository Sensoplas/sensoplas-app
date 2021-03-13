import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import SpinnerDisplay, { DisplayState } from "../components/SpinnerDisplay";
import "./Scan.css";

interface UVIScanner {
  getUVIndex(): Promise<number>;
}

type props = {
  scanner: UVIScanner;
};

const ScanPage: React.FC<props> = ({ scanner }) => {
  let [spinnerState, updateSpinnerState] = useState(DisplayState.Before);
  let [spinnerValue, updateSpinnerValue] = useState(-1);
  const handleClick = () => {
    if (
      spinnerState === DisplayState.Before ||
      spinnerState === DisplayState.After
    ) {
      updateSpinnerState(DisplayState.During);
      scanner.getUVIndex().then((x) => {
        updateSpinnerValue(x);
        updateSpinnerState(DisplayState.After);
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>UVI Scan</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollY={false}>
        <SpinnerDisplay
          state={spinnerState}
          value={spinnerValue}
          className="spinner"
        ></SpinnerDisplay>
      </IonContent>

      <IonFooter>
        <IonButton
          className="scan-button"
          expand="block"
          size="large"
          onClick={handleClick}
        >
          Scan
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default ScanPage;
