import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { rejects } from 'assert';
import { ENGINE_METHOD_CIPHERS } from 'constants';
import { resolve } from 'url';
import { ServerMAC } from "./BTConfig.json"



export default class BleGetter {
    private connectionStatus: boolean;
    private bluetoothSerial: BluetoothSerial;
    private macAddress: string;
    constructor() {
        this.bluetoothSerial = new BluetoothSerial()
        this.connectionStatus = false;
        this.macAddress = ServerMAC
    }

    public async testing(): Promise<boolean>{
        let _this = this
        return new Promise(async function (resolve, reject){
            resolve(await _this.isEnabled())
        })
    }

    public async getABData(): Promise<string> {
        await this.establishCommunication()
        await this.write('ab')
        await this.delay(35000)
        return (await this.read())
    }

    public async getUVCData(): Promise<string> {
        await this.establishCommunication()
        await this.write('c')
        await this.delay(35000)
        return (await this.read())
    }

    private async establishCommunication(): Promise<boolean>{
        let _this = this
        return new Promise(async function (resolve, reject) {
            if (await _this.makeConnection()){
                await _this.delay(250)
                let r = await _this.read()
                if (r.trim() === 'awk'){
                    resolve(true)
                } else {
                    reject(false)
                }
            }
        })
    }

    private async makeConnection(): Promise<boolean>{
        let _this = this
        return new Promise(async function (resolve, reject) {
            if (await _this.isEnabled()) { 
                if (await _this.connect()) {resolve(true)}
                else {resolve(false)}
                
            } else {resolve(false)}
        })
    }

    private async read(): Promise<string>{
        let _this = this
        return new Promise(async function (resolve, reject) {
            _this.bluetoothSerial.read(
                //@ts-ignore
                //intellisense is lying The callback functions aren't included in the typings
                (data)=>{
                    _this.bluetoothSerial.clear()
                    resolve(data)
                }, 
                ()=>{
                    reject(false)
                }
            );
        })
    }

    private async write(msg: string): Promise<boolean>{
        let _this = this
        return new Promise(function (resolve, reject) {
            _this.bluetoothSerial.write(msg, 
                //@ts-ignore 
                //Programmers are always right
                ()=>{resolve(true)}, 
                ()=>{reject(false)})
        })
    }

    private async isEnabled(): Promise<boolean> {
        let _this = this
        return new Promise(function (resolve, reject) {
            
            _this.bluetoothSerial.isEnabled(
                //@ts-ignore
                //We are smarter than the people who wrote assembly
            () => {
                resolve(true)
            }, 
            () => {
                resolve(false)
            })

        })
    }

    private async connect(): Promise<boolean>{
        let _this = this;
        return new Promise(function (resolve, reject) {
            _this.bluetoothSerial.connect(_this.macAddress).subscribe(
                (x) => { //When a byte is returned. We don't actually care what it returned it's just nice to know it's trying its best
                    _this.connectionStatus = true;
                    resolve(true);
                },
                (err) => {  //Failed read, maybe it was a unexpected disconnect maybe it was a small to medium sized explosion, (which i guess would cause an unexpected disconnect). 
                            //If it wasn't clear, this is bad
                    _this.connectionStatus = false;
                    console.error("Failed to establish Connection");
                    reject(false);
                },
                () => { //When the stream is ended (this is totally fine)
                    _this.connectionStatus = true;
                    resolve(true);
                }
            );
        })
    }

    private delay(ms: number){ 
        return new Promise( resolve => setTimeout(resolve, ms) );
    };
};
