<script setup lang="ts">
import { ref } from "vue";
import InputText from '@/components/InputText.vue';
import TreeNode from '@/components/TreeNode.vue'
import type { CourseTreeNode } from '@/types';
import ButtonPrimary from '@/components/ButtonPrimary.vue'

interface FormData {
  search: string;
}

const formData = ref<FormData>({
  search: "",
});

const resultsTree = ref<CourseTreeNode[] | null>(null);

const tempData = [
  {"id": 5, "name": "Chemical Kinetics", "parent_id": 6},
  {"id": 3, "name": "Surface Chemistry", "parent_id": 1},
  {"id": 1, "name": "Lab Experiment 1", "parent_id": 0},
  {"id": 4, "name": "Lab 1 Summary", "parent_id": 1},
  {"id": 2, "name": "Colloidal Solution (sol) of Starch", "parent_id": 3},
  {"id": 6, "name": "Lab Experiment 2", "parent_id": 0},
  {"id": 7, "name": "Colloidal Solution of Gum", "parent_id": 3}
];

function submitFormWithTempData(): void {
  resultsTree.value = buildTree(tempData);
}

function buildTree(flatItems: CourseTreeNode[]): CourseTreeNode[] {
  const idToNodeMap = new Map<number, CourseTreeNode>();
  const rootNodes: CourseTreeNode[] = [];

  flatItems.forEach((item) => {
    idToNodeMap.set(item.id, { ...item, children: [] });
  });

  idToNodeMap.forEach((node) => {
    if (node.parent_id === 0) {
      rootNodes.push(node);
    } else {
      const parent = idToNodeMap.get(node.parent_id);
      parent?.children?.push(node);
    }
  });

  return rootNodes;
}
</script>

<template>
  <section class="form-container">
      <form @submit.prevent="submitFormWithTempData" class="form">
        <InputText
          :inputId="'form-input'"
          :label="'Search Courses'"
          :type="'text'"
          @updateInputValue="(newValue: string) => (formData.search = newValue)"
        />
        <ButtonPrimary
          :label="'Search'"
          :type="'submit'"
        />
      </form>
      <section v-if="resultsTree">
        <ul>
          <TreeNode
            v-for="node in resultsTree"
            :key="node.id" 
            :node="node"
            :depth="1"
          />
        </ul>
      </section>
  </section>
</template>

<style scoped lang="scss">

</style>
