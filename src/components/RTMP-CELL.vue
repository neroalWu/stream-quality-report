<script setup lang="ts">
import Chart from '@/chartjs/auto'
import type TopiqResponse from '@/typescripts/stream-quality-report/struct/topiq-response'
import { ref, onBeforeUnmount, watch, onMounted } from 'vue'
import Util from '@/typescripts/util'

const props = defineProps({
    topiq: Object
})

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let myChart: Chart | null = null

watch(
    () => props.topiq as TopiqResponse,
    (newVal) => {
        render(newVal)
    }
)

function render(topiqResponse: TopiqResponse) {
    if (!chartCanvas.value) return

    const ctx = chartCanvas.value.getContext('2d')

    if (!ctx) return

    const data = {
        labels: topiqResponse.timestamp_list.map((timestamp: number) =>
            Util.Instance.FormatDate(timestamp)
        ),
        datasets: [
            {
                label: 'nr',
                data: topiqResponse.nr_list,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'nr_flive',
                data: topiqResponse.nr_flive_list,
                borderColor: 'rgba(245, 187, 49, 1)',
                backgroundColor: 'rgba(245, 187, 49, 1)',
                borderWidth: 1
            },
            {
                label: 'nr_spaq',
                data: topiqResponse.nr_spaq_list,
                borderColor: 'rgba(132, 99, 255, 1)',
                backgroundColor: 'rgba(132, 99, 255, 1)',
                borderWidth: 1
            }
        ]
    }

    if (myChart) {
        myChart.destroy()
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: data
    })
}

onMounted(() => {
    render(props.topiq as TopiqResponse)
})

onBeforeUnmount(() => {
    if (myChart) {
        myChart.destroy()
    }
})
</script>

<template>
    <div class="rtmp-cell">
        <h3>{{ props.topiq?.streamType }} - {{ props.topiq?.channel }}</h3>

        <canvas ref="chartCanvas" height="50"></canvas>
    </div>
</template>

<style scoped>
.rtmp-cell {
    background-color: var(--secondary-color);
    border-radius: 10px;
    margin-bottom: 10px;
}

h3 {
    margin-top: 0px;
    margin-bottom: 0px;
    position: relative;
    top: 10px;
    margin-left: 20px;
}
</style>
