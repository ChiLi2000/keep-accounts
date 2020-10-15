<template>
  <Layout>
    <ol >
      <li>
        <Record><span class="type">支出：￥200 收入：￥1000 </span></Record>
      </li>
    </ol>
  </Layout>

</template>

<script lang="ts">
export default {
  name: "Detail"
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.type {
  font-size: 14px;
}

</style>