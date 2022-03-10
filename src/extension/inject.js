import * as postcss from 'postcss'

// fetch and expand all imports for external CSS to get around CORS
const getCssWithExpandedImports = css => {
    return new Promise(resolve => {
        const root = postcss.parse(css)
        const urls = []

        const promises = urls.map(url => {
            return new Promise(urlResolve => {
                const message = {
                    name: 'GetImportCss',
                    url,
                }
                chrome.runtime.sendMessage(message, response => {
                    urlResolve(response)
                })
            })
        })

        root.walkAtRules('import', (atRule) => {
          const regex = /^(url\()?([^\)]*)(\))?$/
          const paramsWithoutQuotes = atRule.params
              .replace(/"/g, '')
              .replace(/\'/g, '')
          const matches = paramsWithoutQuotes.match(regex)
          if (matches) {
              urls.push(matches[2])
              atRule.remove()
          }
        })

        let output = root.toString()

        Promise.all(promises).then((values) => {
            const merged = values.join('\n\n')
            if (merged) {
                output = `${merged}\n\n${output}`
            }
            resolve(output)
        })
    })
}
//# sourceMappingURL=import.js.map
