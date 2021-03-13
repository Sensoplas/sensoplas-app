export default class MockUVIGetter {
    public getUVIndex(): Promise<number>{
        return Promise.resolve(Math.random() * 30.0)
    }
}