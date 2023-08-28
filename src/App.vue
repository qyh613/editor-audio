<template>
  <div>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="html"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
        @onChange="onChange"
        @onDestroyed="onDestroyed"
        @onMaxLength="onMaxLength"
        @onFocus="onFocus"
        @onBlur="onBlur"
        @customAlert="customAlert"
        @customPaste="customPaste"
      />
    </div>
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { Boot } from "@wangeditor/editor";
import { AudioMenuConf } from "@/components/editor/audio/AudioMenu";
import Audio from "@/components/editor/audio/index";
export default {
  components: { Editor, Toolbar },
  data() {
    return {
      mp3Url:
        "http://m801.music.126.net/20230828090506/dcd02cfbebc1f8d19ddeb64bac8193c1/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096479166/6368/df38/bcfd/3a44ae30264055f051a078a54cac7218.mp3",
      editor: null,
      html: "<p>hello</p>",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default",
    };
  },
  created() {
    Audio();
    this.addAudioMenu();
  },
  methods: {
    addAudioMenu() {
      Boot.registerMenu(AudioMenuConf);
      this.toolbarConfig.insertKeys = {
        index: 23, // 插入的位置，基于当前的 toolbarKeys
        keys: ["audioMenu"],
      };
    },
    /**
     *
     * @param {Editor} editor
     * @param {string} url
     * @description video mode
     */
    videoInsertNode(editor, url) {
      editor.insertNode({
        type: "video",
        src: url,
        poster: "", // 如果有则填入
        children: [{ text: "" }],
      });
    },
    /**
     *
     * @param {Editor} editor
     * @param {string} url
     * @description audio mode
     */
    audioInsertNode(editor, url) {
      editor.insertNode({
        // 配置信息参考插件
        type: "audio",
        src: url,
        children: [{ text: "" }],
      });
    },
    initMediaMenuEvent() {
      const editor = this.editor;
      editor.on("AudioMenuClick", () => {
        // 上传逻辑
        const url = this.mp3Url; // 上传后的url
        // this.videoInsertNode(editor,url)
        this.audioInsertNode(editor, url);
      });
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
      this.initMediaMenuEvent();
    },
    onChange(editor) {
      console.log("onChange", editor.children);
      console.log(this.editor.getHtml());
    },
    onDestroyed(editor) {
      console.log("onDestroyed", editor);
    },
    onMaxLength(editor) {
      console.log("onMaxLength", editor);
    },
    onFocus(editor) {
      console.log("onFocus", editor);
    },
    onBlur(editor) {
      console.log("onBlur", editor);
    },
    customAlert(info, type) {
      window.alert(`customAlert in Vue demo\n${type}:\n${info}`);
    },
    customPaste(editor, event, callback) {
      console.log("ClipboardEvent 粘贴事件对象", event);
      // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
      // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
      // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

      // 自定义插入内容
      editor.insertText("xxx");

      // 返回 false ，阻止默认粘贴行为
      event.preventDefault();
      callback(false); // 返回值（注意，vue 事件的返回值，不能用 return）

      // 返回 true ，继续默认的粘贴行为
      // callback(true)
    },
  },
  mounted() {},
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>

<style lang="less"></style>
