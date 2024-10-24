<template>
  <div class="profiles-page">
    <h1>User Profiles</h1>
    <section>
      <h2>Profile Overview</h2>
      <p>View and manage your profile information.</p>
    </section>
    <section>
      <h2>Edit Profile</h2>
      <form>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" />
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" />
        
        <label for="bio">Bio:</label>
        <textarea id="bio" rows="4" cols="50"></textarea>
        
        <button type="submit">Save Changes</button>
      </form>
    </section>
    <section>
      <h2>Profile Picture</h2>
      <p>Upload a new profile picture.</p>
      <input type="file" accept="image/*" />
    </section>
    <section>
      <h2>Privacy Settings</h2>
      <p>Manage your privacy settings.</p>
      <ul>
        <li>Profile visibility</li>
        <li>Search engine indexing</li>
        <li>Data sharing preferences</li>
      </ul>
    </section>
    <section>
      <h2>Account Security</h2>
      <p>Enhance the security of your account.</p>
      <ul>
        <li>Enable two-factor authentication</li>
        <li>Change your password</li>
        <li>Review recent login activity</li>
      </ul>
    </section>
    <section>
      <h2>Connected Accounts</h2>
      <p>Manage your connected accounts.</p>
      <ul>
        <li>Link social media accounts</li>
        <li>Manage third-party app access</li>
        <li>Disconnect accounts</li>
      </ul>
    </section>
    <section>
      <h2>Notifications</h2>
      <p>Customize your notification preferences.</p>
      <ul>
        <li>Email notifications</li>
        <li>Push notifications</li>
        <li>SMS alerts</li>
      </ul>
    </section>
    <section>
      <h2>Activity Log</h2>
      <p>Review your recent activity.</p>
      <ul>
        <li>Login history</li>
        <li>Profile updates</li>
        <li>Security alerts</li>
      </ul>
    </section>
    <section>
      <h2>Subscription</h2>
      <p>Manage your subscription and billing information.</p>
      <ul>
        <li>View current plan</li>
        <li>Upgrade or downgrade plan</li>
        <li>Update payment method</li>
      </ul>
    </section>
    <section>
      <h2>Delete Account</h2>
      <p>If you wish to delete your account, please contact support.</p>
      <button>Contact Support</button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProfilesPage',
};
</script>

<style scoped>
.profiles-page {
  padding: 20px;
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
textarea {
  width: 100%;
  margin-bottom: 10px;
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
</style>

