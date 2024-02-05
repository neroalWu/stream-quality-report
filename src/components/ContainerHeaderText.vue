<script setup lang="ts">
defineProps({
    title: String
})
</script>

<template>
    <div class="container-header-text">
        {{ title }}
    </div>
</template>

<style scoped>
.container-header-text {
    flex: 1;
    text-align: center;
    height: 60px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
