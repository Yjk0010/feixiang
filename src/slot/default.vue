<template>
  <div class="default">
    <div class="top">
      <slot name="top">top</slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Default"
};
</script>

<style lang="less" scoped>
.default {
  display: flex;
  justify-content: space-evenly;
  & > div {
    line-height: 30px;
  }
  .top {
    color: red;
  }
  .content {
    color: seagreen;
  }
  .bottom {
    color: peru;
  }
}
</style>
