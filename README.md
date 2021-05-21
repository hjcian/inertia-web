![InertIA](./src/images/logo.png?raw=true)

![Netlify Status](https://api.netlify.com/api/v1/badges/e912a2f1-9929-40ed-87a0-5216d6b79f59/deploy-status)

Visit the InertIA 👉 <a href="https://inertia-web.netlify.app/" target="_blank" rel="noopener">https://inertia-web.netlify.app/</a>


## ⭐ 功能
- 支援 Firstade 交易紀錄格式
- 計算各目前持股的**股數(*shares*)**、**單位成本(*unit cost*)** 及 **總成本(*total cost*)**
- 自動抓取各目前持股最新的**報價(*price*)**，並計算各目前持股的**市場價值(*market value*)**
- 計算投資組合的**簡單報酬率(*simple return*)**及**年化報酬率(*annual return*)**

## ⚛️ 使用的技術/函式庫
- react.js
- react-context
- react-router
- material-ui

## 👺 Todo
- Features
  - 計算各目前持股的配置比例，並提供再平衡操作
  - support other securities' exported data format (TD Ameritrade, Interactive Brokers (IB), ...etc.)
- Improvements
  - pass validation function to `react-dropzone` as callback
  - use client side cache (cookie?) for caching price data :face
  - use specific REST API to get price data
  - use in-memory cache for price data

## 🍀 其他用來打造此應用的免費資源
- Logo: https://www.freelogodesign.org/