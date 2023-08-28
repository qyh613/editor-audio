/**
 * @description audio plugin reuse wangeditor video plugin
 * @author quanyihang
 */

import { DomEditor } from "@wangeditor/editor";
import { Transforms } from "slate";

function withAudio(editor) {
  const { isVoid, normalizeNode } = editor;
  const newEditor = editor;

  // 重写 isVoid
  newEditor.isVoid = (elem) => {
    const { type } = elem;

    if (type === "audio") {
      return true;
    }

    return isVoid(elem);
  };

  // 重写 normalizeNode
  newEditor.normalizeNode = ([node, path]) => {
    const type = DomEditor.getNodeType(node);

    // ----------------- audio 后面必须跟一个 p header blockquote -----------------
    if (type === "audio") {
      // -------------- audio 是 editor 最后一个节点，需要后面插入 p --------------
      const isLast = DomEditor.isLastNode(newEditor, node);
      if (isLast) {
        Transforms.insertNodes(newEditor, DomEditor.genEmptyParagraph(), {
          at: [path[0] + 1],
        });
      }
    }

    // 执行默认的 normalizeNode ，重要！！！
    return normalizeNode([node, path]);
  };

  // 返回 editor ，重要！
  return newEditor;
}
export default withAudio;
