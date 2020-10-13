<template>
  <div id="app">
    <router-view/>

  </div>
</template>

<style lang="scss">

@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";

#app {
  font-size: 16px;
  line-height: 1.5;
  font-family: $font-hei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background: #f5f5f5;
}

</style>
