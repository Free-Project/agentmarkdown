import { toMarkdown } from "../support"

it.skip("CommonMark ALL", async () => {
  const commonMark = require("../test-data/spec.commonmark.v0.29.json") // eslint-disable-line @typescript-eslint/no-var-requires
  for (const test of commonMark) {
    const md = toMarkdown(test.html)
    expect(md).resolves.toEqual(test.markdown)
  }
})

describe.skip("https://spec.commonmark.org/0.29/#thematic-breaks", () => {
  it("https://spec.commonmark.org/0.29/#example-13", async () => {
    const html = `<hr />`
    const expected = `---`

    const md = await toMarkdown(html)
    expect(md).toEqual(expected)
  })
})
