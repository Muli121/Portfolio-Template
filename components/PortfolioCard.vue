<template>
  <div class="portfolio-card">
    <img :src="portfolio.thumbnail" :alt="portfolio.title" class="portfolio-thumbnail">
    <h3>{{ portfolio.title }}</h3>
    <p>{{ portfolio.description }}</p>
    <div class="portfolio-meta">
      <span>By {{ portfolio.author }}</span>
      <span>{{ portfolio.category }}</span>
    </div>
    <a :href="portfolio.url" target="_blank" rel="noopener noreferrer">View Portfolio</a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Portfolio } from '@/types';

export default defineComponent({
  name: 'PortfolioCard',
  props: {
    portfolio: {
      type: Object as PropType<Portfolio>,
      required: true,
    },
  },
});
</script>

<style scoped>
.portfolio-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.portfolio-thumbnail {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.portfolio-meta {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

a {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
}
</style>