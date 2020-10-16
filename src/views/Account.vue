<template>
  <div class="outer">
    <div class="account-top">
      <div class="navbar">
        <Icon class="leftIcon" name="left"/>
        <span class="title">记账</span>
        <span>.</span>
      </div>
      <div class="smart">
        <Tabs class-prefix="tabs" class="tabs"/>
        <Date class-prefix="date"/>
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
}

::v-deep .navbar{
  @extend %item;
  padding: $out-padding;
  border-bottom:1px solid gray;
  svg{
    width: 24px;
    height: 24px;
  }
}

.smart{
  @extend %item;

  ::v-deep .date-wrapper{
    margin: 0 16px;
    .date-content{
      font-size: 16px;
      font-weight: normal;
    }
  }
  ::v-deep .tabs-wrapper {
    li{
      border: 1px solid #E5E5E5;
      text-align: center;
      border-radius: 25px;
      //width: 33.33333%;
    }
  }
}
.account-center{
  //background-color: $color-shadow;
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