<script setup lang="ts">
defineProps({
    title: String
})
</script>

<template>
    <div class="record-header-text">
        {{ title }}
    </div>
</template>

<style scoped>
.record-header-text {
    flex: 1;
    text-align: center;
    height: 60px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
