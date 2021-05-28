![InertIA](./src/images/logo.png?raw=true)

![Netlify Status](https://api.netlify.com/api/v1/badges/e912a2f1-9929-40ed-87a0-5216d6b79f59/deploy-status)

Visit the InertIA 👉 https://inertia-web.netlify.app/

## ⭐ 功能
- 支援 Firstade 交易紀錄格式
- 資料呈現
  - 計算各目前持股的**股數(*shares*)**、**單位成本(*unit cost*)** 及 **總成本(*total cost*)**
  - 自動抓取各目前持股最新的**報價(*price*)**，並計算各目前持股的**市場價值(*market value*)**
  - 計算投資組合的**簡單報酬率(*simple return*)**及**年化報酬率(*annual return*)**
- 操作
  - 提供再平衡試算

## 📔 各式文件
- 👉 [使用教學](doc/usage/)
- 👉 [FAQ](doc/faq/)

## 🏗️ 架構/使用的技術/函式庫
- 前端 (web)
  - hosting on [Netlify](https://www.netlify.com/) - 部署快速輕鬆不費力
  - [reactjs](https://zh-hant.reactjs.org/)
  - [react-context](https://zh-hant.reactjs.org/docs/context.html) - 用來儲存「狀態」，目前用來儲存處理完的 data 及語言切換用的資料
  - [react-router](https://reactrouter.com/web/guides/quick-start) - 蠻基本的，練習一下
  - [material-ui](https://material-ui.com/zh/) - 練習一下
- 後端 (proxy server)
  - hosting on [Heroku](https://www.heroku.com/) - 部署快速輕鬆不費力，個人低流量專案幾乎可永久免費使用
  - 目前部署 [Rob--W/cors-anywhere](https://github.com/Rob--W/cors-anywhere) proxy server - 瀏覽器直接抓 financial data 會遇到 CORS 禁止的問題，故改到後端來抓

## 👺 Todo
- Features
  - support other securities' exported data format (TD Ameritrade, Interactive Brokers (IB), ...etc.)
- Improvements
  - 增加 client side cache 的機制
  - 增加 server cache 來避免 financial data provider 限流我的 server
  - 更明確的 API 來做前後端溝通，將資料處理邏輯挪一點到後端
  - 增加更多 financial data providers 避免有了 cache 還被 ban

## 🍀 其他用來打造此應用的免費資源
- Logo: https://www.freelogodesign.org/
- Illustrations:
  - https://themeisle.com/illustrations/
  - https://undraw.co/illustrations
- Icons: https://icons8.com/icons

## 誤差
- DIVIDEND 的資料對不起來
