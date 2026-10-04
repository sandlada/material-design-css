---
title: Agent Instructions for com.sandlada.material-design-css
---

# AGENTS.md — 專案給 AI 編程代理的快速指引

## 項目説明

此項目用於如何使用 `@sandlada/material-design-css` 這個開源 npm CSS 框架來構建網頁。

此項目包含示例頁面和相關的教學，旨在幫助開發者快速上手並實現 Material Design 的風格。

## 技術棧

- TypeScript
- Astro
- MDX
- TailwindCSS

## 目錄結構

- **頁面**: `src/pages/` 包含 MDX 範例（`index.mdx`, `palette.mdx` 等）。
- **元件**: `src/components/` 存放 UI 元件（`Header.astro`, `NavigationDrawer.astro` 等）。
- **樣式**: `src/styles/tailwind.css` 為主要樣式入口。
- **文檔**: `docs/` 包含 `@sandlada/material-design-css` 的說明文件和該 npm 的目錄結構。

## 常用命令

- **安裝依賴**: `npm install`
- **開發伺服器**: `npm run dev`
- **建置**: `npm run build`
- **靜態預覽**: `npm run preview` 或參閱 `package.json` 的 scripts

（請以 `package.json` 中的 scripts 為準；此處為方便代理快速參考）

## 有用的文件（連結）

- 教學: [docs/material-design-css-tutorial.md](docs/material-design-css-tutorial.md)
- 範例頁面清單: [src/pages](src/pages)
- 組件: [src/components](src/components)

## 代理行為建議（簡明規則）

- **最小輸出**: 以最小可執行變更為原則，變更需具名且提供檔案路徑。
- **連結，不複製**: 當有更完整的文件（`docs/`）時，盡量使用連結並摘要關鍵點。
- **格式化**: 如果修改程式碼檔案，請保留原專案的程式風格與縮排。

如果需要更詳細或特定領域（測試、CI、發佈）的代理策略，可建立額外的 `*.instructions.md` 或專門的 skill 檔案。
