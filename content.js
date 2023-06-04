chrome.runtime.onMessage.addListener(function(message, sender, reply) {
    reply('ok');
   const url = 'https://i.ebayimg.com/images/g/i7oAAOSwgD9ifpPx/s-l500.jpg';
    fireImage(url, 200);
    setTimeout(() => {
       fireImage(url, 400);
    }, 300)
    setTimeout(() => {
        fireImage(url, 600)
    }, 500)
 });

 function fireImage(url, startX)
 {
    console.log(url);
    const img = document.createElement('img');
    img.src = url;
    img.style.width = '100px';
    img.style.height = '100px';
    img.style.position = 'absolute';
    img.style.zIndex = 10000;
    document.body.append(img);
    let x = startX;
    let y = window.screen.height;
    let intervalId = setInterval(() => {
         img.style.left = x + 'px';
         img.style.top = y + 'px';
         y -= 5;
         x += 2;
         console.log(y, 'y');
         if (y < -500) {
             clearInterval(intervalId);
             img.remove();
         }
    }, 5);
 }