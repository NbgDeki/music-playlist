<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input type="text" placeholder="Display name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-else disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import useSignup from '@/composables/useSignup';

export default {
  name: 'Signup',

  setup() {
    const { error, signup, isPending } = useSignup();

    const displayName = ref('');
    const email = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);

      if (!error.value) {
        console.log('user signed up');
      }
    };

    return {
      email,
      password,
      displayName,
      handleSubmit,
      isPending,
      error
    };
  }
};
</script>

<style></style>
