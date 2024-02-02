<script setup lang="ts">
import { CONFIGURATION } from '@/typescripts/configuration'
defineProps({
    title: String,
    minWidth: Number
})
</script>

<template>
    <div
        class="container-header-text"
        :style="{
            minWidth: `${minWidth}px`,
            paddingLeft: `${CONFIGURATION.COLUMN_PADDING_LEFT}px`,
            paddingRight: `${CONFIGURATION.COLUMN_PADDING_RIGHT}px`
        }"
    >
        {{ title }}
    </div>
</template>

<style scoped>
.container-header-text {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-weight: bold;
}
</style>
