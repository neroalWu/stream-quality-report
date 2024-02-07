<script setup lang="ts">
import type Pair from '@/typescripts/types/pair'
const props = defineProps({
    title: String,
    paris: Array<Pair<String, String>>
})
</script>

<template>
    <div class="detail-card">
        <div class="header">{{ props.title }}</div>
        <div class="content">
            <div class="info-row" v-for="(pair, index) in props.paris" :key="index">
                <div class="label">{{ pair.key }}</div>
                <div class="value">{{ pair.value }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.detail-card {
    flex: 1;
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: var(--secondary-color);
}

.header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.content {
    font-size: 16px;
}

.info-row {
    display: flex;
    margin-bottom: 5px;
}

.label {
    width: 150px;
    font-weight: bold;
}

.value {
    flex: 1;
}
</style>
