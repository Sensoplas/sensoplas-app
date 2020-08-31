import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonFooter,
  IonSpinner,
} from "@ionic/react";
import React from "react";
import "./Scanner.css";
import { ProgressBar } from "../components/ProgressBar";

interface IProps {}

interface IState {
  isScanning: boolean;
  startedScanning: boolean;
  scanStartTime: number;
  time: number;
}

class Scanner extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.getButton = this.getButton.bind(this);
    this.startScan = this.startScan.bind(this);
    this.getHelperDiv = this.getHelperDiv.bind(this);
    this.getScannerTimerDiv = this.getScannerTimerDiv.bind(this);
    this.state = {
      isScanning: false,
      startedScanning: false,
      scanStartTime: 0,
      time: 0,
    };
  }

  startScan(): void {
    this.setState({
      isScanning: true,
      startedScanning: true,
      scanStartTime: Date.now(),
    });

    let timer = setInterval(() => {
      let now = Date.now();
      if (now - this.state.scanStartTime > 10e3) {
        clearInterval(timer);
        this.setState({ startedScanning: true, isScanning: false });
      }
      this.setState({ time: Date.now() });
    }, 100);
  }

  getButton(): JSX.Element {
    return this.state.isScanning ? (
      <IonButton id="scan-button" expand="block" size="large" shape="round">
        <IonSpinner />
      </IonButton>
    ) : (
      <IonButton
        id="scan-button"
        expand="block"
        size="large"
        shape="round"
        onClick={this.startScan}
      >
        Scan
      </IonButton>
    );
  }

  getHelperDiv(): JSX.Element {
    return (
      <div
        id="pre-scan-text"
        style={{
          textAlign: "center",
          marginTop: this.state.startedScanning ? "10%" : "80%",
        }}
      >
        <h2>Scanning for 10 seconds</h2>
      </div>
    );
  }

  getScannerTimerDiv(): JSX.Element {
    if (!this.state.startedScanning && !this.state.isScanning) {
      return <></>;
    } else {
      let progress = ((): number => {
        let took = this.state.time - this.state.scanStartTime;
        return took > 10e3 ? 1 : took / 10e3;
      })();

      return <ProgressBar text="Scanning" progress={progress} />;
    }
  }

  render(): JSX.Element {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>UV Scanner</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Welcome to the UV Scanner</IonTitle>
            </IonToolbar>
          </IonHeader>
          <this.getHelperDiv />
          <this.getScannerTimerDiv />
        </IonContent>

        <IonFooter>
          <this.getButton />
        </IonFooter>
      </IonPage>
    );
  }
}

export default Scanner;
