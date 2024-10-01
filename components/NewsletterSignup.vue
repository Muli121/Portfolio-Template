<template>
  <div class="newsletter-signup">
    <form @submit.prevent="handleSubmit">
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <button type="submit">Subscribe</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NewsletterSignup',
  emits: ['submit'],
  setup(_, { emit }) {
    const email = ref('')

    const handleSubmit = () => {
      emit('submit', email.value)
      email.value = ''
    }

    return {
      email,
      handleSubmit
    }
  }
})
</script>

<style scoped>
.newsletter-signup {
  max-width: 400px;
  margin: 0 auto;
}

form {
  display: flex;
}

input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}
</style>