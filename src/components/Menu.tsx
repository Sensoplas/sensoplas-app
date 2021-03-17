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
} from "@ionic/react";
import firebase from "firebase";
import {
  analyticsOutline,
  analyticsSharp,
  logOutOutline,
  logOutSharp,
  radioOutline,
  radioSharp,
} from "ionicons/icons";
import React from "react";
import { useLocation } from "react-router-dom";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Scan",
    url: "/page/Scan",
    iosIcon: radioOutline,
    mdIcon: radioSharp,
  },
  {
    title: "Trend",
    url: "/page/Trend",
    iosIcon: analyticsOutline,
    mdIcon: analyticsSharp,
  },
  {
    title: "Bluetooth Testing",
    url: "/page/bluetooth",
    iosIcon: analyticsOutline,
    mdIcon: analyticsSharp,
  },
  // {
  //   title: "Favorites",
  //   url: "/page/Favorites",
  //   iosIcon: heartOutline,
  //   mdIcon: heartSharp,
  // },
  // {
  //   title: "Archived",
  //   url: "/page/Archived",
  //   iosIcon: archiveOutline,
  //   mdIcon: archiveSharp,
  // },
  // {
  //   title: "Trash",
  //   url: "/page/Trash",
  //   iosIcon: trashOutline,
  //   mdIcon: trashSharp,
  // },
  // {
  //   title: "Spam",
  //   url: "/page/Spam",
  //   iosIcon: warningOutline,
  //   mdIcon: warningSharp,
  // },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>SensoPlas</IonListHeader>
          <IonNote>Hi, {firebase.auth().currentUser?.displayName}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonMenuToggle autoHide={false}>
            <IonItem
              className=""
              lines="none"
              detail={false}
              onClick={() => firebase.auth().signOut()}
              routerLink="/"
            >
              <IonIcon slot="start" ios={logOutOutline} md={logOutSharp} />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>

        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
