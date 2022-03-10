<script>
    let url = ""

    async function getUrl() {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      url = tab.url
    }
</script>

<style lang="scss">
  button {
    border: none;
    padding: 0.8em 2em;
    font-size: 1.4em;
    border-radius: 0.4rem;
    cursor: pointer;

    &:hover {
      background-color: #ccc;
    }
  }

  #popup-window {
    box-sizing: border-box;
    padding: 8px;
    max-width: 300px;
    max-height: 300px;
    min-width: 200px;
    min-height: 150px;
    resize: vertical;
    overflow: auto;
  }
</style>

<div id="popup-window" style="width: 400px;height: 500px">
    <button on:click={getUrl}>Reveal Current URL</button>

    <div>The current URL is: {url}</div>

    <p>note: run the "dev:extension" script for HOT reloading.</p>
</div>
