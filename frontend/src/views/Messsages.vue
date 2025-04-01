<template>
  <div class="layout-wrapper">
    <aside class="sidebar">
      <AppSidebar />
    </aside>
    <div class="messages-container">
      <h2>Send a Message by Username</h2>
      <form @submit.prevent="sendMessage">
        <label for="recipientUsername">Recipient Username:</label>
        <input
            id="recipientUsername"
            v-model="recipientUsername"
            placeholder="e.g. john123"
            required
        />

        <label for="content">Message Content:</label>
        <textarea
            id="content"
            v-model="content"
            placeholder="Type your message"
            required
        ></textarea>

        <button type="submit">Send</button>
      </form>

      <!-- Display status messages (success or error) -->
      <div v-if="statusMessage" class="status">
        {{ statusMessage }}
      </div>

      <hr/>

      <h2>Your Received Messages</h2>
      <!-- If no messages, show a little note -->
      <div v-if="messages.length === 0">
        <p>You have no messages.</p>
      </div>
      <!-- Otherwise, iterate over messages -->
      <div v-else>
        <div
            v-for="msg in messages"
            :key="msg._id"
            class="message-item"
        >
          <p><strong>From:</strong> {{ msg.sender?.username }}</p>
          <p><strong>Content:</strong> {{ msg.content }}</p>
          <p><small>Sent on: {{ formatDate(msg.createdAt) }}</small></p>
          <hr/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppSidebar from "@/layout/AppSidebar.vue";
import axios from 'axios';


export default defineComponent({
  name: 'MessagesPage',
  components: {AppSidebar},
  data() {
    return {
      recipientUsername: '',
      content: '',
      statusMessage: '',
      messages: [] as any[],  // Use a proper interface if you want strict typing
    };
  },
  methods: {
    // 1) Send a message by passing in a username instead of an _id
    async sendMessage() {
      try {
        const senderId = localStorage.getItem('userId');
        if (!senderId) {
          this.statusMessage = 'You must be logged in to send messages.';
          return;
        }

        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/messages/by-username`, {
          senderId,
          recipientUsername: this.recipientUsername,
          content: this.content,
        });

        this.statusMessage = response.data.message || 'Message sent successfully!';
        this.recipientUsername = '';
        this.content = '';
      } catch (error: any) {
        console.error('Error sending message:', error);
        this.statusMessage =
            error.response?.data?.message || 'An error occurred while sending.';
      }
    },

    // 2) Fetch all direct messages that others have sent to this user
    async loadMessages() {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          this.statusMessage = 'You must be logged in to view messages.';
          return;
        }

        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/messages/${userId}`);
        // This returns { directMessages, groupMessages }
        // We'll just show directMessages here
        this.messages = res.data.directMessages || [];
      } catch (error: any) {
        console.error('Error fetching messages:', error);
        this.statusMessage =
            error.response?.data?.message || 'An error occurred while fetching.';
      }
    },

    formatDate(dateStr: string) {
      // Optional helper to format date/time
      return new Date(dateStr).toLocaleString();
    },
  },
  mounted() {
    // Load any existing messages as soon as this component mounts
    this.loadMessages();
  },
});
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  min-height: 100vh;
  background: #f4f4f9; /* Light grayish background for a more professional look */
  color: #333;
  font-family: 'Inter', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 220px; /* Reduced the width to make it more compact */
  background: #2e1f4c; /* Deep purple for a more luxurious vibe */
  color: #fff;
  padding: 20px;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  font-size: 1.3em;
}

.messages-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin: 1rem 0 0.5rem;
}

input,
textarea {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

button {
  width: 100px;
  padding: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
}

.status {
  margin-top: 1rem;
  font-weight: bold;
}

.message-item {
  margin-bottom: 1rem;
}
</style>
  