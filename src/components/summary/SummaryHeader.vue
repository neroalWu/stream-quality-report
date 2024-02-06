<script setup lang="ts">
import { CONFIGURATION } from '@/typescripts/configuration'
import SummaryHeaderText from './SummaryHeaderText.vue'
</script>

<template>
    <div class="record-header">
        <SummaryHeaderText
            v-for="(title, index) in CONFIGURATION.RECORD_HEADER_LIST"
            :key="index"
            :title="title"
        />
    </div>
</template>

<style scoped>
.record-header {
    display: flex;
    height: 60px;
    background-color: var(--secondary-color);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border: 1px solid var(--primary-color);
    top: 120px;
}
</style>
