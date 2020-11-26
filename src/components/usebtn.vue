<template>
  <div class="usebtn">
    <btns :config="config" @clickBtn="alert"></btns>
  </div>
</template>

<script>
import btns from "./btns"
export default {
  name: 'Usebtn',
  data() {
    return {
      config: {
        btns: [
          // text 文字 key 点击方法抛出标记 buttonPlain plain设置 icon 图标 iconRight icon位置
          {
            text: "小按钮",
            key: "btn1",
            type: "primary",
            icon: "el-icon-edit",
            size: "mini"
          },
          {
            text: "中号按钮",
            key: "btn2",
            buttonPlain: true,
            type: "primary",
            icon: "el-icon-edit",
            iconRight: true
          },
          {
            text: "大号按钮",
            key: "btn2",
            type: "success",
            icon: "el-icon-edit",
            iconRight: true,
            size: 'large'
          },
          {
            text: "跳转按钮",
            key: "btn3",
            buttonPlain: false,
            type: "warning",
            todo: "jump",
            link: "Card"
          },
          {
            text: "开新页签按钮（内部）",
            key: "btn4",
            type: "danger",
            todo: "blank",
            link: "Card"
          },
          {
            text: "开新页签按钮（外部）",
            key: "btn5",
            type: "",
            todo: "blank",
            href: "http://www.baidu.com",
            link: "Card"
          },
          {
            text: "导出",
            key: "btn6",
            todo: "export",
            type: "primary",
            link: "https://nodejs.org/dist/v15.2.1/node-v15.2.1-x64.msi"
          },
          {
            text: "导入",
            key: "btn7",
            todo: "import",
            type: "primary",
            fileName: "txt"
          }
        ],
        moreBtns: [
          { text: "按钮3", key: "按钮3", type: "info", icon: "el-icon-edit" },
          {
            text: "按钮4",
            key: "按钮4",
            buttonPlain: true,
            type: "",
            icon: "el-icon-share",
            iconRight: true
          },
          {
            text: "slot",
            key: "btn8",
            type: "",
            todo: "blank",
            href: "https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot"
          },
          {
            text: "组件基本原则",
            key: "btn8",
            type: "",
            todo: "blank",
            href: "https://bobi.ink/2019/05/11/react-component-design-02/#1-%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1%E7%9A%84%E5%9F%BA%E6%9C%AC%E5%8E%9F%E5%88%99"
          }
        ]
      }
    }
  },
  components: {
    btns
  },
  methods: {
    alert() {
      console.log(...arguments)
    }
  }
}
</script>

<style lang="less" scoped>
.usebtn{}
</style>
