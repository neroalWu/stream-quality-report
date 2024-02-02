<script setup lang="ts">
import { CONFIGURATION } from '@/typescripts/configuration'
defineProps({
    content: String,
    minWidth: Number
})
</script>

<template>
    <div
        class="cell-text"
        :style="{
            minWidth: `${minWidth}px`,
            paddingLeft: `${CONFIGURATION.COLUMN_PADDING_LEFT}px`,
            paddingRight: `${CONFIGURATION.COLUMN_PADDING_RIGHT}px`
        }"
    >
        {{ content }}
    </div>
</template>

<style scoped>
.cell-text {
    text-align: center;
    display: inline-block;
}
</style>
