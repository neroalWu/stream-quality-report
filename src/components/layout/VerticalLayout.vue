<script setup lang="ts"></script>

<template>
    <div class="vertical-layout">
        <slot></slot>
    </div>
</template>

<style scoped>
.vertical-layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
</style>
