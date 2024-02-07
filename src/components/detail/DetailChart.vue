<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CONFIGURATION } from '@/typescripts/configuration'
import Util from '@/typescripts/util'
import { Chart } from '@/chartjs/auto'
import DetailData from '@/typescripts/data/detail-data'

const props = defineProps({
    title: String,
    detail: DetailData
})

const chartCanvas = ref()

async function renderCanvas() {
    const ctx = chartCanvas.value.getContext('2d')

    if (!ctx) return

    const options = {
        onClick: (_: any, elements: any) => {
            if (elements.length > 0) {
                const clickedElement = elements[0]
                const index = clickedElement.index
            }
        },
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    footer: () => {
                        return '點擊查看影片'
                    }
                }
            }
        }
    }

    const CHART_CELL_CONFIG = CONFIGURATION.CHART_CELL
    const data = {
        labels: props.detail?.timestamps.map((timestamp: number) =>
            Util.Instance.FormatDateHoursMinutes(timestamp)
        ),
        datasets: [
            {
                label: 'nr',
                data: props.detail?.nrs,
                borderColor: CHART_CELL_CONFIG.NR_COLOR_NORMAL,
                backgroundColor: CHART_CELL_CONFIG.NR_COLOR_NORMAL,
                borderWidth: 1,
                pointRadius: CHART_CELL_CONFIG.POINT_RADIUS_NORMAL,
                pointHoverRadius: CHART_CELL_CONFIG.POINT_RADIUS_HOVER
            },
            {
                label: 'flive',
                data: props.detail?.flives,
                borderColor: CHART_CELL_CONFIG.FLIVE_COLOR_NORMAL,
                backgroundColor: CHART_CELL_CONFIG.FLIVE_COLOR_NORMAL,
                borderWidth: 1,
                pointRadius: CHART_CELL_CONFIG.POINT_RADIUS_NORMAL,
                pointHoverRadius: CHART_CELL_CONFIG.POINT_RADIUS_HOVER
            },
            {
                label: 'spaq',
                data: props.detail?.spaqs,
                borderColor: CHART_CELL_CONFIG.SPAQ_COLOR_NORMAL,
                backgroundColor: CHART_CELL_CONFIG.SPAQ_COLOR_NORMAL,
                borderWidth: 1,
                pointRadius: CHART_CELL_CONFIG.POINT_RADIUS_NORMAL,
                pointHoverRadius: CHART_CELL_CONFIG.POINT_RADIUS_HOVER
            }
        ]
    }


    new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    })
}

onMounted(() => {
    renderCanvas()
})
</script>

<template>
    <div class="detail-chart">
        <div class="header">{{ props.title }}</div>
        <canvas ref="chartCanvas" height="50px"></canvas>
    </div>
</template>

<style scoped>
.detail-chart {
    background-color: var(--secondary-color);
    border-radius: 20px;
    padding: 10px;
    margin-top: 10px;
}

.header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>
