<script setup lang="ts">
import StreamQualityReport from '@/components/StreamQualtiyReport.vue'
</script>

<template>
    <div class="header">
        <img class="logo" src="../assets/logo.png" alt="" />
    </div>

    <StreamQualityReport class="stream-quality-report" />
</template>

<style scoped>
.logo {
    position: relative;
    margin-top: 10px;
    margin-left: 10px;
}

.header {
    height: 65px;
    width: 100%;
    position: fixed;
    top: 0;

    background-color: var(--secondary-color);
}

.stream-quality-report {
    margin-top: 65px;
}
</style>
