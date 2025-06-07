<script setup lang="ts">
import { ref } from "vue";
import InputText from '@/components/InputText.vue';
import TreeNode from '@/components/TreeNode.vue'
import type { CourseTreeNode } from '@/types';
import ButtonPrimary from '@/components/ButtonPrimary.vue'

interface FormData {
  search: string;
}

interface CourseTreeItem {
  id: number;
  name: string;
  parent_id: number;
}

type CourseTreeResponse = CourseTreeItem[];

const formData = ref<FormData>({
  search: "",
});

const validationMessage = ref("");
const isSubmitting = ref(false);
const errorMessage = ref("");
const resultsMessage = ref("");
const resultsTree = ref<CourseTreeNode[] | null>(null);

function validateForm(): boolean {
  validationMessage.value = "";
  let valid = false;

  if (formData.value.search.trim().length > 0) {
    valid = true;
  } else {
    validationMessage.value = "Please enter a search term.";
  }

  return valid;
}

const submitForm = async (): Promise<CourseTreeResponse | null> => {
  resultsTree.value = null;
  isSubmitting.value = true;
  errorMessage.value = "";
  resultsMessage.value = "";

  try {
    const isValid = validateForm();

    if (!isValid) {
      return null;
    }

    const encodedQuery = encodeURIComponent(formData.value.search);
    const url = `https://coursetreesearch-service-sandbox.dev.tophat.com/?query=${encodedQuery}`;

    const response = await fetch(url);
    console.log(response);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    const data: CourseTreeResponse = await response.json();
    resultsTree.value = buildTree(data);

    if (Array.isArray(data) && data.length === 0) {
      resultsMessage.value = "No results found.";
    }
    return data;

  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = "An unknown error occurred.";
    }
    return null;
  } finally {
    isSubmitting.value = false;
  }
};

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
    
      <form @submit.prevent="submitForm" class="form">
        <InputText
          :inputId="'form-input'"
          :label="'Search Courses'"
          :type="'text'"
          @updateInputValue="(newValue: string) => (formData.search = newValue)"
        />
        <section class="errors">
          <p v-if="validationMessage">{{ validationMessage }}</p>
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </section>
        <ButtonPrimary
          :label="isSubmitting ? 'Searching...' : 'Search'"
          :disabled="isSubmitting"
          :type="'submit'"
          :aria-label="'Search courses'"
        />
      </form>
      <section>
        <ul v-if="resultsTree">
          <TreeNode
            v-for="node in resultsTree"
            :key="node.id" 
            :node="node"
            :depth="1"
          />
        </ul>
        <p v-if="resultsMessage">{{ resultsMessage }}</p>
      </section>
  </section>
</template>

<style scoped lang="scss">

</style>
