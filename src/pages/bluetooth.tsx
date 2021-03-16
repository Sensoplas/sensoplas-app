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
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import "./bluetooth.css";
import { blue } from "@material-ui/core/colors";

interface bleGetter {
  getABData(): Promise<String>
  getUVCData(): Promise<string>  
}

type props = {
  bluetoothRetrieve: bleGetter;
};



const BluetoothPage: React.FC<props> = ({ bluetoothRetrieve }) => {
  //let [spinnerState, updateSpinnerState] = useState(DisplayState.Before);
  //let [spinnerValue, updateSpinnerValue] = useState(-1);

  const handleClick = async () => {
    let dataAB =  bluetoothRetrieve.getABData() //THIS will take ~35 seconds to finish running
    let dataUVC = bluetoothRetrieve.getUVCData() //THIS will also take ~35 seconds to finish running
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Bluetooth Get</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <h1>Testing</h1>
      </IonContent>

      <IonFooter>
        <IonButton
          className="bluetooth-button"
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

export default BluetoothPage;
