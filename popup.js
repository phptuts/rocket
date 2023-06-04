const button = document.querySelector("button");
const h2 = document.querySelector("h2");
let isTakingOff = false;
let intervalId;
let countDown = 5;

async function startCountDown() {
    if (countDown == 0) {
        h2.textContent = "TAKE OFF!";
        clearInterval(intervalId);
        const [activeTab] = await chrome.tabs.query({ active: true });
        const replyMessage =  await chrome.tabs.sendMessage(activeTab.id, {
            'type': 'takeoff'
        });
        console.log(replyMessage, 'replyMessage')
        setTimeout(() => {
            isTakingOff = false;
            countDown = 5;
            h2.textContent = countDown;
        }, 3000);
        return;
    }
    countDown -= 1;
    h2.textContent = countDown;
}

async function onBlastOff() {
    const [activeTab] = await chrome.tabs.query({ active: true });
    const replyMessage =  await chrome.tabs.sendMessage(activeTab.id, {
        'type': 'takeoff'
    });
    return

    if (isTakingOff) {
        return;
    }
    isTakingOff = true;
    intervalId = setInterval(startCountDown, 1000);
}


button.addEventListener('click', onBlastOff);