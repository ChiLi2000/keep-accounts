<template>
  <div class="outer" >
    <Header />
    <div class="content">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
export default {
name: "Layout",
  props: ["classPrefix"],
}
</script>

<style scoped lang="scss">
.outer{
  display: flex;
  flex-direction: column;
  height: 100vh;

  .content{
    overflow: auto;
    flex-grow: 1;
  }
}

</style>