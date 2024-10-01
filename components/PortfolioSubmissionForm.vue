<template>
  <form @submit.prevent="submitForm" class="portfolio-submission-form">
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" id="title" v-model="form.title" required>
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" v-model="form.description" required></textarea>
    </div>
    <div class="form-group">
      <label for="author">Author</label>
      <input type="text" id="author" v-model="form.author" required>
    </div>
    <div class="form-group">
      <label for="category">Category</label>
      <select id="category" v-model="form.category" required>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="url">Portfolio URL</label>
      <input type="url" id="url" v-model="form.url" required>
    </div>
    <div class="form-group">
      <label for="thumbnail">Thumbnail URL</label>
      <input type="url" id="thumbnail" v-model="form.thumbnail" required>
    </div>
    <button type="submit">Submit Portfolio</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Portfolio, Category } from '@/types';

export default defineComponent({
  name: 'PortfolioSubmissionForm',
  emits: ['submit'],
  setup(_, { emit }) {
    const form = ref<Partial<Portfolio>>({
      title: '',
      description: '',
      author: '',
      category: '',
      url: '',
      thumbnail: '',
    });

    const categories: Category[] = [
      'Web Development',
      'Graphic Design',
      'Photography',
      'Illustration',
      'UX/UI Design',
      'Motion Graphics',
      'Game Development',
    ];

    const submitForm = () => {
      emit('submit', form.value);
      // Reset form after submission
      form.value = {
        title: '',
        description: '',
        author: '',
        category: '',
        url: '',
        thumbnail: '',
      };
    };

    return {
      form,
      categories,
      submitForm,
    };
  },
});
</script>

<style scoped>
.portfolio-submission-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 100px;
}

button[type="submit"] {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>