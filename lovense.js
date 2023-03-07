const toys = document.getElementById("toys");

let basicSdkInstance;

fetch("https://valentine.luneko.dev/get_token").then(data => { return data.json() }).then(res => {
    //console.log(res);
    basicSdkInstance = new LovenseBasicSdk({
        platform: "Lovense Bot",
        authToken: res.authToken,
        uid: (Math.random() + 1).toString(36).substring(7),
        //debug: true
    })
    basicSdkInstance.on('ready', async instance => {
        //console.log('ready')
        try {
            const codeRes = await instance.getQrcode()
            //console.log(codeRes)
            let code = document.createElement("img");
            code.src = codeRes.qrcodeUrl;
            toys.appendChild(code);
        } catch (e) {
            console.error(e.message)
        }
    })
})