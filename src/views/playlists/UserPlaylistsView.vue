<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <list-view :playlists="playlists"></list-view>
    </div>
    <router-link class="btn" :to="{ name: 'createPlaylist' }"
      >Create a new playlist</router-link
    >
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/getUser';
import ListView from '@/components/ListView.vue';

export default {
  components: { ListView },

  name: 'User Playlists',

  setup() {
    const { user } = getUser();
    const { documents: playlists } = getCollection('playlists', [
      'userId',
      '==',
      user.value.uid
    ]);

    console.log(playlists);

    return {
      playlists
    };
  }
};
</script>

<style></style>
