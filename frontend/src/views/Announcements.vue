<template>
  <div class="announcements-container">
    <h2>Announcements</h2>
    <p v-if="announcements.length === 0">No announcements yet.</p>
    <div v-for="(ann, index) in announcements" :key="index" class="announcement-item">
      <h3>{{ ann.title }}</h3>
      <p>{{ ann.content }}</p>
      <p class="posted-by">Posted by: {{ ann.postedBy }} on {{ formatDate(ann.postedAt) }}</p>
    </div>

    <div v-if="canPost" class="post-form">
      <h3>Create Announcement</h3>
      <label>Title:</label>
      <input v-model="newTitle" type="text" class="input-field" />
      <label>Content:</label>
      <textarea v-model="newContent" class="input-field"></textarea>
      <button @click="postAnnouncement" class="material-button">Post</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const announcements = ref([]);
const newTitle = ref('');
const newContent = ref('');
const currentUser = ref(null);
const canPost = ref(false);

onMounted(async () => {
  const stored = localStorage.getItem('user');
  if (!stored) {
    // Not logged in
    window.location.href = '/'; // or your login route
    return;
  }
  currentUser.value = JSON.parse(stored);

  // If user is not volunteer or above
  if (currentUser.value.accessLevel < 1) {
    window.location.href = '/';
    return;
  }

  // If user is HR or above
  if (currentUser.value.accessLevel >= 2) {
    canPost.value = true;
  }

  try {
    const res = await axios.get(`http://localhost:5001/api/announcements?username=${currentUser.value.username}`);
    announcements.value = res.data;
  } catch (err) {
    console.error('Fetch announcements error:', err);
    alert('Failed to fetch announcements');
  }
});

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString();
}

async function postAnnouncement() {
  if (!newTitle.value || !newContent.value) {
    alert('Title and content are required');
    return;
  }
  try {
    await axios.post('http://localhost:5001/api/announcements', {
      username: currentUser.value.username,
      title: newTitle.value,
      content: newContent.value
    });
    alert('Announcement posted!');
    newTitle.value = '';
    newContent.value = '';

    // Refresh list
    const res = await axios.get(`http://localhost:5001/api/announcements?username=${currentUser.value.username}`);
    announcements.value = res.data;
  } catch (err) {
    console.error('Post announcement error:', err);
    alert('Failed to post announcement');
  }
}
</script>

<style scoped>
.announcements-container {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

.announcement-item {
  background: #f9f9f9;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 8px;
  text-align: left;
}

.posted-by {
  font-size: 12px;
  color: #777;
}

.post-form {
  margin-top: 2rem;
  text-align: left;
}

.input-field {
  width: 100%;
  margin: 0.5rem 0;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.material-button {
  background-color: #6200ea;
  color: #fff;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 16px;
  font-weight: 500;
}
.material-button:hover {
  background-color: #3700b3;
}
</style>
