<script setup lang="ts">
import type { CourseTreeNode } from '@/types';

defineProps<{
  node: CourseTreeNode & { children?: CourseTreeNode[] };
  depth: number;
}>();
</script>

<template>
  <li>
    {{ '-'.repeat(depth) }} {{ node.name }}
    <ul v-if="node.children && node.children.length > 0">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
      />
    </ul>
  </li>
</template>



<style scoped lang="scss">
li {
  list-style: none;
}
</style>
