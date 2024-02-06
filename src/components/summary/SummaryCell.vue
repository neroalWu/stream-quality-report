<script setup lang="ts">
import SummaryCellText from './SummaryCellText.vue'
import router from '@/router'
import Store from '@/typescripts/store/store'
import SummaryData from '@/typescripts/data/summary-data'

const props = defineProps({
    index: Number,
    summary: Object
})

const displays = [
    GetSummaryString(props.summary?.region),
    GetSummaryString(props.summary?.channel),
    GetSummaryString(props.summary?.nr_m),
    GetSummaryString(props.summary?.nr_sd),
    GetSummaryString(props.summary?.flive_m),
    GetSummaryString(props.summary?.flive_sd),
    GetSummaryString(props.summary?.spaq_m),
    GetSummaryString(props.summary?.spaq_sd)
]

function GetSummaryString(source: string) {
    if (!source) {
        return '-'
    }
    return source
}

// async function render(topiqData: TopiqData) {
//     await nextTick()

//     if (!chartCanvas.value || !isExpand.value) {
//         myChart && myChart.destroy()
//         return
//     }

//     const ctx = chartCanvas.value.getContext('2d')

//     if (!ctx) return

//     const options = {
//         onClick: (_: any, elements: any) => {
//             if (elements.length > 0) {
//                 const clickedElement = elements[0]
//                 const index = clickedElement.index
//                 emit('onclickPoint', index, props.topiqData)
//             }
//         },
//         responsive: true,
//         plugins: {
//             tooltip: {
//                 callbacks: {
//                     footer: () => {
//                         return '點擊查看圖片'
//                     }
//                 }
//             }
//         }
//     }

//     const CHART_CELL_CONFIG = CONFIGURATION.CHART_CELL
//     const data = {
//         labels: topiqData.timestamp_list.map((timestamp: number) =>
//             Util.Instance.FormatDateHoursMinutes(timestamp)
//         ),
//         datasets: [
//             {
//                 label: 'nr',
//                 data: topiqData.nr_list,
//                 borderColor: CHART_CELL_CONFIG.NR_COLOR_NORMAL,
//                 backgroundColor: CHART_CELL_CONFIG.NR_COLOR_NORMAL,
//                 borderWidth: 1,
//                 pointRadius: CHART_CELL_CONFIG.POINT_RADIUS_NORMAL,
//                 pointHoverRadius: CHART_CELL_CONFIG.POINT_RADIUS_HOVER
//             },
//             {
//                 label: 'nr_flive',
//                 data: topiqData.nr_flive_list,
//                 borderColor: CHART_CELL_CONFIG.FLIVE_COLOR_NORMAL,
//                 backgroundColor: CHART_CELL_CONFIG.FLIVE_COLOR_NORMAL,
//                 borderWidth: 1,
//                 pointRadius: CHART_CELL_CONFIG.POINT_RADIUS_NORMAL,
//                 pointHoverRadius: CHART_CELL_CONFIG.POINT_RADIUS_HOVER
//             },
//             {
//                 label: 'nr_spaq',
//                 data: topiqData.nr_spaq_list,
//                 borderColor: CHART_CELL_CONFIG.SPAQ_COLOR_NORMAL,
//                 backgroundColor: CHART_CELL_CONFIG.SPAQ_COLOR_NORMAL,
//                 borderWidth: 1,
//                 pointRadius: CHART_CELL_CONFIG.POINT_RADIUS_NORMAL,
//                 pointHoverRadius: CHART_CELL_CONFIG.POINT_RADIUS_HOVER
//             }
//         ]
//     }

//     if (myChart) {
//         myChart.destroy()
//     }

//     myChart = new Chart(ctx, {
//         type: 'line',
//         data: data,
//         options: options
//     })
// }

function onclickPoint() {
    Store.Instance.selectedSummary = props.summary as SummaryData
    router.push('/detail')
}
</script>

<template>
    <div class="record-cell" @click="onclickPoint" title="點擊查看詳細資訊">
        <SummaryCellText
            v-for="(value, key) in displays"
            :key="key"
            :content="value ? value.toString() : ''"
        />
        <!-- <canvas
            class="chart"
            ref="chartCanvas"
            height="50px"
            v-if="isExpand"
            @click="
                (event) => {
                    event.stopPropagation()
                }
            "
        ></canvas> -->
    </div>
</template>

<style scoped>
.record-cell {
    display: flex;
    background-color: var(--secondary-color);
    padding: 15px 0px 15px 0px;
    border: 1px solid var(--primary-color);
}

.record-cell:hover {
    cursor: pointer;
}
</style>
