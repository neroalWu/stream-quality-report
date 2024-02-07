<script setup lang="ts">
import { ref } from 'vue'
import { CONFIGURATION } from '@/typescripts/configuration'
import Util from '@/typescripts/util'
import { Chart } from '@/chartjs/auto'
import type DetailData from '@/typescripts/data/detail-data'

const chartCanvas = ref()

let myChart: Chart;

async function renderCanvas(detailData: DetailData) {
    if (!chartCanvas.value) {
        myChart && myChart.destroy()
        return
    }

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
        labels: detailData.timestamps.map((timestamp: number) =>
            Util.Instance.FormatDateHoursMinutes(timestamp)
        ),
        datasets: [
            {
                label: 'nr',
                data: detailData.nrs,
                borderColor: CHART_CELL_CONFIG.NR_COLOR_NORMAL,
                backgroundColor: CHART_CELL_CONFIG.NR_COLOR_NORMAL,
                borderWidth: 1,
                pointRadius: CHART_CELL_CONFIG.POINT_RADIUS_NORMAL,
                pointHoverRadius: CHART_CELL_CONFIG.POINT_RADIUS_HOVER
            },
            {
                label: 'flive',
                data: detailData.flives,
                borderColor: CHART_CELL_CONFIG.FLIVE_COLOR_NORMAL,
                backgroundColor: CHART_CELL_CONFIG.FLIVE_COLOR_NORMAL,
                borderWidth: 1,
                pointRadius: CHART_CELL_CONFIG.POINT_RADIUS_NORMAL,
                pointHoverRadius: CHART_CELL_CONFIG.POINT_RADIUS_HOVER
            },
            {
                label: 'spaq',
                data: detailData.spaqs,
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
</script>

<template>
    <canvas class="chart" ref="chartCanvas"></canvas>
</template>

<style scoped>
.chart {
    background-color: var(--secondary-color);
    border-radius: 20px;
    margin-top: 10px;
}
</style>
