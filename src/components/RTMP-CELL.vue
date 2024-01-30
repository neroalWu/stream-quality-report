<script setup lang="ts">
import Chart from '@/chartjs/auto'
import type TopiqData from '@/typescripts/data/topiq-data'
import { ref, onBeforeUnmount, watch, onMounted } from 'vue'
import Util from '@/typescripts/util'

const props = defineProps({
    topiqData: Object
})

const emit = defineEmits(['onclickPoint'])

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let myChart: Chart | null = null

watch(
    () => props.topiqData as TopiqData,
    (newVal) => {
        render(newVal)
    }
)

function render(topiqData: TopiqData) {
    if (!chartCanvas.value) return

    const ctx = chartCanvas.value.getContext('2d')

    if (!ctx) return

    const options = {
        onClick: (_: any, elements: any) => {
            if (elements.length > 0) {
                const clickedElement = elements[0]
                const index = clickedElement.index
                emit('onclickPoint', index, props.topiqData)
            }
        },
        responsive: true
    }

    const data = {
        labels: topiqData.timestamp_list.map((timestamp: number) =>
            Util.Instance.FormatHHMM(timestamp)
        ),
        datasets: [
            {
                label: 'nr',
                data: topiqData.nr_list,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'nr_flive',
                data: topiqData.nr_flive_list,
                borderColor: 'rgba(245, 187, 49, 1)',
                backgroundColor: 'rgba(245, 187, 49, 1)',
                borderWidth: 1
            },
            {
                label: 'nr_spaq',
                data: topiqData.nr_spaq_list,
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
        data: data,
        options: options
    })
}

onMounted(() => {
    render(props.topiqData as TopiqData)
})

onBeforeUnmount(() => {
    if (myChart) {
        myChart.destroy()
    }
})

</script>

<template>
    <div class="rtmp-cell">
        <h3>{{ props.topiqData?.streamType }} - {{ props.topiqData?.channel }}</h3>

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