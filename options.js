const input = document.getElementById("url");
const button = document.querySelector("button");

chrome.storage.local.get(["options"]).then(({ options }) => {
  input.value = options?.url ?? "";
});

button.addEventListener("click", async () => {
  try {
    await chrome.storage.local.set({ options: { url: input.value } });
  } catch (e) {
    console.log(e);
  }
});
