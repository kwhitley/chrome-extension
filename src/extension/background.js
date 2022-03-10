chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const { status } = changeInfo
  const [{ url }] = await chrome.tabs.query({ active: true, currentWindow: true })

  if (status === 'complete') {
    // chrome.scripting.insertCSS({
    //   target: { tabId: tab.id },
    //   css: await getCSS(url),
    // })
    alert(`tab switched to ${url}`)
  }
})
