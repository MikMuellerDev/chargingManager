import axios from "axios";

export async function startCharging(minutes, user, token, url) {
    const params = new URLSearchParams();
    params.append('minutes', minutes);
    params.append('username', user);
    params.append('token', token);

    await axios.post(`${url}/api/startCharger`, params
    ).then(res => {
        console.log('[✅] Response from Smarthome: ] ' + res.status)
    }).catch(error => {
        console.log(`[❌] Error occurred: , ${error}`)
    })
}

export async function stopCharging(user, token, url) {
    const params = new URLSearchParams();
    params.append('username', user);
    params.append('token', token);

    await axios.post(`${url}/api/stopCharger`, params
    ).then(res => {
        console.log('[✅] Response from Smarthome: ] ' + res.status)
    }).catch(error => {
        console.log(`[❌] Error occurred: , ${error}`)
    })
}