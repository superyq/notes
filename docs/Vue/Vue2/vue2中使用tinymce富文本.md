# vue2 中使用富文本

1. 安装依赖

```js
yarn add @packy-tang/vue-tinymce
```

2. main.js

```js
// 引入富文本
import VueTinymce from "@packy-tang/vue-tinymce";
Vue.use(VueTinymce);
```

3. tinymce源文件 复制到public下
4. public/index.html
```html
<div id="app"></div>
<script src="./tinymce/tinymce.min.js"></script>
```

5. 构建 edit 组件
```js
<script>
// import { uploadFile } from '@/api/system/user.js'

export default {
  name: 'YEdit',
  props: {
    content: {
      type: String,
      require: true
    },
    inline: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '600px'
    }
  },
  data() {
    return {
      setting: {
        language: 'zh_CN', // 本地化设置
        height: 700,
        menubar: false,
        inline: this.inline,
        paste_data_images: true,
        // resize: true,
        toolbar:
          // "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
          'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs importword kityformula-editor',
        toolbar_drawer: 'sliding',
        quickbars_selection_toolbar:
          'removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor',
        // plugins: "link image table lists fullscreen quickbars",
        plugins:
          'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template advcode codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize formatpainter axupimgs importword kityformula-editor',
        images_upload_handler: (blobInfo, succFun, failFun) => {
          const formdata = new FormData()
          formdata.append('file', blobInfo.blob())
          // uploadFile(formdata).then((data) => {
          //   if (data.code !== 200) {
          //     failFun(data.msg)
          //   } else {
          //     succFun(data.data.url)
          //   }
          // })
        }
      },
      // setting: {
      //   language: "zh_CN",
      //   plugins:
      //     "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template advcode codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize formatpainter axupimgs importword kityformula-editor",
      //   toolbar:
      //     "code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs importword kityformula-editor",
      //   height: 650, // 编辑器高度
      //   min_height: 400,
      //   fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
      //   font_formats:
      //     "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif",
      //   link_list: [
      //     { title: "预置链接1", value: "http://www.tinymce.com" },
      //     { title: "预置链接2", value: "http://tinymce.ax-z.cn" },
      //   ],
      //   image_list: [
      //     {
      //       title: "预置图片1",
      //       value: "https://www.tiny.cloud/images/glyph-tinymce@2x.png",
      //     },
      //     {
      //       title: "预置图片2",
      //       value: "https://www.baidu.com/img/bd_logo1.png",
      //     },
      //   ],
      //   image_class_list: [
      //     { title: "None", value: "" },
      //     { title: "Some class", value: "class-name" },
      //   ],
      //   // 为内容模板插件提供预置模板
      //   templates: [
      //     { title: "模板1", description: "介绍文字1", content: "模板内容" },
      //     {
      //       title: "模板2",
      //       description: "介绍文字2",
      //       content:
      //         '<div class="mceTmpl"><span class="cdate">CDATE</span>，<span class="mdate">MDATE</span>，我的内容</div>',
      //     },
      //   ],
      //   autosave_ask_before_unload: false,
      //   toolbar_mode: "wrap",
      //   automatic_uploads: false,
      //   images_upload_handler: function (blobInfo, succFun, failFun) {
      //     const formdata = new FormData();
      //     formdata.append("file", blobInfo.blob());
      //     uploadFile(formdata).then((data) => {
      //       if (data.code !== 200) {
      //         failFun(data.msg);
      //       } else {
      //         succFun(data.data.url);
      //       }
      //     });
      //   },
      // },
      currentValue: ''
    }
  },
  watch: {
    content: {
      handler(val) {
        if (val !== this.currentValue) {
          this.currentValue = val === null ? '' : val
        }
      },
      immediate: true
    },
    currentValue(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<template>
  <div class="ZrEdit" :style="{ 'width': `${width}` }">
    <vue-tinymce v-model="currentValue" :setting="setting" />
  </div>
</template>

<style>
.tox-statusbar__branding {
  display: none;
}
.tox-tinymce-aux {
  z-index: 2100 !important;
}
</style>
<style lang="scss" scoped></style>

```

6. 使用

```js
<script>
import YEdit from "@/components/YEdit.vue"
export default {
  components: {
    YEdit
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    changeMd(value) {
      console.log(value);
    },
  },
};
</script>

<template>
  <div class="edit">
    <y-edit :content="content" @change="changeMd" width="auto" />
  </div>
</template>
```