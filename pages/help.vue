<template>
  <div class="help-page">
    <h1>Help Center</h1>
    <section class="search-section">
      <h2>How can we help you?</h2>
      <input type="text" v-model="searchQuery" @input="searchHelp" placeholder="Search for help..." />
      <ul v-if="searchResults.length > 0" class="search-results">
        <li v-for="result in searchResults" :key="result.id">
          <a :href="'#' + result.id">{{ result.title }}</a>
        </li>
      </ul>
    </section>
    <section>
      <h2>Getting Started</h2>
      <p>Welcome to our help center. Here you will find information to get you started.</p>
      <ul>
        <li><a href="#account-creation">Creating an account</a></li>
        <li><a href="#profile-setup">Setting up your profile</a></li>
        <li><a href="#navigation">Navigating the platform</a></li>
      </ul>
    </section>
    <section>
      <h2>Frequently Asked Questions</h2>
      <div v-for="faq in faqs" :key="faq.id" class="faq-item">
        <h3 @click="toggleFaq(faq.id)">{{ faq.question }}</h3>
        <p v-if="faq.isOpen">{{ faq.answer }}</p>
      </div>
    </section>
    <section>
      <h2>Troubleshooting</h2>
      <p>If you encounter any issues, try the following steps:</p>
      <ol>
        <li>Check your internet connection.</li>
        <li>Clear your browser cache.</li>
        <li>Restart your device.</li>
        <li>Update your browser to the latest version.</li>
        <li>Disable browser extensions temporarily.</li>
      </ol>
      <p>If the problem persists, please contact our support team.</p>
    </section>
    <section>
      <h2>Contact Us</h2>
      <p>If you need further assistance, please contact our support team:</p>
      <ul>
        <li>Email: support@example.com</li>
        <li>Phone: +1 (123) 456-7890</li>
        <li>Live Chat: Available 24/7</li>
      </ul>
      <form @submit.prevent="submitSupportTicket" class="support-form">
        <h3>Submit a Support Ticket</h3>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="supportTicket.name" required />
        
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="supportTicket.email" required />
        
        <label for="subject">Subject:</label>
        <input type="text" id="subject" v-model="supportTicket.subject" required />
        
        <label for="message">Message:</label>
        <textarea id="message" v-model="supportTicket.message" rows="4" required></textarea>
        
        <button type="submit">Submit Ticket</button>
      </form>
    </section>
    <section>
      <h2>Video Tutorials</h2>
      <div class="video-grid">
        <div v-for="video in videoTutorials" :key="video.id" class="video-item">
          <h3>{{ video.title }}</h3>
          <iframe :src="video.embedUrl" frameborder="0" allowfullscreen></iframe>
          <p>{{ video.description }}</p>
        </div>
      </div>
    </section>
    <section>
      <h2>User Guides</h2>
      <ul class="user-guides">
        <li v-for="guide in userGuides" :key="guide.id">
          <a :href="guide.url" target="_blank">{{ guide.title }}</a>
          <p>{{ guide.description }}</p>
        </li>
      </ul>
    </section>
    <section>
      <h2>System Status</h2>
      <p>Current system status: <span :class="systemStatus.class">{{ systemStatus.message }}</span></p>
      <ul>
        <li v-for="service in systemServices" :key="service.id">
          {{ service.name }}: <span :class="service.status">{{ service.status }}</span>
        </li>
      </ul>
    </section>
    <section>
      <h2>Community Forums</h2>
      <p>Join our community forums to connect with other users and get help:</p>
      <ul>
        <li v-for="forum in communityForums" :key="forum.id">
          <a :href="forum.url" target="_blank">{{ forum.name }}</a>
          <p>{{ forum.description }}</p>
        </li>
      </ul>
    </section>
    <section>
      <h2>Feedback</h2>
      <p>We value your feedback. Please let us know how we can improve.</p>
      <form @submit.prevent="submitFeedback" class="feedback-form">
        <label for="feedback">Your Feedback:</label>
        <textarea id="feedback" v-model="feedbackForm.message" rows="4" required></textarea>
        <label>
          <input type="checkbox" v-model="feedbackForm.canContact" />
          May we contact you about your feedback?
        </label>
        <button type="submit">Submit Feedback</button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelpPage',
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      faqs: [
        { id: 1, question: 'How do I reset my password?', answer: 'To reset your password, click on the "Forgot Password" link on the login page...', isOpen: false },
        { id: 2, question: 'Where can I find my account settings?', answer: 'Your account settings can be found by clicking on your profile picture...', isOpen: false },
        // Add more FAQs here
      ],
      supportTicket: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
      videoTutorials: [
        { id: 1, title: 'Getting Started', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Learn the basics of our platform.' },
        { id: 2, title: 'Advanced Features', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Discover advanced features and tips.' },
        // Add more video tutorials here
      ],
      userGuides: [
        { id: 1, title: 'Beginner\'s Guide', url: '#', description: 'A comprehensive guide for new users.' },
        { id: 2, title: 'Advanced User Manual', url: '#', description: 'Detailed documentation for power users.' },
        // Add more user guides here
      ],
      systemStatus: { message: 'All systems operational', class: 'status-ok' },
      systemServices: [
        { id: 1, name: 'Web Application', status: 'operational' },
        { id: 2, name: 'API', status: 'operational' },
        { id: 3, name: 'Database', status: 'operational' },
        // Add more services here
      ],
      communityForums: [
        { id: 1, name: 'General Discussion', url: '#', description: 'Discuss general topics and get help from the community.' },
        { id: 2, name: 'Feature Requests', url: '#', description: 'Suggest and vote on new features.' },
        // Add more forums here
      ],
      feedbackForm: {
        message: '',
        canContact: false,
      },
    };
  },
  methods: {
    searchHelp() {
      // Implement search logic here
    },
    toggleFaq(id) {
      const faq = this.faqs.find(f => f.id === id);
      if (faq) {
        faq.isOpen = !faq.isOpen;
      }
    },
    submitSupportTicket() {
      // Implement support ticket submission logic here
      console.log('Support ticket submitted:', this.supportTicket);
      // Reset form after submission
      this.supportTicket = { name: '', email: '', subject: '', message: '' };
    },
    submitFeedback() {
      // Implement feedback submission logic here
      console.log('Feedback submitted:', this.feedbackForm);
      // Reset form after submission
      this.feedbackForm = { message: '', canContact: false };
    },
  },
};
</script>

<style scoped>
.help-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1, h2, h3 {
  color: #333;
}

p, ul, ol {
  font-size: 16px;
  line-height: 1.5;
}

.search-section {
  margin-bottom: 30px;
}

.search-section input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.search-results {
  list-style-type: none;
  padding: 0;
}

.search-results li {
  margin-bottom: 5px;
}

.faq-item h3 {
  cursor: pointer;
  margin-bottom: 5px;
}

.faq-item h3:hover {
  text-decoration: underline;
}

.support-form, .feedback-form {
  margin-top: 20px;
}

.support-form input,
.support-form textarea,
.feedback-form textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.video-item iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.user-guides li {
  margin-bottom: 15px;
}

.status-ok {
  color: green;
}

.operational {
  color: green;
}

.degraded {
  color: orange;
}

.down {
  color: red;
}
</style>
