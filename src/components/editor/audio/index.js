/**
 * @description audio plugin module before create editor
 * @author quanyihang
 */

import { Boot } from "@wangeditor/editor";
import { renderAudioConf } from "./RenderElem";
import { audioToHtmlConf } from "./ElemToHtml";
import { parseAudioHtmlConf } from "./ParseElemHtml";
import withAudio from "./Plugin";

function audio() {
  Boot.registerRenderElem(renderAudioConf);
  Boot.registerElemToHtml(audioToHtmlConf);
  Boot.registerParseElemHtml(parseAudioHtmlConf);
  Boot.registerPlugin(withAudio);
}

export default audio;
