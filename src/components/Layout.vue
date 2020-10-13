<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
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