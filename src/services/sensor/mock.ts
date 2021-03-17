export default class MockSensorDataGetter {
  public getABData(): Promise<string> {
    return Promise.resolve("bleh");
  }

  public getUVCData(): Promise<string> {
    return Promise.resolve("bleh");
  }
}
