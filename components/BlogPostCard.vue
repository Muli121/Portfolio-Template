<template>
  <div class="blog-post-card">
    <img :src="post.image" :alt="post.title" class="post-image" />
    <div class="post-content">
      <h3>{{ post.title }}</h3>
      <p class="post-excerpt">{{ post.excerpt }}</p>
      <p class="post-meta">
        By {{ post.author }} | {{ formatDate(post.date) }}
      </p>
      <a :href="post.url" class="read-more">Read More</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { BlogPost } from '~/types'

export default defineComponent({
  name: 'BlogPostCard',
  props: {
    post: {
      type: Object as PropType<BlogPost>,
      required: true
    }
  },
  setup() {
    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    return {
      formatDate
    }
  }
})
</script>

<style scoped>
.blog-post-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.post-content {
  padding: 1rem;
}

h3 {
  margin-top: 0;
}

.post-excerpt {
  color: #666;
}

.post-meta {
  font-size: 0.9rem;
  color: #888;
}

.read-more {
  display: inline-block;
  margin-top: 0.5rem;
  color: #007bff;
  text-decoration: none;
}
</style>