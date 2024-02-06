<script setup lang="ts">
defineProps({
    content: String
})
</script>

<template>
    <div class="cell-text">
        {{ content }}
    </div>
</template>

<style scoped>
.cell-text {
    flex: 1;
    text-align: center;
    display: inline-block;
}
</style>
