const button = document.querySelector("button");
const h2 = document.querySelector("h2");
let isTakingOff = false;
let intervalId;
let countDown = 5;
async function onBlastOff() {
  try {
    const [activeTab] = await chrome.tabs.query({ active: true });
    const replyMessage = await chrome.tabs.sendMessage(activeTab.id, {
      type: "takeoff",
    });
  } catch (e) {
    console.log(e, "error");
  }
  return;

  if (isTakingOff) {
    return;
  }
  isTakingOff = true;
  intervalId = setInterval(startCountDown, 1000);
}

async function startCountDown() {
  if (countDown == 0) {
    h2.textContent = "TAKE OFF!";
    clearInterval(intervalId);
    const [activeTab] = await chrome.tabs.query({ active: true });
    const replyMessage = await chrome.tabs.sendMessage(activeTab.id, {
      type: "takeoff",
    });
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

button.addEventListener("click", onBlastOff);
