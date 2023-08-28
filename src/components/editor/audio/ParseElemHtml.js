/**
 * @description parse element html
 * @author quanyihang
 */

/**
 *
 * @param {Element} domElem
 * @param {SlateDescendant[]} [children]
 * @param {IDomEditor} [editor]
 * @returns {SlateElement}
 */
function parseAudioElementHtml(domElem) {
  const src = domElem.getAttribute("data-src"); // 这些就是ElemToHtml.js自定义扩展存放的地方，可以根据需要自行扩展
  const height = domElem.getAttribute("data-height");
  const width = domElem.getAttribute("data-width");
  const myAudio = {
    type: "audio",
    src,
    width,
    height,
    children: [{ text: "" }],
  };
  return myAudio;
}
const parseAudioHtmlConf = {
  selector: 'div[data-w-e-type="audio"]', // 这个就是这些就是ElemToHtml.js中第一个div里包含的信息
  parseElemHtml: parseAudioElementHtml,
};

export { parseAudioHtmlConf };
