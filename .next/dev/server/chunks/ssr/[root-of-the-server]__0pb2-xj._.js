module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/fraw-nextjs/lib/sanity.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "client",
    ()=>client,
    "getAllArticleSlugs",
    ()=>getAllArticleSlugs,
    "getArticleBySlug",
    ()=>getArticleBySlug,
    "getFeaturedArticle",
    ()=>getFeaturedArticle,
    "getLatestArticles",
    ()=>getLatestArticles,
    "getSiteSettings",
    ()=>getSiteSettings,
    "getUpcomingReleases",
    ()=>getUpcomingReleases,
    "urlFor",
    ()=>urlFor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/client/dist/index.browser.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$image$2d$url$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/image-url/lib/index.js [app-rsc] (ecmascript) <locals>");
;
;
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])({
    projectId: ("TURBOPACK compile-time value", "s1wp8h96"),
    dataset: ("TURBOPACK compile-time value", "production") || 'production',
    apiVersion: '2024-01-01',
    useCdn: true
});
const builder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$image$2d$url$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(client);
const urlFor = (source)=>builder.image(source);
async function getFeaturedArticle() {
    return client.fetch(`
    *[_type == "article" && featured == true] | order(publishedAt desc) [0] {
      _id, title, slug, category, excerpt, coverImage, author, publishedAt, readTime
    }
  `);
}
async function getLatestArticles(limit = 6) {
    return client.fetch(`
    *[_type == "article"] | order(publishedAt desc) [0...$limit] {
      _id, title, slug, category, excerpt, coverImage, author, publishedAt, readTime
    }
  `, {
        limit
    });
}
async function getArticleBySlug(slug) {
    return client.fetch(`
    *[_type == "article" && slug.current == $slug][0] {
      _id, title, slug, category, excerpt, body, coverImage, author, publishedAt, readTime
    }
  `, {
        slug
    });
}
async function getAllArticleSlugs() {
    return client.fetch(`*[_type == "article"]{ "slug": slug.current }`);
}
async function getUpcomingReleases(limit = 8) {
    return client.fetch(`
    *[_type == "release"] | order(releaseDate asc) [0...$limit] {
      _id, name, brand, image, releaseDate, price, colorway, hot, where, notes
    }
  `, {
        limit
    });
}
async function getSiteSettings() {
    return client.fetch(`
    *[_type == "siteSettings"][0] {
      siteTitle,
      siteDescription,
      navLinks,
      categories,
      tickerItems,
      newsletterHeading
    }
  `);
}
}),
"[project]/fraw-nextjs/app/article/[slug]/page.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArticlePage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/fraw-nextjs/lib/sanity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
;
const revalidate = 60;
async function generateStaticParams() {
    const slugs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllArticleSlugs"])();
    return slugs.map((s)=>({
            slug: s.slug
        }));
}
async function generateMetadata({ params }) {
    const { slug } = await params;
    const article = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getArticleBySlug"])(slug);
    if (!article) return {};
    return {
        title: `${article.title} — F.RAW 阜絡`
    };
}
function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
function renderBlock(block, index) {
    if (block._type === 'image') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
            style: {
                margin: '2em 0'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16/9'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["urlFor"])(block).width(1200).height(675).url(),
                        alt: block.caption || '',
                        fill: true,
                        style: {
                            objectFit: 'cover'
                        }
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                block.caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                    style: {
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'var(--muted)',
                        marginTop: '8px',
                        letterSpacing: '0.04em'
                    },
                    children: block.caption
                }, void 0, false, {
                    fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                    lineNumber: 38,
                    columnNumber: 11
                }, this)
            ]
        }, index, true, {
            fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
            lineNumber: 28,
            columnNumber: 7
        }, this);
    }
    if (block._type !== 'block') return null;
    const text = block.children?.map((child)=>child.text).join('') || '';
    if (!text) return null;
    const style = block.style || 'normal';
    if (style === 'h2') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
        style: {
            fontFamily: 'var(--font-serif)',
            fontSize: '26px',
            fontWeight: 700,
            color: 'var(--text)',
            margin: '2.2em 0 0.7em',
            letterSpacing: '0.02em',
            lineHeight: 1.3
        },
        children: text
    }, index, false, {
        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
        lineNumber: 54,
        columnNumber: 5
    }, this);
    if (style === 'h3') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        style: {
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            margin: '2em 0 0.6em'
        },
        children: text
    }, index, false, {
        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
        lineNumber: 58,
        columnNumber: 5
    }, this);
    if (style === 'blockquote') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
        style: {
            borderLeft: '2px solid var(--accent)',
            paddingLeft: '20px',
            margin: '2em 0',
            fontFamily: 'var(--font-serif)',
            fontSize: '16px',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--text)',
            lineHeight: 1.8
        },
        children: text
    }, index, false, {
        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
        lineNumber: 62,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        style: {
            fontFamily: 'var(--font-serif)',
            fontSize: '15px',
            fontWeight: 300,
            color: 'var(--text2)',
            lineHeight: 1.95,
            marginBottom: '1.6em'
        },
        children: text
    }, index, false, {
        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
async function ArticlePage({ params }) {
    const { slug } = await params;
    const article = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getArticleBySlug"])(slug);
    if (!article) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const catMap = {
        review: '評測',
        unboxing: '開箱',
        culture: '文化',
        release: '發售',
        'brand-story': '品牌故事'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                style: {
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '54px',
                    padding: '0 32px',
                    background: 'rgba(10,10,10,0.92)',
                    backdropFilter: 'blur(14px)',
                    borderBottom: '0.5px solid var(--border)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        style: {
                            fontFamily: 'var(--font-serif)',
                            fontSize: '18px',
                            fontWeight: 700,
                            letterSpacing: '0.28em'
                        },
                        children: "F.RAW 阜絡"
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        style: {
                            fontFamily: 'var(--font-mono)',
                            fontSize: '9px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--muted)'
                        },
                        children: "← 返回首頁"
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                style: {
                    maxWidth: '780px',
                    margin: '0 auto',
                    padding: '60px 32px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '28px',
                            flexWrap: 'wrap'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    background: 'var(--accent)',
                                    color: 'var(--accent-dark)',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '8px',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    padding: '2px 8px'
                                },
                                children: catMap[article.category] || article.category
                            }, void 0, false, {
                                fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            article.publishedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '10px',
                                    color: 'var(--muted)',
                                    letterSpacing: '0.06em'
                                },
                                children: formatDate(article.publishedAt)
                            }, void 0, false, {
                                fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this),
                            article.readTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '10px',
                                    color: 'var(--muted)',
                                    letterSpacing: '0.06em'
                                },
                                children: [
                                    article.readTime,
                                    " 分鐘閱讀"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this),
                            article.author && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '10px',
                                    color: 'var(--muted)',
                                    letterSpacing: '0.06em'
                                },
                                children: [
                                    "By ",
                                    article.author
                                ]
                            }, void 0, true, {
                                fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontFamily: 'var(--font-serif)',
                            fontSize: '44px',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            letterSpacing: '0.02em',
                            color: 'var(--text)',
                            marginBottom: '20px'
                        },
                        children: article.title
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    article.excerpt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: 'var(--font-serif)',
                            fontSize: '15px',
                            fontWeight: 300,
                            color: 'var(--text2)',
                            lineHeight: 1.9,
                            borderLeft: '2px solid var(--accent)',
                            paddingLeft: '18px',
                            marginBottom: '36px'
                        },
                        children: article.excerpt
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this),
                    article.coverImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '16/7',
                            marginBottom: '48px',
                            overflow: 'hidden'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["urlFor"])(article.coverImage).width(1400).height(613).url(),
                            alt: article.title,
                            fill: true,
                            style: {
                                objectFit: 'cover'
                            },
                            priority: true
                        }, void 0, false, {
                            fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                            lineNumber: 129,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: article.body?.map((block, i)=>renderBlock(block, i))
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: '60px',
                            paddingTop: '24px',
                            borderTop: '0.5px solid var(--border)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            style: {
                                fontFamily: 'var(--font-mono)',
                                fontSize: '9px',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'var(--muted)'
                            },
                            children: "← 返回 F.RAW"
                        }, void 0, false, {
                            fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/fraw-nextjs/app/article/[slug]/page.js",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
}),
"[project]/fraw-nextjs/app/article/[slug]/page.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/fraw-nextjs/app/article/[slug]/page.js [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0pb2-xj._.js.map