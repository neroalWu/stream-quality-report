# 架構
```
           +---------+
           |   Vue   |
           +----+----+
                |
                |API Requests
                |
         +------+------+
         | API Gateway |
         +------+------+
                |
                |Route Requests
                |
        +-------+-------+
        |  IndexRouter  |
        +---------------+
        |/              |
        |/detail        |
        +-------+-------+
                |
       +--------+--------+Lazy Initialization
       |                 |
+------+-------+ +-------+------+
| SummaryView  | |  DetailView  |
+------+-------+ +-------+------+
       |                 |
       +--------+--------+
                |
        +-------+-------+
        |  HttpService  |
        +---------------+
        |getSummary     |
        |getDetail      |
        |getVideo       |
        +---------------+
```
- SummaryView: 簡略資料介面。
- DetailView: 詳細資料介面。
- HttpService: 處理所有http相關請求。
# 建置設定

```sh
npm install
```

## Compile and Hot-Reload for Development

```sh
npm run dev
```

## Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
