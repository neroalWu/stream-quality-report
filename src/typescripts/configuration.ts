const DEBUG: boolean = true

const SERVER_URL = DEBUG
    ? 'http://localhost:3000/stream-quality-report/'
    : 'http://10.22.0.108:3000/stream-quality-report/'

const API = {
    GET_SUMMARY: `${SERVER_URL}get-api-summary`,
    GET_DETAILS: `${SERVER_URL}get-api-details`,
    GET_VIDEO: `${SERVER_URL}get-api-video`
}

const CHART_CELL = {
    POINT_RADIUS_NORMAL: 4,
    POINT_RADIUS_HOVER: 6,

    NR_COLOR_NORMAL: 'rgba(255, 131, 122, 1)',
    FLIVE_COLOR_NORMAL: 'rgba(255, 192, 106, 1)',
    SPAQ_COLOR_NORMAL: 'rgba(181, 138, 255, 1)'
}

const RECORD_HEADER_LIST = [
    '協定',
    '桌號',
    'NR 平均',
    'NR 標準差',
    'FLIVE 平均',
    'FLIVE 標準差',
    'SPAQ 平均',
    'SPAQ 標準差'
]

export const CONFIGURATION = {
    QUERY_INTERVAL: 600000, // 10mins
    API: API,
    CHART_CELL: CHART_CELL,

    RECORD_HEADER_LIST: RECORD_HEADER_LIST
}
