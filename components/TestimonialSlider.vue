<template>
  <div class="testimonial-slider">
    <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial">
      <p class="quote">"{{ testimonial.quote }}"</p>
      <p class="author">- {{ testimonial.author }}</p>
      <p class="role">{{ testimonial.role }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { Testimonial } from '~/types'

export default defineComponent({
  name: 'TestimonialSlider',
  props: {
    testimonials: {
      type: Array as PropType<Testimonial[]>,
      required: true
    }
  }
})
</script>

<style scoped>
.testimonial-slider {
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding: 1rem 0;
}

.testimonial {
  flex: 0 0 300px;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
}

.quote {
  font-style: italic;
  margin-bottom: 1rem;
}

.author {
  font-weight: bold;
}

.role {
  color: #666;
}
</style>