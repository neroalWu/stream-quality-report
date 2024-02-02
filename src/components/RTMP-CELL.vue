<script setup lang="ts">
import Chart from '@/chartjs/auto'
import type TopiqData from '@/typescripts/data/topiq-data'
import { ref, onBeforeUnmount, watch, onMounted } from 'vue'
import Util from '@/typescripts/util'
import { CONFIGURATION } from '@/typescripts/configuration'

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
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    footer: () => {
                        return '點擊查看圖片'
                    }
                }
            }
        }
    }

    const CHART_CELL_CONFIG = CONFIGURATION.CHART_CELL
    const data = {
        labels: topiqData.timestamp_list.map((timestamp: number) =>
            Util.Instance.FormatDateHoursMinutes(timestamp)
        ),
        datasets: [
            {
                label: 'nr',
                data: topiqData.nr_list,
                borderColor: CHART_CELL_CONFIG.NR_COLOR_NORMAL,
                backgroundColor: CHART_CELL_CONFIG.NR_COLOR_NORMAL,
                borderWidth: 1,
                pointRadius: CHART_CELL_CONFIG.POINT_RADIUS_NORMAL,
                pointHoverRadius: CHART_CELL_CONFIG.POINT_RADIUS_HOVER
            },
            {
                label: 'nr_flive',
                data: topiqData.nr_flive_list,
                borderColor: CHART_CELL_CONFIG.FLIVE_COLOR_NORMAL,
                backgroundColor: CHART_CELL_CONFIG.FLIVE_COLOR_NORMAL,
                borderWidth: 1,
                pointRadius: CHART_CELL_CONFIG.POINT_RADIUS_NORMAL,
                pointHoverRadius: CHART_CELL_CONFIG.POINT_RADIUS_HOVER
            },
            {
                label: 'nr_spaq',
                data: topiqData.nr_spaq_list,
                borderColor: CHART_CELL_CONFIG.SPAQ_COLOR_NORMAL,
                backgroundColor: CHART_CELL_CONFIG.SPAQ_COLOR_NORMAL,
                borderWidth: 1,
                pointRadius: CHART_CELL_CONFIG.POINT_RADIUS_NORMAL,
                pointHoverRadius: CHART_CELL_CONFIG.POINT_RADIUS_HOVER
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

h4 {
    margin: 10px 0 10px 20px;
}
</style>
