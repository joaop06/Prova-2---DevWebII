<template>
  <main>
    <img alt="Vue logo" src="./assets/logo.png">
    <RegisterUser />
    <GetAllUser />
  </main>
</template>

<script>
import GetAllUser from './components/getAllUser.vue';
import RegisterUser from './components/registerUser.vue';



export default {
  name: 'App',
  components: {
    RegisterUser,
    GetAllUser
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
