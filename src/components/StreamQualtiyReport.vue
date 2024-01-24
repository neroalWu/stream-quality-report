<script setup lang="ts">
import HttpService from '@/typescripts/http-service'
import StreamQualityReportResponse from '@/typescripts/stream-quality-report/struct/stream-quality-report-response'
import { reactive, ref, watch } from 'vue'

let reactiveResponse: StreamQualityReportResponse = reactive(new StreamQualityReportResponse())

async function Init() {
    const response: StreamQualityReportResponse = await HttpService.Instance.GetAll()
    reactiveResponse.list = response.list
}
Init()

let selectedRegion = ref('ALL')
let selectedStreamType = ref('ALL')

watch(selectedRegion, (region) => {
    console.log(region)
})

watch(selectedStreamType, (type) => {
    console.log(type)
})
</script>

<template>
    <main>
        <label for="region">選擇區域: </label>
        <select name="region" v-model="selectedRegion">
            <option value="ALL">ALL</option>
            <option value="CEBU">CEBU</option>
        </select><br>

        <label for="stream_type">選擇協定: </label>
        <select name="stream_type" v-model="selectedStreamType">
            <option value="ALL">ALL</option>
            <option value="RTMP">RTMP</option>
            <option value="FLV">FLV</option>
        </select>
        <ul>
            <li v-for="element in reactiveResponse.list" :key="element._id">
                {{ element }}
            </li>
        </ul>
    </main>
</template>
