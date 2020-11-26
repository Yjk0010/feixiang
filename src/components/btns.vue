<template>
  <!--
    btns 标准按钮
      text 文字
      key 点击方法抛出标记
      notPlain 是否没有plain设置
      icon 图标
      size 按钮大小
      iconRight icon位置
      todo 设置
        jump 正常跳转 link 传入路由名字
        blank 开新页面 link 传入路由名字 href 外部链接 需要http blank属性下 设置href会使ink失效
        export 导出 link 配置地址
        import 导入
    moreBtns  更多按钮 文字按钮 配置icon样式字段无效
      其他属性同上
    抛出方法 @clickTab tab点击事件

    前中后有三个插槽 前边 name=left 中间 name=center 默认后边
    Author:yan.jk

    入参格式
    cfg: {
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
          text: "跳转按钮",
          key: "btn3",
          buttonPlain: false,
          type: "",
          todo: "jump",
          link: "Card"
        },
        {
          text: "开新页签按钮（内部）",
          key: "btn4",
          type: "",
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
        { text: "按钮3", key: "按钮3" },
        {
          text: "按钮4",
          key: "按钮4"
        }
      ]
    },
  -->
  <div class="content">
    <div class="right">
      <slot name="left"></slot>
      <div class="key" v-if="config.btns&&config.btns.length">
        <el-button
          v-for="(item,index) in config.btns||[]"
          @click="sendBtn(item)"
          :key="index+'J'"
          :icon="item.iconRight ? null : item.icon || null"
          :size="item.size || 'medium'"
          :type="item.type || ''"
          :plain="item.buttonPlain"
          :class="'personalStyle'"
        >
          {{item.text}}
          <i v-if="item.iconRight" :class="`${item.icon} el-icon--right`"></i>
        </el-button>
        <input type="file" @change="lmportFile" id="import" style="display:none" />
      </div>
      <slot name="center"></slot>
      <div class="key" v-if="config.moreBtns&&config.moreBtns.length">
        <el-dropdown>
          <el-button>
            {{config.moreBtnsText || '更多功能'}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in config.moreBtns||[]" :key="index+'J'">
              <el-button type="text" @click="sendBtn(item)">{{item.text}}</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
const viewName = "btns";
export default {
  name: viewName,
  data() {
    return {
      clickVal: null
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          btns: [
            // text 文字 key 点击方法抛出标记 buttonPlain plain设置 icon 图标 iconRight icon位置
            {
              text: "按钮",
              key: "btn1",
              type: "primary"
            }
          ],
          moreBtns: [
            { text: "按钮", key: "btn2" }
          ]
        };
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    sendBtn(val) {
      this.clickVal = val;
      switch (val.todo) {
        case "import":
          document.getElementById("import").click();
          break;
        case "export":
          window.open(val.link);
          break;
        case "jump":
          this.$router.push(val.link);
          break;
        case "blank":
          if (val.href) {
            window.open(val.href, "_blank");
          } else {
            const newpage = this.$router.resolve({
              name: val.link
            });
            window.open(newpage.href, "_blank");
          }
          break;

        default:
          break;
      }
      if (val.todo === "jump") {
      }
      this.$emit("clickBtn", val);
    },
    lmportFile(e) {
      const file = e.target.files[0];
      const name = file.name.split(".").splice(-1).toString();
      if (name !== this.clickVal.fileName) {
        this.$message.error("文件类型错误,请重新选择文件");
        return;
      }
      this.clickVal.file = file;
      console.log(this.clickVal);
      this.$emit("clickBtn", this.clickVal);
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 100vw;
  position: fixed;
  top: 12vh;
  left: 0;
  .right {
    display: flex;
    justify-content: center;
    height: 100%;
  }
  .key {
    margin: auto 12px auto 0;
    flex-direction: row-reverse;
  }
}
</style>
