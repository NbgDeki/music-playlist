<template>
  <div class="navbar">
    <nav>
      <router-link :to="{ name: 'home' }"
        ><img src="@/assets/ninja.png" alt="Ninja"
      /></router-link>
      <h1><router-link :to="{ name: 'home' }">Muso Ninjas</router-link></h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'createPlaylist' }"
            >Create Playlist</router-link
          >
          <router-link :to="{ name: 'userPlaylists' }"
            >My Playlists</router-link
          >
          <span>Hi there, {{ user.displayName }}</span>
          <button @click="handleClick">Logout</button>
        </div>

        <div v-else>
          <router-link class="btn" :to="{ name: 'signup' }"
            >Sign up</router-link
          >
          <router-link class="btn" :to="{ name: 'login' }">Log in</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import getUser from '@/composables/getUser';
import useLogout from '@/composables/useLogout';
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',

  setup() {
    const { logout } = useLogout();
    const { user } = getUser();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
      router.push({ name: 'login' });
    };

    return {
      handleClick,
      user
    };
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: #fff;
}

nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    margin-left: 20px;
  }

  .links {
    margin-left: auto;

    a,
    button {
      margin-left: 16px;
      font-size: 14px;
    }
  }
  img {
    max-height: 60px;
  }
}

span {
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
}
</style>
