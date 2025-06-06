<script setup lang="ts">
const props = defineProps<{ 
  inputId: string,
  label: string,
}>()

</script>

<template>
  <div class="form-field">
    <label :for="props.inputId">
      {{ props.label }}
    </label>
    <div class="field-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
