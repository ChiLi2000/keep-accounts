<template>
  <div class="layout-wrapper" >
    <Header/>
    <div class="content">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
export default {
name: "Layout"
}
</script>

<style scoped lang="scss">
.layout-wrapper{
  display: flex;
  flex-direction: column;
  height: 100vh;

  .content{
    overflow: auto;
    flex-grow: 1;
  }
}

</style>