export default class MockUVIGetter {
  public getUVIndex(): Promise<number> {
    return Promise.resolve(Math.random() * 30.0);
  }

  public async getUVCIntensity(lambda: number): Promise<number> {
    await delay(1000);
    return Math.random() * 30.0;
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
