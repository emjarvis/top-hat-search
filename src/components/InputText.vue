<script setup lang="ts">
import { ref } from "vue";
import FormField from "@/components/FormField.vue";

const props = defineProps<{ 
  inputId: string,
  label: string,
  type: string,
}>()

const inputValue = ref("");
const emit = defineEmits(["updateInputValue"]);

function onInput() {
  emit("updateInputValue", inputValue.value);
}

</script>

<template>
  <FormField :inputId="props.inputId" :label="props.label">
    <input
      :id="props.inputId"
      v-model.trim="inputValue"
      @input="onInput"
      :type="props.type"
    />
  </FormField>
</template>

<style scoped lang="scss">


</style>
