<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div class="playlist-details" v-if="playlist">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet
      </div>
      <div class="single-song" v-for="song in playlist.songs" :key="song.id">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>

        <button v-if="ownership" @click="handleClick(song.id)">Delete</button>
      </div>
      <add-song v-if="ownership" :playlist="playlist"></add-song>
    </div>
  </div>
</template>

<script>
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import useDocument from '@/composables/useDocument';
import useStorage from '@/composables/useStorage';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AddSong from '@/components/AddSong.vue';

export default {
  components: { AddSong },

  name: 'PlaylistDetails',

  props: ['id'],

  setup(props) {
    const { id } = props;
    const { error, document: playlist } = getDocument('playlists', id);
    const { user } = getUser();
    const { deleteDoc, updateDoc } = useDocument('playlists', id);
    const { deleteImage } = useStorage();
    const router = useRouter();

    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid === playlist.value.userId
      );
    });

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath);
      await deleteDoc();
      router.push({ name: 'home' });
    };

    const handleClick = async (id) => {
      const songs = playlist.value.songs.filter((song) => {
        return song.id !== id;
      });

      await updateDoc({ songs });
    };

    return {
      error,
      playlist,
      ownership,
      handleDelete,
      deleteImage,
      handleClick
    };
  }
};
</script>

<style lang="scss">
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 80px;
}

.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;

  img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
}

.playlist-info {
  text-align: center;

  h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }

  p {
    margin-bottom: 20px;
  }
}

.username {
  color: #999;
}

.description {
  text-align-last: left;
}

.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #ebebeb;
  margin-bottom: 20px;
}
</style>
