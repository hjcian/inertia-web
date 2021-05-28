**Usage**
- [0. 使用測試資料](#0-使用測試資料)
- [1. 上傳檔案](#1-上傳檔案)
- [2. 觀看資產概要](#2-觀看資產概要)
- [3. 再平衡試算](#3-再平衡試算)
  - [`此次投入金額`](#此次投入金額)
  - [`目標配置`](#目標配置)
  - [`增加部位`](#增加部位)
  - [`實際調整`](#實際調整)
- [4. 結語](#4-結語)

---
### 0. 使用測試資料

若你還沒準備好你的交易紀錄檔，可下載[此檔案](https://raw.githubusercontent.com/hjcian/inertia-web/main/test/firstrade.csv)來試操作此網頁工具。檔案需另存成 `.csv` 檔，避免無預期的錯誤。

---
### 1. 上傳檔案

[點擊按鈕](https://inertia-web.netlify.app/)上傳交易紀錄檔：

<img width='700px' src="https://i.imgur.com/UwmterE.jpg"/>

---
### 2. 觀看資產概要

上傳成功後，可看到資產概要：

<img width='700px' src="https://i.imgur.com/9mfgwMc.jpg"/>

此時，你可能會看到許多資料還在讀取中，最長可能需要等待 30 秒。稍待片刻後會得到你的資產`總市場價值`、`簡單報酬率`、`年化報酬率`、各股`價格`及該股票的目前`市場價值`：

<img width='700px' src="https://i.imgur.com/s3RI86T.jpg"/>


---
### 3. 再平衡試算

點擊`再平衡試算`，可看到各股票的配置比例：

<img width='700px' src="https://i.imgur.com/iyywxOD.jpg"/>

#### `此次投入金額`

`此次投入金額` 預設帶入的是你目前的帳戶餘額。

但假設你此次注資 `2000` 元並順便做再平衡，則可修改金額成 `2908.89`。

此時你會發現在`目標配置`不變的狀況下，各股的`應調整`會反映出為了維持目標配置，每個部位在參考目前報價之後應該調整的股數：

<img width='700px' src="https://i.imgur.com/PF9vpa7.jpg"/>


#### `目標配置`
接著你可能想要調整你的部位比例。假設想要加重債券（低風險資產）比例，那麼就砍 `10%` 的 `VT`、然後各補 `5%` 給 `BND` 與 `BNDX` 吧！

可調整`目標配置`的比例（百分比），右列`應調整`會即時計算應調整幾股以滿足你的目標配置比例。

此時可以看到計算結果：`BND` 應 ***`購入`*** `38 股`、`VT` 應 ***`賣出`*** `39 股`，`BNDX` 則是應 ***`購入`*** `57 股`：

<img width='700px' src="https://i.imgur.com/NwMwEZb.jpg"/>


#### `增加部位`

但你可能還不滿足，這次有想要增加的部位，那麼你可以在`增加部位`填寫美股代號。

假設今天想要增加 `VNQI`*（Vanguard 全球不含美國房地產 ETF）*，就在此欄位填入股票代號後按下鍵盤 `enter`：

<img width='700px' src="https://i.imgur.com/CvMoHeO.jpg"/>


稍待伺服器抓取完報價，就會在表格中出現新的部位及它的目前報價：

<img width='700px' src="https://i.imgur.com/RbMBr7s.jpg"/>

#### `實際調整`

最後，可`實際調整`股數，並且即時計算出`調整後現金結餘`為多少。

但此時我想要再調整一下目標配置：分一半 `VNQ` 給 `VNQI` 吧！讓兩者的配置各為 `5%`。

然後直接將`實際調整`修改成建議的`應調整`股數，可以看到帳戶餘額用得差不多、剩下 `80.6` 元：

<img width='700px' src="https://i.imgur.com/M3MV5PJ.jpg"/>


---
### 4. 結語

🎉 恭喜！接著你可以參考此計算結果去券商網站實際下單了！

是不是很簡單呢？希望這個線上工具有幫助到你。

若有任何問題（臭蟲、新功能建議、UI/UX 改善建議、成為共同開發貢獻者），都歡迎與我聯繫：

> <img width='16px' src="https://img.icons8.com/doodle/96/000000/gmail.png"/> chutarojian@gmail.com
>
> <img width='16px' src="https://img.icons8.com/doodle/96/000000/facebook-new.png"/> [facebook 粉絲專頁](https://www.facebook.com/Inert-Investment-Assistant-102334822055864)