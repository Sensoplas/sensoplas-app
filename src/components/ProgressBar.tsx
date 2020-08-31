import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonProgressBar,
} from "@ionic/react";

import React from "react";
import { useLocation } from "react-router-dom";
import {
  bookmarkOutline,
  mailOutline,
  mailSharp,
  barcodeOutline,
  barcodeSharp,
} from "ionicons/icons";
import "./ProgressBar.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Scanner",
    url: "/page/Scanner",
    iosIcon: barcodeOutline,
    mdIcon: barcodeSharp,
  },
  {
    title: "Inbox",
    url: "/page/Inbox",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
];

interface IProps {
  text: string;
  progress: number;
}

export class ProgressBar extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    let progressString =
      this.props.progress >= 1
        ? "100%"
        : `${(this.props.progress * 100).toFixed(0)}%`;
    return (
      <div
        className="progress-bar"
        style={{
          padding: "2em",
          textAlign: "center",
        }}
      >
        <h3 className="progress-bar-text">{`${this.props.text} -- ${progressString}`}</h3>
        <IonProgressBar value={this.props.progress}></IonProgressBar>
      </div>
    );
  }
}
