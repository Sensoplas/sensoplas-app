import axios from "axios";
import firebase from "firebase";

export interface SensorDataSource {
  getData(): Promise<string>;
}

type APIResponse = {
  prediction: number;
  err: string;
};

export default class RemoteGetter {
  constructor(
    private host: string,
    private auth: firebase.auth.Auth,
    private dataSource: SensorDataSource
  ) {}

  public async getUVIndex(): Promise<number> {
    let data = await this.dataSource.getData();
    if (this.auth.currentUser === null) {
      throw "current user is not identified";
    }

    let token = await this.auth.currentUser.getIdToken();
    let res = await axios.post<APIResponse>(
      `${this.host}/uvi-prediction`,
      { data },
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
    return res.data.prediction;
  }
}
