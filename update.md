下面这一份是**纯 Markdown 文本**，我刻意去掉了所有 ``` 代码块，你可以直接复制成一个 `.md` 文件使用，不会再出现代码块断开的问题。

---

# Infinite Talk AI 首页 & /lib 文档修改清单

> 建议文件名：`docs/infinite-talk-homepage-refactor-checklist.md`
> 按顺序逐条勾选即可。

---

## A. 全站用词与术语统一

### A1. 品牌名统一

目标：统一产品命名，避免混乱。

* [ ] 全局搜索并替换以下写法：

  * `infinite talk ai`
  * `infinitetalk`
  * `infinity talk`
  * `infinitetalk ai`
* [ ] 对外展示统一使用：**Infinite Talk AI**
* [ ] 技术语境（引用论文、讲架构）统一使用：**InfiniteTalk**

说明：

* 标题 / UI 文案：**Infinite Talk AI**
* 技术文档、/lib 说明中的模型：**InfiniteTalk**

---

### A2. 核心技术术语统一

目标：和论文术语一致。

出现以下概念时，统一写法：

* [ ] `Sparse-Frame Video Dubbing`
* [ ] `Streaming audio-driven generator`
* [ ] `Context frames` / `Temporal context windows`
* [ ] `Soft reference control`

---

## B. 首页文案修改（Hero + Why + Key Features + Technical Notes）

### B1. Hero 区域（顶部标题）

当前位置：

* H1：`Infinite Talk AI`
* 描述（当前版本略）

修改目标：加上 sparse-frame + streaming 概念。

* [ ] H1（可选增强）改为：
  Infinite Talk AI — Sparse-Frame Video Dubbing Engine
* [ ] 描述替换为：
  Audio-driven, sparse-frame video dubbing that turns images or footage into identity-stable talking video. A streaming generator scales to effectively infinite sequences, syncing lips, head motion, posture, and expressions to speech while preserving the original camera feel.
* [ ] Hero 区域增加技术说明链接按钮 / 文本：
  Learn how it works → /lib/sparse-frame-video-dubbing

---

### B2. 「Why Infinite Talk AI stands out」四条

#### B2-1. Multilingual to the core

修改目标：表达“内部测试 500+ 语言”，避免看起来像论文的结论。

* [ ] 文案替换为：
  Multilingual to the core
  Tested across 500+ languages and dialects in our internal pipeline — that’s our current test ceiling, not the model’s theoretical limit. Global voices, one pipeline.
* [ ] 段尾增加链接：
  Learn more about multilingual support → /lib/multilingual-support

---

#### B2-2. Infinite-length generation

修改目标：明确 streaming + context windows。

* [ ] 文案替换为：
  Infinite-length generation
  Designed for practically unlimited duration. Today we render up to 600s per pass with overlapping context windows, then batch and stitch chaptered episodes and hour-scale programs while preserving motion continuity.
* [ ] 段尾增加链接：
  Learn how the streaming architecture works → /lib/infinite-length-streaming-architecture

---

#### B2-3. Beyond lip sync: whole-frame dubbing

修改目标：显式写出 sparse-frame 机制。

* [ ] 标题改为：
  Beyond lip sync: sparse-frame, whole-frame dubbing
* [ ] 正文改为：
  Traditional video dubbing only edits the mouth region. Infinite Talk AI uses sparse-frame video dubbing to drive lips, head motion, posture, and micro-expressions from audio while referencing keyframes to preserve identity, emotional cadence, and camera trajectories.
* [ ] 段尾增加链接：
  Learn what sparse-frame video dubbing means → /lib/sparse-frame-video-dubbing

---

#### B2-4. Fast, high-quality outputs for any platform

修改目标：点出 SOTA，对接 benchmark 页。

* [ ] 文案改为：
  Fast, high-quality outputs for any platform
  Infinite Talk AI targets 480p / 720p / 1080p with crisp timing and identity stability, and achieves state-of-the-art lip and body motion synchronization on public dubbing benchmarks compared to systems like MuseTalk, LatentSync, OmniAvatar, and MultiTalk.
* [ ] 段尾增加链接：
  See metrics and benchmark details → /lib/benchmarks

---

### B3. Key Features 区块统一

#### B3-1. 标题中的品牌写法统一

目标：所有 Feature 标题里的产品名统一。

* [ ] 将下列标题中的品牌名全部统一：

  * `Whole-Frame Control with infinite talk ai` → `Whole-Frame Control with Infinite Talk AI`
  * `Sparse-Frame Dubbing in infinitetalk` → `Sparse-Frame Dubbing in InfiniteTalk`
  * `Temporal Context Windows in infinity talk` → `Temporal Context Windows in InfiniteTalk`
  * `Soft Reference Control in infinite talk` → `Soft Reference Control in InfiniteTalk`
  * `Multi-Speaker Pipelines via infinitetalk ai` → `Multi-Speaker Pipelines via Infinite Talk AI`
  * `Clarity & Prompt Controls in infinite talk ai` → `Clarity & Prompt Controls in Infinite Talk AI`

---

#### B3-2. 每条 Feature 文案增强 + 链接

1. Whole-Frame Control with Infinite Talk AI

   * [ ] 在该段正文末尾追加：
     Infinite Talk AI aligns lips, eye focus, head turns, and posture to audio, delivering audio-synchronized full-body motion over extended sequences while preserving identity.
     Learn more about full-body synchronization → /lib/sparse-frame-video-dubbing

2. Sparse-Frame Dubbing in InfiniteTalk

   * [ ] 正文替换为：
     A sparse keyframe strategy lets InfiniteTalk place control points where perception matters most. Those keyframes preserve identity, emotional cadence, iconic gestures, and camera trajectories, while the in-between frames follow the dubbed audio naturally. This avoids robotic stutter and keeps the performance expressive.
     Learn the theory behind sparse-frame dubbing → /lib/sparse-frame-video-dubbing

3. Temporal Context Windows in InfiniteTalk

   * [ ] 正文替换为：
     Chunked processing with overlapping temporal context windows (context frames) carries motion momentum forward between segments. InfiniteTalk reduces seams, flicker, and jitter across long sequences without flattening expression.
     See how context windows and motion momentum work → /lib/context-windows-and-motion-momentum
     （如果你合并到 streaming 页面，则将链接改为 `/lib/infinite-length-streaming-architecture`）

4. Soft Reference Control in InfiniteTalk

   * [ ] 在该段末尾追加：
     Control strength adapts to similarity between the current context and the reference. InfiniteTalk locks facial identity yet keeps head-and-body dynamics flexible and lifelike, based on a keyframe sampling strategy validated across multiple training regimes.
     Deep dive into soft reference control (M0–M3) → /lib/soft-reference-control

5. Multi-Speaker Pipelines via Infinite Talk AI

   * [ ] 文案调整为：
     Drive multiple characters with independent audio tracks and masks. Infinite Talk AI keeps each speaker distinct, even in fast, back-and-forth dialog, building multi-speaker control on top of the core InfiniteTalk architecture.
     How multi-speaker dubbing works → /lib/multi-speaker-dialogs

6. Clarity & Prompt Controls in Infinite Talk AI

   * [ ] 文案末尾追加：
     Guide output with clarity controls and prompt adjustments. Infinite Talk AI exposes concise switches for lip strength, expression damping, and wording-based style cues to match voice tone and script density.
     Prompt design and clarity controls → /lib/prompt-design

---

### B4. Technical Notes 区块：补充深度页面链接

目标：保持高阶感，同时提供细节入口。

* [ ] Phoneme-Aware Alignment in InfiniteTalk
  在该段末尾增加：
  Alignment details and sync metrics → /lib/alignment-and-sync

* [ ] Keyframe Sampling Strategy in InfiniteTalk
  在正文中说明这是 M0–M3 实验结论，并在末尾增加：
  See ablation results for reference sampling (M0–M3) → /lib/soft-reference-control

* [ ] Memory-Aware Processing in InfiniteTalk
  明确这是 context windows / streaming，并在末尾增加：
  Learn more about streaming and memory-aware processing → /lib/infinite-length-streaming-architecture

* [ ] Prompt-Driven Style & Clarity in Infinite Talk AI
  在末尾增加：
  Prompt design and clarity controls → /lib/prompt-design

* [ ] Latency & Throughput in Infinite Talk AI
  在末尾增加：
  Latency and throughput benchmarks → /lib/latency-and-throughput

---

## C. /lib 目录与技术文档页面

> 优先完成 C1 的 3 个页面，保证首页核心 claim 有技术说明支撑。

### C1. 第一优先级：必须先上线的 3 个页面

1. /lib/sparse-frame-video-dubbing

   * [ ] H1：Sparse-Frame Video Dubbing in InfiniteTalk
   * [ ] 建议小节：

     * Why mouth-only dubbing fails
     * What sparse-frame video dubbing is
     * Keyframes: identity, emotional cadence, iconic gestures, camera trajectory
     * Static vs dynamic scene examples

2. /lib/infinite-length-streaming-architecture

   * [ ] H1：Streaming Architecture for Infinite-Length Dubbing
   * [ ] 建议小节：

     * Naive audio-driven I2V / FL2V: drift and seams
     * Chunking + context frames
     * How we avoid long-sequence drift
     * Practical limits (e.g., 600s per pass) & stitching strategy

3. /lib/soft-reference-control

   * [ ] H1：Soft Reference Control and Keyframe Sampling
   * [ ] 建议小节：

     * Hard vs soft control
     * Why reference position matters
     * M0–M3 experiments & main findings
     * How we choose the production sampling strategy

---

### C2. 第二优先级：逐步补充的高级页面

根据开发节奏，依次补充：

* [ ] /lib/benchmarks
  数据集、指标、对比方法、量化结果、人类评测、小结。

* [ ] /lib/context-windows-and-motion-momentum
  或合并进 streaming 页面，详细解释 context frames 与 motion momentum。

* [ ] /lib/multilingual-support
  多语言 pipeline 描述、测试方法与当前限制。

* [ ] /lib/multi-speaker-dialogs
  Multi-speaker 设计，如何构建在 InfiniteTalk 架构之上。

* [ ] /lib/prompt-design
  Prompt 写法指南 + clarity 控制说明。

* [ ] /lib/latency-and-throughput
  实际性能测试数据与推荐配置。

* [ ] /lib/camera-control（可选）
  记录 SDEdit / Uni3C 等相机控制实验与对比。

---

## D. 推荐执行顺序

* [ ] 第一步：完成 A（品牌名与术语统一）
* [ ] 第二步：完成 B（首页 Hero / Why / Key Features / Technical Notes 文案修改 + 链接占坑）
* [ ] 第三步：完成 C1 三个 /lib 页面
* [ ] 第四步：逐步补充 C2 其余技术文档页面

完成后，首页的每一个“硬核主张”都能从 /lib 中找到对应的技术支撑。
