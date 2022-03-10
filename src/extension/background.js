const sites = {}

const getCSS = async path => {
  const { hostname } = new URL(path)
  const css = sites[hostname] || 'html * { background-color: pink; }'

  return css
          .replace(/;/g, ' !important;')
          .replace(/\n([\.\w#])/g, 'html $1')
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const { status } = changeInfo
  const [{ url }] = await chrome.tabs.query({ active: true, currentWindow: true })

  if (status === 'complete') {
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      css: await getCSS(url),
    })
  }
})
