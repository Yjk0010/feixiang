<template>
  <div class="card">
    <div class="title">{{ title }}</div>
    <div class="content">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: 'title'
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  background-color: #fff;
  height: 100%;
  border-radius: 3px;
  box-shadow: 1px 2px 6px 0px rgba(0, 0, 0, 0.1);
  .title {
    height: 40px;
    font-size: 14px;
    font-weight: bold;
    color: #000000;
    line-height: 24px;
    padding: 8px 12px;
    border-bottom: 1px solid #D9D9D9;
    text-align: left;
  }
  .content {
    padding: 14px;
  }
}
</style>
