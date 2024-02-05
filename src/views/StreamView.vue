<script setup lang="ts">
import router from '@/router'

console.log('neroal:', router.currentRoute.value.query)
</script>

<template>
    <div class="header">
        <img class="logo" src="../assets/logo.png" alt="" />
    </div>

    <body></body>
</template>

<style scoped>
body {
    min-width: 720px;
}
.logo {
    position: relative;
    margin-top: 10px;
    margin-left: 10px;
}

.header {
    height: 65px;
    width: 100%;

    background-color: var(--secondary-color);
}
</style>
