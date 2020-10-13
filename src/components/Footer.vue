<template>
  <nav>
    <router-link to="/detail" class="item" active-class="selected">
     <Icon name="detail"/>
      明细
  </router-link>

    <router-link  to="/account" class="item" active-class="selected">
      <Icon name="account"></Icon>
      记账
    </router-link>

    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Footer"

};
</script>

<style scoped lang="scss">


nav{

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
      width: 32px;
      height: 32px;
    }
  }

  .item.selected{
    color:red;

  }
}


</style>