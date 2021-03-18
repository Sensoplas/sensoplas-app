import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonFooter,
  IonButton,
  IonSpinner,
  IonText,
  IonBadge,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useState } from "react";
import SpinnerDisplay, { DisplayState } from "../components/SpinnerDisplay";

interface UVCScanner {
  getUVCIntensity(lambda: number): Promise<number>;
}

type props = {
  scanner: UVCScanner;
};

const UVCPage: React.FC<props> = ({ scanner }) => {
  //   let [spinnerState, updateSpinnerState] = useState(DisplayState.Before);
  //   let [spinnerValue, updateSpinnerValue] = useState(-1);

  let [uvcIntensity, updateUVCIntensity] = useState(0);
  let [scanning, updateScanning] = useState(false);
  let [wavelength, updateWavelength] = useState(200);

  const handleClick = () => {
    updateScanning(true);
    scanner.getUVCIntensity(wavelength).then((x) => {
      updateUVCIntensity(x);
      updateScanning(false);
    });
  };

  const getUVCIntensityBadge = () => {
    let style = {
      fontSize: "2.5em",
    };

    if (uvcIntensity <= 1) {
      return (
        <IonBadge color="success" className="center" style={style}>
          Low Exposure
        </IonBadge>
      );
    } else if (uvcIntensity <= 5) {
      return (
        <IonBadge color="warning" className="center" style={style}>
          Moderate Exposure
        </IonBadge>
      );
    } else {
      return (
        <IonBadge color="danger" className="center" style={style}>
          High Exposure
        </IonBadge>
      );
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>UVC Scan</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <IonText
          className="center"
          color="primary"
          style={{
            paddingTop: "30%",
          }}
        >
          {uvcIntensity === 0 ? (
            <h3>Please hit scan to start</h3>
          ) : (
            <div>
              {getUVCIntensityBadge()}
              <h2 className="center">{`${uvcIntensity.toFixed(2)}`}</h2>
            </div>
          )}
        </IonText>
      </IonContent>

      <IonFooter>
        <IonSelect
          value={wavelength}
          okText="ok"
          cancelText="dismiss"
          onIonChange={(e) => updateWavelength(e.detail.value)}
        >
          <IonSelectOption value={200}>200nm</IonSelectOption>
          <IonSelectOption value={210}>210nm</IonSelectOption>
          <IonSelectOption value={220}>220nm</IonSelectOption>
          <IonSelectOption value={230}>230nm</IonSelectOption>
          <IonSelectOption value={240}>240nm</IonSelectOption>
        </IonSelect>

        <IonButton
          className="scan-button"
          expand="block"
          size="large"
          onClick={handleClick}
        >
          {scanning ? (
            <IonSpinner name="crescent" duration={1200}></IonSpinner>
          ) : (
            "Scan"
          )}
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default UVCPage;
