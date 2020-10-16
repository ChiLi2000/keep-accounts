<template>
  <div id="app">
    <router-view/>

  </div>
</template>

<style lang="scss">

@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";

body,html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: $font-hei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background: #f5f5f5;
}

</style>
