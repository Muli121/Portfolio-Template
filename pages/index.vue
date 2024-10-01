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

      <section id="trending">
        <h2>Trending Portfolios</h2>
        <div class="portfolio-carousel">
          <PortfolioCard v-for="portfolio in trendingPortfolios" :key="portfolio.id" :portfolio="portfolio" />
        </div>
      </section>

      <section id="spotlight">
        <h2>Portfolio Spotlight</h2>
        <SpotlightPortfolio :portfolio="spotlightPortfolio" />
      </section>

      <section id="testimonials">
        <h2>What Our Users Say</h2>
        <TestimonialSlider :testimonials="testimonials" />
      </section>

      <section id="stats">
        <h2>Portfolio Showcase Stats</h2>
        <div class="stats-grid">
          <StatCard v-for="stat in siteStats" :key="stat.label" :stat="stat" />
        </div>
      </section>

      <section id="blog">
        <h2>Latest from Our Blog</h2>
        <div class="blog-grid">
          <BlogPostCard v-for="post in blogPosts" :key="post.id" :post="post" />
        </div>
      </section>

      <section id="faq">
        <h2>Frequently Asked Questions</h2>
        <FaqAccordion :faqs="faqs" />
      </section>

      <section id="newsletter">
        <h2>Stay Updated</h2>
        <NewsletterSignup @submit="subscribeToNewsletter" />
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
import SpotlightPortfolio from '~/components/SpotlightPortfolio.vue'
import TestimonialSlider from '~/components/TestimonialSlider.vue'
import StatCard from '~/components/StatCard.vue'
import BlogPostCard from '~/components/BlogPostCard.vue'
import FaqAccordion from '~/components/FaqAccordion.vue'
import NewsletterSignup from '~/components/NewsletterSignup.vue'
import type { Portfolio, Category, Testimonial, Stat, BlogPost, Faq } from '~/types'
import {
  fetchFeaturedPortfolios,
  fetchRecentPortfolios,
  fetchCategories,
  submitPortfolio,
  fetchTrendingPortfolios,
  fetchSpotlightPortfolio,
  fetchTestimonials,
  fetchSiteStats,
  fetchBlogPosts,
  fetchFaqs,
  subscribeToNewsletter
} from '~/api'

export default defineComponent({
  name: 'PortfolioPage',
  components: {
    PortfolioCard,
    CategoryButton,
    PortfolioSubmissionForm,
    SpotlightPortfolio,
    TestimonialSlider,
    StatCard,
    BlogPostCard,
    FaqAccordion,
    NewsletterSignup,
  },
  setup() {
    const featuredPortfolios = ref<Portfolio[]>([]);
    const recentPortfolios = ref<Portfolio[]>([]);
    const categories = ref<Category[]>([]);
    const trendingPortfolios = ref<Portfolio[]>([]);
    const spotlightPortfolio = ref<Portfolio | null>(null);
    const testimonials = ref<Testimonial[]>([]);
    const siteStats = ref<Stat[]>([]);
    const blogPosts = ref<BlogPost[]>([]);
    const faqs = ref<Faq[]>([]);

    onMounted(async () => {
      try {
        const [
          featured,
          recent,
          cats,
          trending,
          spotlight,
          testims,
          stats,
          posts,
          faqList
        ] = await Promise.all([
          fetchFeaturedPortfolios(),
          fetchRecentPortfolios(),
          fetchCategories(),
          fetchTrendingPortfolios(),
          fetchSpotlightPortfolio(),
          fetchTestimonials(),
          fetchSiteStats(),
          fetchBlogPosts(),
          fetchFaqs()
        ]);

        featuredPortfolios.value = featured;
        recentPortfolios.value = recent;
        categories.value = cats;
        trendingPortfolios.value = trending;
        spotlightPortfolio.value = spotlight;
        testimonials.value = testims;
        siteStats.value = stats;
        blogPosts.value = posts;
        faqs.value = faqList;
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

    const subscribeToNewsletter = async (email: string) => {
      try {
        await subscribeToNewsletter(email);
        // Show success message
      } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        // Show error message to the user
      }
    };

    return {
      featuredPortfolios,
      recentPortfolios,
      categories,
      trendingPortfolios,
      spotlightPortfolio,
      testimonials,
      siteStats,
      blogPosts,
      faqs,
      filterByCategory,
      submitPortfolio,
      subscribeToNewsletter,
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

.portfolio-carousel {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 1rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
</style>