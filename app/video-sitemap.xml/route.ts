import { NextResponse } from 'next/server';

// 视频分类和 ID 配置（与 page.tsx 保持一致）
const videoCategories = [
  {
    key: "multilingual",
    title: "Multilingual content",
    ids: ["22955", "22969", "22977", "22868"],
    dir: "languages",
  },
  {
    key: "songs",
    title: "Songs & Music Videos",
    ids: ["22742", "22810", "22863", "22935", "22947"],
    dir: "songs",
  },
  {
    key: "cartoons",
    title: "Cartoons & Characters",
    ids: ["22893", "22943", "22960"],
    dir: "cartoons",
  },
  {
    key: "ads",
    title: "Ads & Promos",
    ids: ["22737", "22953"],
    dir: "ads",
  },
  {
    key: "podcasts",
    title: "Podcasts / Product Demos / News",
    ids: ["22800", "22802", "22844", "22928"],
    dir: "blogs",
  },
  {
    key: "shorts",
    title: "Shorts & Vlogs",
    ids: ["22823", "22927", "22956"],
    dir: "short-videos",
  },
  {
    key: "memes",
    title: "Memes & Parodies",
    ids: ["22876", "22855"],
    dir: "parody",
  },
];

// 语言映射
const languageMap: Record<string, string> = {
  "22955": "Hindi",
  "22969": "English",
  "22977": "Japanese",
  "22868": "Chinese",
};

// 与 ExampleVideos 文案保持一致的分类描述
const categoryDescriptions: Record<string, string> = {
  multilingual:
    "many languages (English, Chinese/Mandarin, Japanese, Hindi, Spanish, French, German, Portuguese, Korean, Arabic, Russian, and other major languages)",
  songs: "sing-along covers, duets, lyric-synced performances",
  cartoons: "animated hosts, kid-friendly narration, voice swaps",
  ads: "15–30s product spots, feature highlights, brand intros",
  podcasts: "virtual anchors, multilingual briefings, how-tos",
  shorts: "daily stories, travel explainers, creator intros, social clips",
  memes: "over-the-top reactions, remixed lines, comedic dubs",
};

// 转义 XML 特殊字符
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = "https://www.infinitetalkai.org";
  const cdnUrl = "https://cdn.infinitetalkai.org";
  const publicationDate = "2024-01-01T00:00:00+00:00";

  // 生成所有视频的站点地图条目
  const videoEntries = videoCategories.flatMap((category) =>
    category.ids.map((id) => {
      const thumbnailUrl = `${cdnUrl}/${category.dir}/infinite-talk-ai-${id}.jpg`;
      const contentUrl = `${cdnUrl}/${category.dir}/infinite-talk-ai-${id}.mp4`;
      const language = languageMap[id] || "";
      const title = language
        ? `${category.title} - ${language} Example`
        : `${category.title} Example - Video ${id}`;
      const categoryInfo = categoryDescriptions[category.key] || category.title;
      const baseLabel = language
        ? `${language} ${category.title.toLowerCase()}`
        : category.title.toLowerCase();
      const description = `${baseLabel} — ${categoryInfo}. Created with Infinite Talk AI: studio-grade lip sync, natural expression, multilingual publishing.`;

      // 视频观看页面 URL（指向首页的视频区域，使用锚点）
      const watchPageUrl = `${baseUrl}#multilingual-content`;

      return {
        watchPageUrl,
        thumbnailUrl,
        title,
        description,
        contentUrl,
        publicationDate,
        category: category.title,
      };
    })
  );

  // 生成 XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videoEntries
      .map(
        (video) => `  <url>
    <loc>${escapeXml(video.watchPageUrl)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(video.thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${escapeXml(video.contentUrl)}</video:content_loc>
      <video:publication_date>${video.publicationDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>`
      )
      .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

