<script setup lang="ts">
import Chart from '@/chartjs/auto'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    topiq: Object
})

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let myChart: Chart | null = null

onMounted(() => {
    if (!chartCanvas.value) return

    const ctx = chartCanvas.value.getContext('2d')

    if (!ctx) return

    const data = {
        labels: props.topiq?.timestamp_list.map((timestamp: number) =>
            formatDate(timestamp)
        ).slice(-10),
        datasets: [
            {
                label: 'nr',
                data: props.topiq?.nr_list.slice(-10),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'nr_flive',
                data: props.topiq?.nr_flive_list.slice(-10),
                borderColor: 'rgba(245, 187, 49, 1)',
                backgroundColor: 'rgba(245, 187, 49, 1)',
                borderWidth: 1
            },
            {
                label: 'nr_spaq',
                data: props.topiq?.nr_spaq_list.slice(-10),
                borderColor: 'rgba(132, 99, 255, 1)',
                backgroundColor: 'rgba(132, 99, 255, 1)',
                borderWidth: 1
            },
        ]
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: data
    })
})

function formatDate(timestamp: number): string {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

onBeforeUnmount(() => {
    if (myChart) {
        myChart.destroy()
    }
})
</script>

<template>
    <div class="rtmp-cell">
        <h2>{{ props.topiq?.channel }}</h2>
        <canvas ref="chartCanvas" height="50"></canvas>
    </div>
</template>

<style scoped>
.rtmp-cell {
    background-color: var(--secondary-color);
    margin-bottom: 10px;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
}

h2 {
    margin-left: 10px;
}
</style>
