import fs from 'fs'
import {execSync} from "child_process";
import {startCharging, stopCharging} from "./smarthome.js";
import {getBatteryPercent} from "./battery.js";

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
const finished = false

async function checkStatusCycle() {
    let percent = (await getBatteryPercent()).percent
    console.log(`[⚡] Battery level is at ${percent}%`)
    if (percent < 90) {
        setTimeout(checkStatusCycle, 10000)
    }
    else {
        setTimeout(function () {
            console.log(`[✅] Charging is finished at ${percent}%`)
            stopCharging(config.username, config.token, config['serverUrl']).then(function () {
                shutdownDevice()
            })
        }, 3000)
    }
}

async function shutdownDevice() {
    const out = await execSync('poweroff')
}

async function start() {
    if ((await getBatteryPercent()).percent >= 90) {
        console.log('[X] It seems like your device is already > 90% charged.\nUsing another charging cycle is not recommended since it will stop instantly.')
        return
    }
    startCharging(60000, config.username, config.token, config['serverUrl']).then(async function () {
        if ((await getBatteryPercent()).charging) {
            console.log('[⚡] Charging has started')
        } else {
            console.log('[X] The device is not charging.')
        }
    })
    checkStatusCycle().then()
}

start().then(function () {
    console.log('Program finished.')
})



