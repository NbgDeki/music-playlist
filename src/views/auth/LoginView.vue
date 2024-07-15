<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-else disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import useLogin from '@/composables/useLogin';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',

  setup() {
    const { error, login, isPending } = useLogin();
    const router = useRouter();

    const email = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);

      if (!error.value) {
        router.push({ name: 'userPlaylists' });
      }
    };

    return {
      email,
      password,
      handleSubmit,
      error,
      isPending
    };
  }
};
</script>

<style></style>
