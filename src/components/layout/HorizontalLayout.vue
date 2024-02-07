<script setup lang="ts"></script>

<template>
    <div class="horizontal-layout">
        <slot></slot>
    </div>
</template>

<style scoped>
.horizontal-layout {
    display: flex;
    width: 100%;
    flex-direction: row;
}
</style>
