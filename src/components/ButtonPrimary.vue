<script setup lang="ts">
defineProps<{
  label: string,
  type: 'button' | 'submit' | 'reset'
}>()
</script>

<template>
<button
  :type="type"
  class="btn btn-primary"
> 
  {{ label }}
</button>
</template>

<style scoped lang="scss">

.btn-primary {

}
</style>
