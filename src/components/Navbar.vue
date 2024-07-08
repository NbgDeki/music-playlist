<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ninja.png" alt="Ninja" />
      <h1><router-link :to="{ name: 'home' }">Muso Ninjas</router-link></h1>
      <div class="links">
        <button @click="handleClick">Logout</button>
        <router-link class="btn" :to="{ name: 'signup' }">Sign up</router-link>
        <router-link class="btn" :to="{ name: 'login' }">Log in</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from '@/composables/useLogout';
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',

  setup() {
    const { logout } = useLogout();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
      router.push({ name: 'login' });
    };

    return {
      handleClick
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
</style>
