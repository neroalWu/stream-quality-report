<script setup lang="ts">
import Chart from '@/chartjs/auto'
import type TopiqData from '@/typescripts/data/topiq-data'
import { ref, onBeforeUnmount, watch, onMounted, nextTick } from 'vue'
import Util from '@/typescripts/util'
import { CONFIGURATION } from '@/typescripts/configuration'
import ContainerContentText from './ContainerContentText.vue'

const props = defineProps({
    topiqData: Object
})

const emit = defineEmits(['onclickPoint'])

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let myChart: Chart | null = null

const isExpand = ref(true)

watch(
    () => props.topiqData as TopiqData,
    (newVal) => {
        render(newVal)
    }
)

watch(isExpand, () => {
    render(props.topiqData as TopiqData)
})

async function render(topiqData: TopiqData) {
    await nextTick()

    if (!chartCanvas.value || !isExpand.value) {
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

function toggle() {
    isExpand.value = !isExpand.value
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
    <div class="rtmp-cell" @click="toggle" title="點擊展開/折疊">
        <ContainerContentText
            :content="topiqData?.streamType"
            :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.STREAM_TYPE"
        />
        <ContainerContentText
            :content="topiqData?.channel"
            :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.CHANNEL"
        />

        <ContainerContentText
            :content="Util.Instance.GetMean(topiqData?.nr_list, 6).toString()"
            :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.NR_M"
        />

        <ContainerContentText
            :content="Util.Instance.GetStandardDeviation(topiqData?.nr_list, 6).toString()"
            :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.NR_SD"
        />

        <ContainerContentText
            :content="Util.Instance.GetMean(topiqData?.nr_flive_list, 6).toString()"
            :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.FLIVE_M"
        />

        <ContainerContentText
            :content="Util.Instance.GetStandardDeviation(topiqData?.nr_flive_list, 6).toString()"
            :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.FLIVE_SD"
        />

        <ContainerContentText
            :content="Util.Instance.GetMean(topiqData?.nr_spaq_list, 6).toString()"
            :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.SPAQ_M"
        />

        <ContainerContentText
            :content="Util.Instance.GetStandardDeviation(topiqData?.nr_spaq_list, 6).toString()"
            :minWidth="CONFIGURATION.COLUMN_MIN_WIDTH.SPAQ_SD"
        />

        <br />
        <canvas
            class="chart"
            ref="chartCanvas"
            height="50px"
            v-if="isExpand"
            @click="
                (event) => {
                    event.stopPropagation()
                }
            "
        ></canvas>
    </div>
</template>

<style scoped>
.rtmp-cell {
    background-color: var(--secondary-color);
    padding: 15px 0px 15px 0px;
    border: 1px solid var(--primary-color);
    height: fit-content;
}

.rtmp-cell:hover {
    cursor: pointer;
}

.chart {
    margin-top: 20px;
}

.chart:hover {
    cursor: default;
}
</style>
