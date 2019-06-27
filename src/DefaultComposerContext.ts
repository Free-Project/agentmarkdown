import { HtmlNode } from "./HtmlNode"
import { filterNullChars } from "./util"
import { Composer } from "./Composer"
import { ComposerContext } from "./ComposerContext"
import {
  FallbackComposer,
  TextComposer,
  DivComposer,
  UlComposer,
  OlComposer,
  LiComposer,
  BrComposer,
  EmphasizeComposer,
  HeadingComposer
} from "./Composers"
import { StrikethroughComposer } from "./Composers/StrikethroughComposer"

const fallback: FallbackComposer = new FallbackComposer()
const nodeMap = new Map<string, Composer>([
  ["text", new TextComposer()],
  ["tag-div", new DivComposer()],
  ["tag-p", new DivComposer()],
  ["tag-ul", new UlComposer()],
  ["tag-ol", new OlComposer()],
  ["tag-li", new LiComposer()],
  ["tag-br", new BrComposer()],
  ["tag-em", new EmphasizeComposer("em")],
  ["tag-i", new EmphasizeComposer("i")],
  ["tag-b", new EmphasizeComposer("b")],
  ["tag-strong", new EmphasizeComposer("strong")],
  ["tag-u", new EmphasizeComposer("u")],
  ["tag-strike", new StrikethroughComposer("strike")],
  ["tag-del", new StrikethroughComposer("del")],
  ["tag-h1", new HeadingComposer("h1")],
  ["tag-h2", new HeadingComposer("h2")],
  ["tag-h3", new HeadingComposer("h3")],
  ["tag-h4", new HeadingComposer("h4")],
  ["tag-h5", new HeadingComposer("h5")],
  ["tag-h6", new HeadingComposer("h6")],
  ["tag-font", fallback],
  ["tag-span", fallback]
])

export class DefaultComposerContext extends ComposerContext {
  getComposerFor(node: HtmlNode) {
    const nodeName = filterNullChars(node.name)
    const nodeType = filterNullChars(node.type)
    let key: string = nodeName ? nodeType + "-" + nodeName : nodeType
    let result = nodeMap.get(key)
    if (!result) {
      if (process.env.TRACE_MISSING_COMPOSERS) {
        console.warn(
          `No composer for node key ${JSON.stringify({
            key
          })}. Fallack will be used.`
        )
      }
      return fallback
    }
    return result
  }
}
