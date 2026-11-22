# 个人主页（GitHub Pages）

纯手写的静态多页站点：HTML + CSS + 一点点原生 JS。无框架、无构建、无依赖、无追踪。

> 站点文案目前全部是英文（按需求）。`README.md` 和 `内容待填清单.md` 这两份给你自己看的文档仍是中文。

## 页面结构

六个并列页面，导航互相链接（每个页面顶部都是同一套导航）：

```
index.html       Home              左图右文 + 研究方向分块
education.html   Education         学历时间线
industry.html    Industry Work     工作经历时间线
research.html    Research Projects 项目卡片网格
ideas.html       Ideas             想法列表
contact.html     Contact           邮箱、社交链接、状态
```

每个内页的结构都是同一套：`page-head`（编号 + 一句话标题 + 一句说明）+ `section`（内容区）。
内容区可以任意加结构，不受首页长度限制。

```
.
├── index.html / education.html / industry.html / research.html / ideas.html / contact.html
├── 404.html
├── assets/
│   ├── css/style.css       # 设计 token + 全部样式（含响应式）
│   ├── js/main.js          # 移动端菜单 / 导航描边 / 渐入 / 年份
│   └── img/
│       ├── portrait.svg     # 首页左侧的人物插图
│       ├── logos/           # 学校 / 公司标识（Education、Industry 页）
│       └── clients/         # 客户标识（Industry 页）
├── .nojekyll
├── robots.txt
├── README.md
├── 内容待填清单.md
└── docs/preview.png
```

## 首页结构

**上半部分**：左边人像、右边文字（眉标 → 大标题 → 一段介绍），三个按钮在文字下方。

- 人像用的是 `assets/img/portrait.svg`（4:5 占位图）。换真实照片时，替换这个文件或改 `<img class="portrait">` 的 `src` 即可；CSS 用 `aspect-ratio: 4/5` + `object-fit: cover`，任何 4:5 图片都不会变形。
- 窗口窄于 860px 时上下堆叠，图片在上。

**下半部分**：四个研究方向分块，每块 = 编号 + 标题 + 示意图 + 一段介绍。

- **顺序可以随便改**：整块 `<article class="direction">` 上下移动即可。左上角编号是 CSS 计数器（`.directions` 上的 `counter-reset`）自动生成的，不需要手动改数字。
- 加第五个方向：复制一个 `<article>`，改标题、示意图、段落。桌面两列、手机一列自动排。
- 想改成三列：把 `.directions` 的 `grid-template-columns: repeat(2, minmax(0, 1fr))` 改成 `repeat(3, ...)`。

**示意图**是内联 SVG（`viewBox="0 0 320 180"`，16:9），所以随卡片缩放且永远清晰。统一的笔触样式在 `style.css` 的「8. Research directions」段落底部：

| class | 作用 |
| --- | --- |
| `.s-line` | 中性结构线 |
| `.s-accent` | 强调色线条 |
| `.s-dash` | 虚线（叠在上面两个 class 上） |
| `.s-dot` / `.s-dot-a` | 中性点 / 强调点 |
| `.s-fill` | 半透明强调色色块 |
| `.s-label` | 极小的等宽标签（`m/z`、`t`） |

## 本地预览

不需要安装任何东西：

```bash
python3 -m http.server 8000
# 或 npx serve .
```

打开 <http://localhost:8000> 。

## 部署到 GitHub Pages

1. 新建仓库，名字建议 `你的用户名.github.io`（地址即根路径 `https://你的用户名.github.io/`）。
   用其他名字也行，站点挂在子路径下——本项目所有链接都是相对路径，两种都正常。
2. 在本目录：
   ```bash
   git init
   git add -A
   git commit -m "init: personal homepage"
   git branch -M main
   git remote add origin git@github.com:你的用户名/仓库名.git
   git push -u origin main
   ```
3. 仓库 → **Settings → Pages** → Source 选 **Deploy from a branch** → `main` / `/ (root)` → Save。
4. 等 1–2 分钟访问 `https://你的用户名.github.io/`。
5. 样式没生效多半是缓存：Cmd/Ctrl + Shift + R 强刷。

## 怎么改

- **配色/字体/圆角**：`assets/css/style.css` 顶部 `:root` 的 token，改一处全站生效。
- **加一段经历**：复制一个 `<article class="tl-row">`。
- **加一个项目**：复制一个 `<article class="card">`。
- **加一条想法**：复制一个 `<li>`。
- **换校徽 / 公司标识**：图片放 `assets/img/logos/`，改对应 `<img>` 的 `src`。
- **换客户标识**：图片放 `assets/img/clients/`，色块固定 104×36，加一条 `<li>` 即可。
  `.logo-chip` 是 56×38 的固定色块（校徽用，保证几个色块一样宽），`logo-chip--wide` 给它自适应宽度（公司文字标用），
  `logo-chip--invert` 用于白底图（会反相成深色）。
- **加一个新页面**：复制 `ideas.html`，改 `<title>`、导航里的 `aria-current`、`page-head` 文案；然后在其余页面的导航里加一条链接。
  > 导航是手写在每个页面里的（这样无 JS 也能正确高亮、不闪）。页面变多后如果要避免重复，可以再抽成构建步骤，或换成 Jekyll/Astro 的 include。

## 一些说明

- 字体用系统字体栈（含中文回退），不请求外部字体：零网络依赖、首屏不闪。
- 动效遵循 `prefers-reduced-motion`。
- 无 JavaScript 时内容完整可见，导航高亮由 HTML 里的 `aria-current="page"` 决定，不依赖 JS。
- 页面间跳转是真实导航（不是锚点滚动），所以可以直接分享 `education.html` 这类链接。
