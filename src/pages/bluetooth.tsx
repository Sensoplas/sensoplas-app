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
  getABData(): Promise<string>
  getUVCData(): Promise<string>
  testing(): Promise<boolean>  
}

type props = {
  bluetoothRetrieve: bleGetter;
};

const BluetoothPage: React.FC<props> = ({ bluetoothRetrieve }) => {
  //let [spinnerState, updateSpinnerState] = useState(DisplayState.Before);
  //let [spinnerValue, updateSpinnerValue] = useState(-1);

  const handleClick = async () => {
    //console.log(bluetoothRetrieve.testing())
    let dataAB =  await bluetoothRetrieve.getABData() //THIS will take ~35 seconds to finish running
    console.log(dataAB)
    //let dataUVC = await bluetoothRetrieve.getUVCData() //THIS will also take ~35 seconds to finish running
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
