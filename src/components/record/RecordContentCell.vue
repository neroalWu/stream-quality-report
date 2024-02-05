<script setup lang="ts">
import Util from '@/typescripts/util'
import RecordContentText from './RecordContentText.vue'
import router from '@/router'
import type TopiqData from '@/typescripts/data/topiq-data'

const props = defineProps({
    index: Number,
    topiqData: Object
})

const content_list = [
    props.topiqData?.streamType,
    props.topiqData?.channel,
    Util.Instance.GetMean(props.topiqData?.nr_list, 6).toString(),
    Util.Instance.GetStandardDeviation(props.topiqData?.nr_list, 6).toString(),
    Util.Instance.GetMean(props.topiqData?.nr_flive_list, 6).toString(),
    Util.Instance.GetStandardDeviation(props.topiqData?.nr_flive_list, 6).toString(),
    Util.Instance.GetMean(props.topiqData?.nr_spaq_list, 6).toString(),
    Util.Instance.GetStandardDeviation(props.topiqData?.nr_spaq_list, 6).toString()
]

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
    const topiq = props.topiqData as TopiqData
    router.push({
        path: '/stream',
        query: { region: topiq.region, streamType: topiq.streamType, channel: topiq.channel }
    })
}
</script>

<template>
    <div class="record-cell" @click="onclickPoint" title="點擊查看詳細資訊">
        <RecordContentText
            v-for="(content, index) in content_list"
            :key="index"
            :content="content"
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
