import axios from "axios";
import { time } from "console";
import firebase from "firebase";

export default class RemoteGetter {
  constructor(private host: string, private auth: firebase.auth.Auth) {}

  public async getSVG(width: number, height: number): Promise<string> {
    if (this.auth.currentUser === null) {
      throw "current user is not identified";
    }
    let token = await this.auth.currentUser.getIdToken();
    let res = await axios.get(
      `${this.host}/trend?width=${width}&height=${height}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status != 200) {
      console.log(
        `remote api request returned ${res.status} with error: ${res.data.err}`
      );
    }
    return res.data;
  }
}
