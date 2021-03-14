export default class MockSensorDataGetter {
  public getData(): Promise<string> {
    return Promise.resolve("bleh");
  }
}
