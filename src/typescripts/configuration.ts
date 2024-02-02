const DEBUG: boolean = true

const SERVER_URL = DEBUG ? 'http://localhost:3000/stream-quality-report/' : 'http://10.20.30.228:3000/stream-quality-report/'

const API = {
    GET_TOPIQ_DATA: `${SERVER_URL}get-topiq-data`,
    GET_IMAGE: `${SERVER_URL}get-image`
}

const CHART_CELL = {
    POINT_RADIUS_NORMAL: 4,
    POINT_RADIUS_HOVER: 6,

    NR_COLOR_NORMAL: 'rgba(255, 131, 122, 1)',
    FLIVE_COLOR_NORMAL: 'rgba(255, 192, 106, 1)',
    SPAQ_COLOR_NORMAL: 'rgba(181, 138, 255, 1)',
}

const COLUMN_PADDING_LEFT = 10
const COLUMN_PADDING_RIGHT = 10

const COLUMN_MIN_WIDTH = {
    REGION: 60,
    STREAM_TYPE: 60,
    CHANNEL: 80,
    RESOLUTION: 60,
    NR_M: 180,
    NR_SD: 180,
    FLIVE_M: 170,
    FLIVE_SD: 170,
    SPAQ_M: 170,
    SPAQ_SD: 170,
}

export const CONFIGURATION = {
    QUERY_INTERVAL: 600000, // 10mins
    API: API,
    CHART_CELL: CHART_CELL,

    COLUMN_MIN_WIDTH: COLUMN_MIN_WIDTH,
    COLUMN_PADDING_LEFT: COLUMN_PADDING_LEFT,
    COLUMN_PADDING_RIGHT: COLUMN_PADDING_RIGHT
}
