import {execSync} from "child_process";

export async function getBatteryPercent() {
    try {
        const out = await execSync(`upower -i /org/freedesktop/UPower/devices/battery_BAT0 | grep -E "state|to\\ full|percentage"`)
        const response = out.toString("utf8")
        const batteryStatus = (response.split('\n')[0].split(':')[1].replaceAll(' ', ''))
        if (batteryStatus === 'charging') {
            return {'percent': parseInt(response.split('\n')[2].split(':')[1].replace('%', '').replaceAll(' ', '')), 'charging': true}
        } else {
            return {'percent': parseInt(response.split('\n')[1].split(':')[1].replace('%', '').replaceAll(' ', '')), 'charging': false}
        }
    } catch (err) {
        // console.error(err)
        return 0, false
    }
}