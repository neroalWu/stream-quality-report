<script setup lang="ts">
import RecordContentCell from './RecordContentCell.vue'

const props = defineProps({
    topiqResponse: Object
})
</script>

<template>
    <div class="record-content" v-if="props.topiqResponse?.list.length > 0">
        <RecordContentCell
            v-for="(topiqData, index) in props.topiqResponse?.list"
            :key="index"
            :index="index"
            :topiqData="topiqData"
        />
    </div>
</template>

<style scoped>
.record-content {
    display: block;
    margin-left: 10px;
    margin-right: 10px;
}
</style>
