<template>
  <div class="profiles-page">
    <h1>User Profiles</h1>
    <section>
      <h2>Profile Overview</h2>
      <p>View and manage your profile information.</p>
      <div v-if="user">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Member since:</strong> {{ formatDate(user.createdAt) }}</p>
      </div>
    </section>
    <section>
      <h2>Edit Profile</h2>
      <form @submit.prevent="updateProfile">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="form.username" required />
        
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
        
        <label for="bio">Bio:</label>
        <textarea id="bio" v-model="form.bio" rows="4" cols="50"></textarea>
        
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="form.location" />
        
        <label for="website">Website:</label>
        <input type="url" id="website" v-model="form.website" />
        
        <button type="submit">Save Changes</button>
      </form>
    </section>
    <section>
      <h2>Profile Picture</h2>
      <p>Upload a new profile picture.</p>
      <input type="file" @change="handleFileUpload" accept="image/*" />
      <img v-if="previewImage" :src="previewImage" alt="Profile picture preview" class="preview-image" />
    </section>
    <section>
      <h2>Privacy Settings</h2>
      <p>Manage your privacy settings.</p>
      <ul>
        <li>
          <label>
            <input type="checkbox" v-model="privacySettings.profileVisibility" />
            Make profile visible to public
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" v-model="privacySettings.searchEngineIndexing" />
            Allow search engines to index my profile
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" v-model="privacySettings.dataSharing" />
            Share data with third-party services
          </label>
        </li>
      </ul>
    </section>
    <section>
      <h2>Account Security</h2>
      <p>Enhance the security of your account.</p>
      <ul>
        <li>
          <label>
            <input type="checkbox" v-model="securitySettings.twoFactor" />
            Enable two-factor authentication
          </label>
        </li>
        <li>
          <button @click="changePassword">Change Password</button>
        </li>
        <li>
          <button @click="viewLoginActivity">View Login Activity</button>
        </li>
      </ul>
    </section>
    <section>
      <h2>Connected Accounts</h2>
      <p>Manage your connected accounts.</p>
      <ul>
        <li v-for="account in connectedAccounts" :key="account.id">
          {{ account.name }}
          <button @click="disconnectAccount(account.id)">Disconnect</button>
        </li>
      </ul>
      <button @click="connectNewAccount">Connect New Account</button>
    </section>
    <section>
      <h2>Notifications</h2>
      <p>Customize your notification preferences.</p>
      <ul>
        <li v-for="notification in notificationPreferences" :key="notification.type">
          <label>
            <input type="checkbox" v-model="notification.enabled" />
            {{ notification.label }}
          </label>
        </li>
      </ul>
    </section>
    <section>
      <h2>Activity Log</h2>
      <p>Review your recent activity.</p>
      <ul>
        <li v-for="activity in activityLog" :key="activity.id">
          {{ activity.description }} - {{ formatDate(activity.timestamp) }}
        </li>
      </ul>
      <button @click="loadMoreActivity">Load More</button>
    </section>
    <section>
      <h2>Subscription</h2>
      <p>Manage your subscription and billing information.</p>
      <div v-if="subscription">
        <p><strong>Current Plan:</strong> {{ subscription.plan }}</p>
        <p><strong>Next Billing Date:</strong> {{ formatDate(subscription.nextBillingDate) }}</p>
        <button @click="upgradePlan">Upgrade Plan</button>
        <button @click="updatePaymentMethod">Update Payment Method</button>
      </div>
    </section>
    <section>
      <h2>Delete Account</h2>
      <p>If you wish to delete your account, please contact support.</p>
      <button @click="contactSupport">Contact Support</button>
    </section>
    <section>
      <h2>Profile Customization</h2>
      <p>Customize your profile appearance and settings.</p>
      <div>
        <label for="theme">Choose a theme:</label>
        <select id="theme" v-model="customization.theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      <div v-if="customization.theme === 'custom'">
        <label for="customColor">Custom Color:</label>
        <input type="color" id="customColor" v-model="customization.customColor" />
      </div>
      <div>
        <label for="layout">Layout Preference:</label>
        <select id="layout" v-model="customization.layout">
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
      </div>
    </section>
    <section>
      <h2>Achievements</h2>
      <p>Track your achievements and milestones.</p>
      <ul>
        <li v-for="achievement in achievements" :key="achievement.id">
          <strong>{{ achievement.title }}</strong> - {{ achievement.description }}
          <span v-if="achievement.completed">✅</span>
        </li>
      </ul>
      <button @click="setNewGoal">Set New Goal</button>
    </section>
    <section>
      <h2>Help and Support</h2>
      <p>Access help resources and support options.</p>
      <ul>
        <li><a href="/faq">FAQs</a></li>
        <li><a href="/contact">Contact Support</a></li>
        <li><a href="/community">Community Forums</a></li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProfilesPage',
  data() {
    return {
      user: null,
      form: {
        username: '',
        email: '',
        bio: '',
        location: '',
        website: '',
      },
      previewImage: null,
      privacySettings: {
        profileVisibility: false,
        searchEngineIndexing: false,
        dataSharing: false,
      },
      securitySettings: {
        twoFactor: false,
      },
      connectedAccounts: [],
      notificationPreferences: [
        { type: 'email', label: 'Email Notifications', enabled: true },
        { type: 'push', label: 'Push Notifications', enabled: true },
        { type: 'sms', label: 'SMS Alerts', enabled: false },
      ],
      activityLog: [],
      subscription: null,
      customization: {
        theme: 'light',
        customColor: '#ffffff',
        layout: 'grid',
      },
      achievements: [],
    };
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    updateProfile() {
      // Implement profile update logic
    },
    handleFileUpload(event) {
      // Implement file upload logic
    },
    changePassword() {
      // Implement password change logic
    },
    viewLoginActivity() {
      // Implement login activity view logic
    },
    disconnectAccount(id) {
      // Implement account disconnection logic
    },
    connectNewAccount() {
      // Implement new account connection logic
    },
    loadMoreActivity() {
      // Implement loading more activity logic
    },
    upgradePlan() {
      // Implement plan upgrade logic
    },
    updatePaymentMethod() {
      // Implement payment method update logic
    },
    contactSupport() {
      // Implement contact support logic
    },
    setNewGoal() {
      // Implement new goal setting logic
    },
  },
  created() {
    // Fetch user data and populate form fields
  },
};
</script>

<style scoped>
.profiles-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1, h2 {
  color: #333;
}

p, ul, ol {
  font-size: 16px;
  line-height: 1.5;
}

form {
  margin-top: 20px;
}

input[type="text"],
input[type="email"],
input[type="url"],
textarea,
select {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

.preview-image {
  max-width: 200px;
  margin-top: 10px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 10px;
}

a {
  color: #007BFF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
