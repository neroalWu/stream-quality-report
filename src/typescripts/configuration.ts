const DEBUG: boolean = false

const SERVER_URL = DEBUG ? 'http://localhost:3000/stream-quality-report/' : 'http://10.20.30.228:3000/stream-quality-report/'

const API = {
    GET_TOPIQ_DATA: `${SERVER_URL}get-topiq-data`,
    GET_IMAGE: `${SERVER_URL}get-image`
}

export const CONFIGURATION = {
    QUERY_INTERVAL: 600000, // 10mins
    API: API
}
