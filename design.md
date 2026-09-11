# Snake Atlas — Design System

本文件集中管理「蛇之圖鑑」靜態網站的整體視覺設計，未來新增頁面或條目時，請優先遵循此規範。

## 1. 設計方向

關鍵字：自然、神秘、精緻、探索、標本館。

視覺採深森林背景搭配黃綠色高亮，呼應蛇類鱗片、植被與夜行生態。整體避免過度卡通化，保持圖鑑與自然博物館的專業感。

## 2. 色彩系統

- 背景 `--bg`: `#08100D`
- 主要表面 `--surface`: `#101A15`
- 次要表面 `--surface-2`: `#15231C`
- 主要文字 `--text`: `#F0F5EF`
- 次要文字 `--muted`: `#A5B3AA`
- 主強調色 `--accent`: `#B7E34D`
- 次強調色 `--accent-2`: `#65A75F`
- 分隔線 `--line`: `rgba(255,255,255,.1)`

新增 UI 元件時，優先使用上述 CSS Variables，不直接散落新的色碼。

## 3. 字體

- 中文與介面：`Noto Sans TC`
- 英文展示標題：`Playfair Display`
- 程式碼：系統 monospace

標題使用緊密字距與較大尺寸，內文保持寬鬆行距以提升閱讀性。

## 4. 版面

- 內容最大寬度：`1180px`
- 主要區塊左右邊距：桌機 `24px`，手機 `18px`
- 主要圓角：`22px`
- 卡片間距：`20px`
- Section 上下留白：桌機約 `86px`，手機約 `64px`

## 5. 響應式斷點

- `<= 900px`：Hero 單欄、圖鑑卡片雙欄
- `<= 640px`：導覽轉為漢堡選單、圖鑑卡片單欄、Footer 單欄

## 6. 卡片規範

每張蛇類卡片包含：

1. 主圖片（4:3）
2. 棲地標籤
3. 中文名稱
4. 學名
5. 短介紹
6. 特徵摘要
7. 詳細條目按鈕

滑鼠移入時僅做輕微上浮與圖片縮放，避免過度動畫。

## 7. 多媒體條目規範

每個條目可擴充以下欄位：

```js
{
  name: "蛇種名稱",
  scientific: "Scientific name",
  habitat: "forest | desert | wetland | ...",
  habitatLabel: "顯示用棲地名稱",
  image: "圖片路徑或 URL",
  description: "條目介紹",
  fact: "一句特徵摘要",
  htmlWork: "entries/example.html",
  slides: "assets/slides/example.html"
}
```

若未來要支援影片，可新增：

```js
video: "https://..."
```

若要支援多張圖片，可把 `image` 擴充為：

```js
images: ["a.jpg", "b.jpg", "c.jpg"]
```

## 8. 可及性

- 所有內容圖片需有 `alt`
- 可點擊元素需支援鍵盤操作
- 文字與背景保持高對比
- Dialog 必須提供明確關閉按鈕
- 搜尋框使用可辨識的 label

## 9. 維護原則

- 視覺變數集中於 `styles.css` 的 `:root`
- 條目資料集中於 `script.js` 的 `snakes` 陣列
- 單一蛇種的互動 HTML 作品放在 `entries/`
- 簡報內容放在 `assets/slides/`
- 圖片建議放在 `assets/images/`

未來若條目超過 20 筆，建議將資料拆到獨立 `data/snakes.json`，再由 JavaScript 載入。
