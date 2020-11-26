<template>
  <div class="slotScope">
    <div class="top">
      <slot name="top" :text="textTop"></slot>
    </div>
    <div class="content">
      <slot :text="textContent"></slot>
    </div>
    <div class="bottom">
      <slot name="bottom" class="bottom" :text="textBottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlotScope",
  data() {
    return {
      textTop: "子组件top",
      textContent: "子组件content",
      textBottom: "子组件bottom"
    };
  }
};
</script>

<style lang="less" scoped>
.slotScope {
  display: flex;
  justify-content: space-evenly;
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
