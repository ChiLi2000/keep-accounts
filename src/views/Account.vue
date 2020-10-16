<template>
  <div class="outer">
    <div class="account-top">
      <div class="navbar">
        <Icon class="leftIcon" name="left"/>
        <span class="title">记账</span>
        <span>.</span>
      </div>
      <div class="smart">
        <Tabs class-prefix="tabs"/>
        <Date />
      </div>
    </div>
    <div class="account-center">
      <Tags></Tags>
    </div>
    <div class="account-bottom">
    <div class="formItem">
      <label>
        <input
            type="text"
            placeholder="请输入备注"
        />
      </label>
    </div>
    <NumberPad/>
    </div>
  </div>


</template>

<script lang="ts">
export default {
  name: 'account'
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
.outer{
  display: flex;
  flex-direction: column;
  height: 100vh;
  .account-top{
    height: 112px;
  }
  .account-bottom{
    height: 356px;
  }
  .account-center{
    flex: 1;
    width: 100%;
    overflow: auto;
  }
}

%item {
  background-color: $color-shadow;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $out-padding;

}

::v-deep .navbar{
  @extend %item;
  border-bottom:1px solid gray;
  svg{
    width: 24px;
    height: 24px;
  }
}

.smart{
  @extend %item;
}
.account-center{
  background-color: $color-shadow;
}

.formItem {
  font-size: 14px;
  padding: 8px 0;

  input {
    width: 100vw;
    height: 40px;
    background: transparent;
    border: none;
    padding: 0 16px;

  }
}




</style>