/**
 * @description audio render html
 * @author quanyihang
 */
import { h } from "snabbdom";
import { DomEditor } from "@wangeditor/editor";
/**
 *
 * @param {SlateElement} elemNode
 * @param {VNode[] | null} children
 * @param {IDomEditor} editor
 * @returns
 */
function renderAudioElement(elemNode, children, editor) {
  console.log("elemNode ", elemNode, children);
  const selected = DomEditor.isNodeSelected(editor, elemNode);
  const { src = "", width = "300", height = "54" } = elemNode;

  const audioVnode = h(
    "audio", // html标签
    {
      props: {
        src: src,
        contentEditable: false,
        controls: true,
      },
      style: {
        width: width + "px",
        height: height + "px",
        "max-width": "100%", // 这里之所以要写死，是为了实现宽度自适应的。如果直接设置width：100%，会触发报错。所以想要实现width：100%效果，需要先设置max-width，然后在给width设置一个离谱的值，比如说100000.
      },
    }
  );

  const vnode = h(
    "div",
    {
      props: {
        className: "w-e-textarea-video-container", // 这里直接复用video的效果
        "data-selected": selected ? "true" : "",
      },
    },
    audioVnode
  );
  const containerVnode = h(
    "div",
    {
      props: {
        contentEditable: false,
      },
      on: {
        mousedown: (e) => e.preventDefault(),
      },
    },
    vnode
  );

  return containerVnode;
}

const renderAudioConf = {
  type: "audio",
  renderElem: renderAudioElement,
};
export { renderAudioConf };
