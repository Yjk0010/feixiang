<template>
  <div class="slot">
    <def>
      <template slot="top">想输入的内容</template>
      <br />
      <template>content</template>
      <br />
      <div>
        <template>二级子插入</template>
      </div>
      <div>
        <template slot="bottom">二级子插入</template>
      </div>
      <template>default</template>
      <template slot="bottom">bottom</template>
      <br slot="bottom" />
      <template slot="bottom">这个还是bottom</template>
    </def>
    <slo>
      <template #top="text">{{text}}</template>
      <template v-slot="{text}">{{text}}</template>
      <template v-slot:bottom="{text}">{{text}}</template>
    </slo>
  </div>
</template>

<script>
import def from "../slot/default";
import slo from "../slot/slotScope";

export default {
  name: "Solt",
  components: {
    def,
    slo
  }
};
</script>

<style lang="less" scoped>
.slot {
}
</style>
