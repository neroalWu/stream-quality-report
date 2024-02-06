<script setup lang="ts"></script>

<template>
    <div class="side-container">
        <slot></slot>
    </div>
</template>
<style scoped>
.side-container {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--accent-color);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    height: 100vh;
}
</style>
