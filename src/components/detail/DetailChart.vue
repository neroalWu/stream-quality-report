<script setup lang="ts">
import { ref, watch } from 'vue'
import { CONFIGURATION } from '@/typescripts/configuration'
import Util from '@/typescripts/util'
import { Chart } from '@/chartjs/auto'
import DetailData from '@/typescripts/data/detail-data'

const props = defineProps({
    title: String,
    detail: Object
})

const emits = defineEmits(['onclickPoint'])

const chartCanvas = ref()

async function renderCanvas(detail: DetailData) {
    const ctx = chartCanvas.value.getContext('2d')

    if (!ctx) return

    const options = {
        onClick: async (_: any, elements: any) => {
            if (elements.length > 0) {
                const clickedElement = elements[0]
                const timestampIndex = clickedElement.index

                emits('onclickPoint', timestampIndex)
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
        },

        maintainAspectRatio: false
    }

    const CHART_CELL_CONFIG = CONFIGURATION.CHART_CELL
    const data = {
        labels: detail?.timestamps.map((timestamp: number) =>
            Util.Instance.FormatDateHoursMinutes(timestamp)
        ),
        datasets: [
            {
                label: 'NR',
                data: detail?.nrs,
                borderColor: CHART_CELL_CONFIG.NR_COLOR_NORMAL,
                backgroundColor: CHART_CELL_CONFIG.NR_COLOR_NORMAL,
                borderWidth: 1,
                pointRadius: CHART_CELL_CONFIG.POINT_RADIUS_NORMAL,
                pointHoverRadius: CHART_CELL_CONFIG.POINT_RADIUS_HOVER
            },
            {
                label: 'FLIVE',
                data: detail?.flives,
                borderColor: CHART_CELL_CONFIG.FLIVE_COLOR_NORMAL,
                backgroundColor: CHART_CELL_CONFIG.FLIVE_COLOR_NORMAL,
                borderWidth: 1,
                pointRadius: CHART_CELL_CONFIG.POINT_RADIUS_NORMAL,
                pointHoverRadius: CHART_CELL_CONFIG.POINT_RADIUS_HOVER
            },
            {
                label: 'SPAQ',
                data: detail?.spaqs,
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

watch(
    () => props.detail,
    (detail) => {
        if (detail == null || detail == undefined) return
        renderCanvas(detail as DetailData)
    }
)
</script>

<template>
    <div class="detail-chart">
        <div class="header">{{ props.title }}</div>
        <canvas ref="chartCanvas" class="chart"></canvas>
    </div>
</template>

<style scoped>
.detail-chart {
    background-color: var(--secondary-color);
    border-radius: 20px;
    padding: 10px 10px 60px 10px;
    margin: 10px;
    max-height: 300px;
}

.header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>
