<template>
  <nav>
    <router-link to="/detail" class="item" active-class="selected">
    <div>detail</div>
      <div>明细</div>
  </router-link>

    <router-link  to="/account" class="item" active-class="selected">
      <div>account</div>
      记账
    </router-link>

    <router-link to="/statistics" class="item" active-class="selected">
      <div>sta</div>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Footer.vue"
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
nav{
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  .item{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2px 0;
    width: 33.33333333%;
    svg{

    }
  }

  .item.selected{
    color:red;

  }
}


</style>