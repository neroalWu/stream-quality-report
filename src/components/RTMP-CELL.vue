<script setup lang="ts">
import Chart from '@/chartjs/auto'
import type TopiqResponse from '@/typescripts/stream-quality-report/struct/topiq-response'
import { ref, onBeforeUnmount, watch, onMounted } from 'vue'
import Util from '@/typescripts/util'
import HttpService from '@/typescripts/http-service';
import OverlayImage from './Overlay-Image.vue';

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

    const options = {
        onClick: (_: any, elements: any) => {
            if (elements.length > 0) {
                const clickedElement = elements[0]
                const index = clickedElement.index
                onclickPoint(index)
            }
        },
        responsive: true
    }

    const data = {
        labels: topiqResponse.timestamp_list.map((timestamp: number) =>
            Util.Instance.FormatHHMM(timestamp)
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
        data: data,
        options: options
    })
}

const showScreenshot = ref(false)
const imageSrc = ref('')

async function onclickPoint(timestampIndex: number) {
    showScreenshot.value = true;

    const region = props.topiq?.region;
    const streamType = props.topiq?.streamType
    const channel = props.topiq?.channel
    const timestamp = props.topiq?.timestamp_list[timestampIndex]
    const data = await HttpService.Instance.GetScreenshot(region, streamType, channel, timestamp)
  
    imageSrc.value = data
}

onMounted(() => {
    render(props.topiq as TopiqResponse)
})

onBeforeUnmount(() => {
    if (myChart) {
        myChart.destroy()
    }
})

function hideScreenshot() {
    showScreenshot.value = false
}
</script>

<template>
    <div class="rtmp-cell">
        <h3>{{ props.topiq?.streamType }} - {{ props.topiq?.channel }}</h3>

        <canvas ref="chartCanvas" height="50"></canvas>
    </div>

    <OverlayImage v-show="showScreenshot" @click.self="hideScreenshot" :imageSrc="imageSrc"/>
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
