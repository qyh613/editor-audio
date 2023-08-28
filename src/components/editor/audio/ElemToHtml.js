/**
 * @description element to html
 * @author quanyihang
 */

/**
 *
 * @param {SlateElement} elem
 * @param {string} [childrenHtml]
 * @returns {string}
 */
function audioElemToHtml(elem) {
  const { src, width = 300, height = 54 } = elem;
  const html = `<div 
                    data-w-e-type="audio"
                    data-w-e-is-void
                    data-w-e-type="audio"
                    data-w-e-width="${width}"
                    data-w-e-height="${height}"
                    data-src="${src}"
                    data-width="${width}"
                    data-height="${height}"
                    >
                        <audio controls src="${src}" style="width: ${width};height:${height};max-width: 100%"/>
                     </div>`;
  return html;
}

// 配置
const audioToHtmlConf = {
  type: "audio",
  elemToHtml: audioElemToHtml,
};

export { audioToHtmlConf };
