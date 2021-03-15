import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import SVG from "react-inlinesvg";

interface TrendSVGGetter {
  getSVG(width: number, height: number): Promise<string>;
}

type props = {
  getter: TrendSVGGetter;
};

const TrendPage: React.FC<props> = ({ getter }) => {
  let [img, updateImg] = useState("");

  let { innerWidth: width, innerHeight: height } = window;

  useEffect(() => {
    getter
      .getSVG(Math.floor(width * 0.9), Math.floor(height * 0.5))
      .then((x) => updateImg(x));
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Exposure Trending</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <SVG
          src={img}
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignSelf: "center",
            alignItems: "center",
            paddingLeft: "5%",
            paddingTop: "20%",
          }}
        ></SVG>
      </div>
    </IonPage>
  );
};

export default TrendPage;
