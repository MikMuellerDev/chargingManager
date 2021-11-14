import fs from 'fs'
import {startCharging, stopCharging} from "./smarthome.js";
import {getBatteryPercent} from "./battery.js";

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
const finished = false

async function checkStatusCycle() {
    let percent = await getBatteryPercent()
    console.log(`[⚡] Battery level is at ${percent}%`)
    if (percent < 90) {
        await setTimeout(checkStatusCycle, 10000)
    }
    else {
        setTimeout(function () {
            console.log(`[✅] Charging is finished at ${getBatteryPercent()}%`)
            stopCharging(config.username, config.token, config['serverUrl']).then(function () {
                console.log('Started Charging')
            })
        }, 3000)
    }
}

function start() {
    if (getBatteryPercent() >= 90) {
        console.log('[🚫] It seems like your device is already > 90% charged.\nUsing another charging cycle is not recommended since it will stop instantly.')
        return
    }
    startCharging(60000, config.username, config.token, config['serverUrl']).then(function () {
        console.log('[⚡] Charging has started')
    })
    checkStatusCycle().then()
}

start()



