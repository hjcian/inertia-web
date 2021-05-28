**Usage**
- [0. 使用測試資料](#0-使用測試資料)
- [1. 上傳檔案](#1-上傳檔案)
- [2. 觀看資產概要](#2-觀看資產概要)
- [3. 再平衡試算](#3-再平衡試算)
  - [此次投入金額](#此次投入金額)
  - [目標配置](#目標配置)
  - [增加部位](#增加部位)
  - [實際調整](#實際調整)
- [4. 結尾](#4-結尾)

### 0. 使用測試資料

若你還沒準備好你的交易紀錄檔，可下載[此檔案](https://raw.githubusercontent.com/hjcian/inertia-web/main/test/firstrade.csv)來試操作此網頁工具。檔案需另存成 `.csv` 檔，避免無預期的錯誤。

---
### 1. 上傳檔案

[點擊按鈕](https://inertia-web.netlify.app/)上傳交易紀錄檔：

![click button](https://i.imgur.com/UwmterE.jpg)

---
### 2. 觀看資產概要

上傳成功後，可看到資產概要：

![asset overview](https://i.imgur.com/9mfgwMc.jpg)

此時，你可能會看到許多資料還在讀取中，最長可能需要等待 30 秒。稍待片刻後會得到你的資產總市場價值、簡單報酬率、年化報酬率、各股價格及該股票的目前市場價值：

![asset overview (updated)](https://i.imgur.com/s3RI86T.png)


---
### 3. 再平衡試算

點擊`再平衡試算`，可看到各股票的配置比例：

![](https://i.imgur.com/iyywxOD.jpg)


#### 此次投入金額

`此次投入金額` 預設帶入的是你目前的帳戶餘額。

但假設你此次注資 `2000` 元並順便做再平衡，則可修改金額成 `2908.89`。

此時你會發現在`目標配置`不變的狀況下，各股的`應調整`會反映出為了維持目標配置，每個部位在參考目前報價之後應該調整的股數。

見下圖：

![](https://i.imgur.com/PF9vpa7.jpg)


#### 目標配置
接著你可能想要調整你的部位比例，覺得我的風險承受度變低了，想要加重債券（低風險資產）比例。那麼就砍 `10%` 的 `VT`、然後各補 `5%` 給 `BND` 與 `BNDX` 吧！

可調整`目標配置`的比例（百分比），右列會即時計算應調整幾股，以達到你的目標配置。

此時可以看到，`BND` 應在此次 ***`購入`*** `38 股`、`VT` 則會需要 ***`賣出`*** `39 股`，`BNDX` 則是需要 ***`購入`*** `57 股`：

![](https://i.imgur.com/NwMwEZb.jpg)


#### 增加部位

但你可能還不滿足，這次有想要增加的部位，那麼可以在`增加部位`的欄位填寫股票代號。

故假設今天我想要增加 `VNQI`*（Vanguard 全球不含美國房地產 ETF）*，就在此欄位填入股票代號後按 enter：

![](https://i.imgur.com/CvMoHeO.jpg)

稍待伺服器抓取完報價，就會在表格中出現新的配置及它的目前報價：

![](https://i.imgur.com/RbMBr7s.jpg)

#### 實際調整

最後，你會需要`實際調整`，並且即時了解`調整後現金結餘`為多少。

故我們分一半 `VNQ` 給 `VNQI` 吧！讓兩者的配置各為 `5%`。

然後你可以直接將`實際調整`修改成建議的`應調整`股數，可以看到帳戶餘額用得差不多、剩下 `80.6` 元：

![](https://i.imgur.com/M3MV5PJ.jpg)


---
### 4. 結尾

🎉 恭喜！是不是很簡單呢？希望這個線上工具有幫助到你。

若有任何問題（臭蟲、新功能建議、UI/UX 改善建議、成為共同開發貢獻者），都歡迎與我聯繫：

> <img width='16px' src="https://img.icons8.com/doodle/96/000000/gmail.png"/> chutarojian@gmail.com
>
> <img width='16px' src="https://img.icons8.com/doodle/96/000000/facebook-new.png"/> [facebook 粉絲專頁](https://www.facebook.com/Inert-Investment-Assistant-102334822055864)