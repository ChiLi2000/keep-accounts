<template>
  <Layout>
    <div class="day">
      <h3>每日支出</h3>
      <div>折线统计图</div>
    </div>
    <div class="classify">
      <h3>支出分类</h3>
      <div>饼状图</div>
    </div>
    <ol>
      <li>
        <Record/>
      </li>
      <li>
        <Record/>
      </li>
      <li>
        <Record/>
      </li>


    </ol>

  </Layout>

</template>

<script lang="ts">
export default {
  name: 'Statistics'
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
h3{

  line-height: 24px;
  background-color: #fbfbfb;
  padding: $out-padding;
}

</style>