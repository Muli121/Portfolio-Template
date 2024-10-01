<template>
  <button class="category-button" @click="$emit('click')">
    {{ category }}
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Category } from '@/types';

export default defineComponent({
  name: 'CategoryButton',
  props: {
    category: {
      type: String as PropType<Category>,
      required: true,
    },
  },
  emits: ['click'],
});
</script>

<style scoped>
.category-button {
  background-color: #f0f0f0;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.category-button:hover {
  background-color: #e0e0e0;
}
</style>