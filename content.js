chrome.runtime.onMessage.addListener(async (message, sender, reply) => {
  reply("ok");
  try {
    const { options } = await chrome.storage.local.get(["options"]);
    console.log(options);
    const url = options?.url ?? "";
    fireImage(url, 200);
    setTimeout(() => {
      fireImage(url, 400);
    }, 300);
    setTimeout(() => {
      fireImage(url, 600);
    }, 500);
  } catch (e) {
    console.log(e);
  }

  // const url = 'https://i.ebayimg.com/images/g/i7oAAOSwgD9ifpPx/s-l500.jpg';
});

function fireImage(url, startX) {
  console.log(url);
  const img = document.createElement("img");
  img.src = url;
  img.style.width = "100px";
  img.style.height = "100px";
  img.style.position = "absolute";
  img.style.zIndex = 10000;
  document.body.append(img);
  let x = startX;
  let y = window.screen.height;
  let intervalId = setInterval(() => {
    img.style.left = x + "px";
    img.style.top = y + "px";
    y -= 5;
    x += 2;
    console.log(y, "y");
    if (y < -500) {
      clearInterval(intervalId);
      img.remove();
    }
  }, 5);
}
