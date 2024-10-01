<template>
  <div class="portfolio-page">
    <header>
      <h1>Portfolio Showcase</h1>
      <p>Share and discover amazing portfolios</p>
    </header>

    <nav>
      <ul>
        <li><a href="#featured">Featured</a></li>
        <li><a href="#categories">Categories</a></li>
        <li><a href="#recent">Recent</a></li>
        <li><a href="#submit">Submit Your Portfolio</a></li>
      </ul>
    </nav>

    <main>
      <section id="featured">
        <h2>Featured Portfolios</h2>
        <div class="portfolio-grid">
          <PortfolioCard v-for="portfolio in featuredPortfolios" :key="portfolio.id" :portfolio="portfolio" />
        </div>
      </section>

      <section id="categories">
        <h2>Browse by Category</h2>
        <div class="category-list">
          <CategoryButton v-for="category in categories" :key="category" :category="category" @click="filterByCategory(category)" />
        </div>
      </section>

      <section id="recent">
        <h2>Recently Added</h2>
        <div class="portfolio-grid">
          <PortfolioCard v-for="portfolio in recentPortfolios" :key="portfolio.id" :portfolio="portfolio" />
        </div>
      </section>

      <section id="submit">
        <h2>Submit Your Portfolio</h2>
        <PortfolioSubmissionForm @submit="submitPortfolio" />
      </section>
    </main>

    <footer>
      <p>&copy; 2023 Portfolio Showcase. All rights reserved.</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import PortfolioCard from '~/components/PortfolioCard.vue'
import CategoryButton from '~/components/CategoryButton.vue'
import PortfolioSubmissionForm from '~/components/PortfolioSubmissionForm.vue'
import type { Portfolio, Category } from '~/types'
import { fetchFeaturedPortfolios, fetchRecentPortfolios, fetchCategories, submitPortfolio } from '~/api'

export default defineComponent({
  name: 'PortfolioPage',
  components: {
    PortfolioCard,
    CategoryButton,
    PortfolioSubmissionForm,
  },
  setup() {
    const featuredPortfolios = ref<Portfolio[]>([]);
    const recentPortfolios = ref<Portfolio[]>([]);
    const categories = ref<Category[]>([]);

    onMounted(async () => {
      try {
        featuredPortfolios.value = await fetchFeaturedPortfolios();
        recentPortfolios.value = await fetchRecentPortfolios();
        categories.value = await fetchCategories();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    const filterByCategory = (category: Category) => {
      // Implement category filtering logic here
      console.log('Filtering by category:', category);
    };

    const submitPortfolio = async (portfolioData: Partial<Portfolio>) => {
      try {
        const newPortfolio = await submitPortfolio(portfolioData);
        recentPortfolios.value.unshift(newPortfolio);
        // Show success message or redirect to the new portfolio page
      } catch (error) {
        console.error('Error submitting portfolio:', error);
        // Show error message to the user
      }
    };

    return {
      featuredPortfolios,
      recentPortfolios,
      categories,
      filterByCategory,
      submitPortfolio,
    };
  },
});
</script>

<style scoped>
.portfolio-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

nav ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
}

nav li {
  margin: 0 1rem;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

section {
  margin-bottom: 4rem;
}

h2 {
  margin-bottom: 1rem;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

footer {
  text-align: center;
  margin-top: 4rem;
}
</style>
