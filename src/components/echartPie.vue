<template>
  <div
    class="echart-pie"
    @mouseover="mouseover({dataIndex:''})"
    @mouseout="mouseout({dataIndex:''},true)"
  >
    <!-- <div id="echartPie" style="width:95%;height:94%;"></div> -->
    <e-charts
      ref="echartRef"
      :style="{'width':width,'height':height}"
      @mouseover="mouseover"
      @mouseout="mouseout"
      :autoresize="true"
    ></e-charts>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
// import moment from 'moment'
require("echarts/lib/chart/pie.js");
require("echarts/lib/component/legend.js");
export default {
  name: "EchartPie",
  data() {
    return {
      echartPie: "", // 饼图
      mTime: null,
      index: 0
    };
  },
  components: {
    ECharts
  },
  props: {
    width: {
      type: String,
      default: "300px"
    },
    height: {
      type: String,
      default: "300px"
    },
    delay: {
      type: Number,
      default: 1000
    },
    dynamicHighlight: {
      type: Boolean,
      default: true
    },
    color: {
      type: Array,
      default: () => {
        return ["#2A86FD", "#21E689", "#FBFF0A", "#F96A0D", "#EB53BE"];
      }
    },
    legend: {
      type: Object,
      default: () => {
        return {
          orient: "horizontal",
          x: "center",
          y: "bottom",
          itemHeight: 8,
          itemWidth: 8,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告"],
          textStyle: {
            color: "#000",
            fontSize: 12
          }
        };
      }
    },
    legendData: {
      type: Array,
      default: () => {
        return ["直接访问", "邮件营销", "联盟广告", "视频广告"];
      }
    },
    series: {
      type: Array,
      default: () => {
        return [
          {
            type: "pie",
            radius: ["44%", "54%"],
            hoverOffset: 20,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                formatter: ["{topNum|{d}}{percent|%}", "{data|{b} {c}}"].join(
                  "\n"
                ),
                rich: {
                  topNum: {
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: 24,
                    lineHeight: 35
                  },
                  percent: {
                    color: "#000",
                    fontSize: 12
                  },
                  data: {
                    color: "rgba(0,0,0,0.65)",
                    fontSize: 14
                  }
                }
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" }
            ]
          }
        ];
      }
    },
    seriesData: {
      type: Array,
      default: () => {
        return [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" }
        ];
      }
    }
  },
  computed: {
    dataLength() {
      return this.seriesData.length;
    }
  },
  mounted() {
    this.mergeOptions();
  },
  methods: {
    mergeOptions() {
      const color = this.color;
      const legend = this.legend;
      const series = this.series;
      const legendData = this.legendData;
      const seriesData = this.seriesData;
      const options = { color, legend, series, animationDurationUpdate: 800 };
      options.legend.data = legendData;
      options.series[0].data = seriesData;
      this.$refs.echartRef.mergeOptions(options, true);
      this.echartPie = this.$refs.echartRef;
      // this.echartPie.setOption(option)
      this.setMTime();
    },
    setMTime() {
      this.mTime = setInterval(() => {
        this.echartPie.dispatchAction({
          type: "downplay",
          seriesIndex: 0, // 里层的圆形
          dataIndex: this.index % this.dataLength
        });
        this.index++;
        this.echartPie.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: this.index % this.dataLength
        });
      }, this.delay);
    },
    mouseover(e) {
      console.log(...arguments);
      if (!this.dynamicHighlight) return false;
      // 停止定时器，清除之前的高亮
      clearInterval(this.mTime);
      this.echartPie.dispatchAction({
        type: "downplay",
        seriesIndex: 0 // 清一下高亮
      });
      this.echartPie.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: e.dataIndex // 当前鼠标选中的高亮
      });
    },
    mouseout(e, flag) {
      console.log(...arguments);
      if (!this.dynamicHighlight) return false;
      clearInterval(this.mTime);
      this.echartPie.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: e.dataIndex
      }); // 鼠标移出后先把上次的高亮取消
      if (flag) {
        this.setMTime();
      }
    }
  }
};
</script>
