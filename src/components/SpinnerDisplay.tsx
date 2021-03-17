import {
  IonBadge,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonList,
  IonRow,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { Box } from "@material-ui/core";
import React from "react";
import "./SpinnerDisplay.css";
import getAdvice from "../services/uviservice/advice";

export enum DisplayState {
  Before,
  During,
  After,
}

type SpinnerDisplayProps = {
  state: DisplayState;
  value?: number;
  className?: string;
};

const SpinnerDisplay: React.FC<SpinnerDisplayProps> = ({
  state,
  value,
  className,
}) => {
  switch (state) {
    case DisplayState.Before:
      return (
        <IonContent scrollY={false} className={`${className} spinner-display`}>
          <IonText
            color="primary"
            className={`${className} spinner-display nocol`}
          >
            <h3>Wristband Connected, Click button to start scanning</h3>
          </IonText>
        </IonContent>
      );
    case DisplayState.During:
      return (
        <IonContent scrollY={false} className={`${className} spinner-display`}>
          <IonGrid className={`${className} spinner-display`}>
            <IonRow className={`${className} spinner-display`}>
              <IonCol className={`${className} spinner-display`}>
                <IonSpinner
                  className={`${className} spinner-display large`}
                  name="crescent"
                  duration={1200}
                  color="secondary"
                ></IonSpinner>
              </IonCol>
            </IonRow>
            <IonRow className={`${className} spinner-display`}>
              <IonCol className={`${className} spinner-display`}>
                <IonText
                  color="primary"
                  className={`${className} spinner-display`}
                >
                  <h1>Scanning...</h1>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      );
    case DisplayState.After:
      if (!value) {
        return <IonText color="danger">Something went wrong</IonText>;
      }
      return (
        <div>
          <div className="center spinner-display uvi">
            <Box
              css={{
                alignContent: "center",
                width: "fit-content",
                // display: "flex",
                alignSelf: "center",
                height: "fit-content",
                alignItems: "center",
              }}
            >
              <IonBadge
                className={`${className} spinner-display`}
                color={((): string => {
                  if (value <= 4) {
                    return "success";
                  } else if (value > 4 && value <= 8) {
                    return "warning";
                  } else {
                    return "danger";
                  }
                })()}
              >
                UVI: {Math.round(value * 2) / 2}
              </IonBadge>
            </Box>
          </div>
          <IonList className={`${className} spinner-display`}>
            {getAdvice(value).map((x, index) => (
              <IonItem key={index}>
                <IonText>
                  <p>{x}</p>
                </IonText>
              </IonItem>
            ))}
          </IonList>
        </div>
      );
  }
};

export default SpinnerDisplay;
