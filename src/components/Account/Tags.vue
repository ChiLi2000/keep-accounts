<template>
  <ul class="tag">
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
    <li><Icon name="account"></Icon>
      记账</li>
  </ul>
</template>

<script lang="ts">
export default {
name: "Tags"
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.tag{
  margin:8px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  li{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    padding: 6px 0;
    width: 25%;
    ::v-deep svg{
      width: 32px;
      height: 32px;
    }
  }

}
</style>