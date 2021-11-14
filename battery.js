import {execSync} from "child_process";

export async function getBatteryPercent() {
    try {
        const out = await execSync(`upower -i /org/freedesktop/UPower/devices/battery_BAT0 | grep -E "state|to\\ full|percentage"`)
        const response = out.toString("utf8")
        console.log(response)
    } catch (err) {
        console.error(err)
        return false
    }
}