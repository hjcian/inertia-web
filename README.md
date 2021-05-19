# InertIA-web
![Netlify Status](https://api.netlify.com/api/v1/badges/e912a2f1-9929-40ed-87a0-5216d6b79f59/deploy-status)

try this to save your time 👉 https://inertia-web.netlify.app/

## ⭐ 功能
- 支援 Firstade 交易紀錄格式
- 計算各目前持股的股數、單位成本及總成本
- 自動抓取各目前持股最新的報價並計算市場價值
- 計算簡單報酬率及年化報酬率

## ⚛️ 使用的技術/函式庫
- react.js
- react-context
- react-router

## 👺 Todo
- Features
  - 計算各目前持股的配置比例，並提供再平衡操作
  - support other securities' exported data format (TD Ameritrade, Interactive Brokers (IB), ...etc.)
- Improvements
  - pass validation function to `react-dropzone` as callback
  - use client side cache (cookie?) for caching price data :face
  - use specific REST API to get price data
  - use in-memory cache for price data

## 🍀 其他用來打造此應用的免費資源
- Logo: https://www.freelogodesign.org/