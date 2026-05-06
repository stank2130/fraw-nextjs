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
"[project]/fraw-nextjs/app/page.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/fraw-nextjs/lib/sanity.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
;
;
;
;
;
const revalidate = 60;
function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('zh-TW', {
        month: 'long',
        day: 'numeric'
    });
}
async function HomePage() {
    const [featured, articles, releases, settings] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFeaturedArticle"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLatestArticles"])(6),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUpcomingReleases"])(4),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSiteSettings"])()
    ]);
    const navItems = settings?.navLinks?.length > 0 ? settings.navLinks : [
        {
            label: '發售',
            href: '#'
        },
        {
            label: '評測',
            href: '#'
        },
        {
            label: '文化',
            href: '#'
        },
        {
            label: '典藏',
            href: '#'
        }
    ];
    const cats = settings?.categories || {};
    const catLabel = (key)=>{
        const map = {
            review: cats.review || '評測',
            unboxing: cats.unboxing || '開箱',
            culture: cats.culture || '文化',
            release: cats.release || '發售',
            'brand-story': cats.brandStory || '品牌故事'
        };
        return map[key] || key;
    };
    const tickerItems = settings?.tickerItems?.length > 0 ? settings.tickerItems : [
        'Jordan 4 Bred Reimagined',
        'New Balance 1906R',
        'Adidas Samba OG 補貨',
        'Nike Air Max 95'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh'
        },
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: 'var(--font-serif)',
                            fontSize: '18px',
                            fontWeight: 700,
                            letterSpacing: '0.28em'
                        },
                        children: settings?.siteTitle || 'F.RAW 阜絡'
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '28px'
                        },
                        children: navItems.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '9px',
                                    letterSpacing: '0.16em',
                                    textTransform: 'uppercase',
                                    color: 'var(--muted)',
                                    cursor: 'pointer'
                                },
                                children: l.label
                            }, i, false, {
                                fileName: "[project]/fraw-nextjs/app/page.js",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: 'var(--font-mono)',
                            fontSize: '9px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            background: 'var(--accent)',
                            color: 'var(--accent-dark)',
                            padding: '6px 14px',
                            cursor: 'pointer'
                        },
                        children: "訂閱電子報"
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/fraw-nextjs/app/page.js",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    height: '28px',
                    borderBottom: '0.5px solid var(--border)',
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flexShrink: 0,
                            padding: '0 16px',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            background: 'var(--accent)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '8px',
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            color: 'var(--accent-dark)'
                        },
                        children: "最新消息"
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflow: 'hidden'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                width: 'max-content',
                                animation: 'tick 40s linear infinite'
                            },
                            children: [
                                ...tickerItems,
                                ...tickerItems
                            ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '9px',
                                        letterSpacing: '0.06em',
                                        color: 'var(--muted)',
                                        whiteSpace: 'nowrap',
                                        padding: '0 6px'
                                    },
                                    children: [
                                        item,
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--hint)',
                                                margin: '0 12px'
                                            },
                                            children: "—"
                                        }, void 0, false, {
                                            fileName: "[project]/fraw-nextjs/app/page.js",
                                            lineNumber: 99,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/fraw-nextjs/app/page.js",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/fraw-nextjs/app/page.js",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/fraw-nextjs/app/page.js",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `@keyframes tick { from { transform: translateX(0) } to { transform: translateX(-50%) } }`
            }, void 0, false, {
                fileName: "[project]/fraw-nextjs/app/page.js",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            featured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    minHeight: '520px',
                    borderBottom: '0.5px solid var(--border)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '52px 44px',
                            borderRight: '0.5px solid var(--border)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            marginBottom: '28px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '9px',
                                                    letterSpacing: '0.16em',
                                                    textTransform: 'uppercase',
                                                    color: 'var(--accent)'
                                                },
                                                children: "封面故事"
                                            }, void 0, false, {
                                                fileName: "[project]/fraw-nextjs/app/page.js",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1,
                                                    height: '0.5px',
                                                    background: 'var(--border2)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/fraw-nextjs/app/page.js",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '8px',
                                                    border: '0.5px solid var(--border2)',
                                                    color: 'var(--muted)',
                                                    padding: '2px 10px'
                                                },
                                                children: catLabel(featured.category)
                                            }, void 0, false, {
                                                fileName: "[project]/fraw-nextjs/app/page.js",
                                                lineNumber: 121,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: 'var(--font-serif)',
                                            fontSize: '52px',
                                            fontWeight: 700,
                                            lineHeight: 1.05,
                                            letterSpacing: '0.04em',
                                            marginBottom: '20px'
                                        },
                                        children: featured.title
                                    }, void 0, false, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: 'var(--font-serif)',
                                            fontSize: '13px',
                                            fontWeight: 300,
                                            color: 'var(--text2)',
                                            lineHeight: 1.9,
                                            maxWidth: '340px',
                                            marginBottom: '36px'
                                        },
                                        children: featured.excerpt
                                    }, void 0, false, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/fraw-nextjs/app/page.js",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '9px',
                                            color: 'var(--muted)',
                                            letterSpacing: '0.06em'
                                        },
                                        children: [
                                            formatDate(featured.publishedAt),
                                            featured.readTime && ` · ${featured.readTime} 分鐘`
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/article/${featured.slug?.current}`,
                                        style: {
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '9px',
                                            letterSpacing: '0.12em',
                                            textTransform: 'uppercase',
                                            borderBottom: '1px solid var(--accent)',
                                            paddingBottom: '2px'
                                        },
                                        children: "閱讀全文 →"
                                    }, void 0, false, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/fraw-nextjs/app/page.js",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'var(--surface)',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        children: featured.coverImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["urlFor"])(featured.coverImage).width(800).height(600).url(),
                            alt: featured.title,
                            fill: true,
                            style: {
                                objectFit: 'cover'
                            },
                            priority: true
                        }, void 0, false, {
                            fileName: "[project]/fraw-nextjs/app/page.js",
                            lineNumber: 147,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                color: 'var(--hint)'
                            },
                            children: "封面圖片"
                        }, void 0, false, {
                            fileName: "[project]/fraw-nextjs/app/page.js",
                            lineNumber: 150,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/fraw-nextjs/app/page.js",
                lineNumber: 109,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    padding: '44px 32px',
                    borderBottom: '0.5px solid var(--border)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '24px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: 'var(--font-mono)',
                                fontSize: '9px',
                                fontWeight: 700,
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase'
                            },
                            children: "最新文章"
                        }, void 0, false, {
                            fileName: "[project]/fraw-nextjs/app/page.js",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3,1fr)',
                            gap: '24px'
                        },
                        children: articles.map((article)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: `/article/${article.slug?.current}`,
                                style: {
                                    display: 'block',
                                    cursor: 'pointer'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: '100%',
                                            aspectRatio: '16/9',
                                            background: 'var(--surface2)',
                                            marginBottom: '16px',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        },
                                        children: article.coverImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["urlFor"])(article.coverImage).width(600).height(338).url(),
                                            alt: article.title,
                                            fill: true,
                                            style: {
                                                objectFit: 'cover'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/fraw-nextjs/app/page.js",
                                            lineNumber: 166,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '8px',
                                            letterSpacing: '0.14em',
                                            textTransform: 'uppercase',
                                            color: 'var(--accent)',
                                            display: 'block',
                                            marginBottom: '8px'
                                        },
                                        children: catLabel(article.category)
                                    }, void 0, false, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontFamily: 'var(--font-serif)',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            lineHeight: 1.55,
                                            marginBottom: '10px'
                                        },
                                        children: article.title
                                    }, void 0, false, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '8px',
                                            color: 'var(--muted)'
                                        },
                                        children: [
                                            formatDate(article.publishedAt),
                                            article.readTime && ` · ${article.readTime} 分鐘`
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, article._id, true, {
                                fileName: "[project]/fraw-nextjs/app/page.js",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/fraw-nextjs/app/page.js",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    padding: '44px 32px',
                    borderBottom: '0.5px solid var(--border)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '24px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: 'var(--font-mono)',
                                fontSize: '9px',
                                fontWeight: 700,
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase'
                            },
                            children: "發售雷達"
                        }, void 0, false, {
                            fileName: "[project]/fraw-nextjs/app/page.js",
                            lineNumber: 186,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4,1fr)',
                            gap: '14px'
                        },
                        children: releases.map((release)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: release.hot ? '#0C0B00' : 'var(--surface)',
                                    border: `0.5px solid ${release.hot ? '#3A3800' : 'var(--border)'}`,
                                    padding: '14px 13px',
                                    position: 'relative'
                                },
                                children: [
                                    release.hot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '1px',
                                            background: 'var(--accent)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 195,
                                        columnNumber: 31
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: '100%',
                                            aspectRatio: '4/3',
                                            background: 'var(--surface2)',
                                            marginBottom: '12px',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        children: release.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$fraw$2d$nextjs$2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["urlFor"])(release.image).width(300).height(225).url(),
                                            alt: release.name,
                                            fill: true,
                                            style: {
                                                objectFit: 'contain',
                                                padding: '8px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/fraw-nextjs/app/page.js",
                                            lineNumber: 198,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '8px',
                                                color: 'var(--hint)'
                                            },
                                            children: "圖片"
                                        }, void 0, false, {
                                            fileName: "[project]/fraw-nextjs/app/page.js",
                                            lineNumber: 201,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 196,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '8px',
                                            letterSpacing: '0.14em',
                                            textTransform: 'uppercase',
                                            color: 'var(--muted)',
                                            marginBottom: '4px'
                                        },
                                        children: release.brand
                                    }, void 0, false, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: 'var(--font-serif)',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            lineHeight: 1.4,
                                            color: release.hot ? 'var(--accent)' : 'var(--text)',
                                            marginBottom: '12px'
                                        },
                                        children: release.name
                                    }, void 0, false, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 205,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '8px',
                                                    color: 'var(--muted)'
                                                },
                                                children: release.releaseDate
                                            }, void 0, false, {
                                                fileName: "[project]/fraw-nextjs/app/page.js",
                                                lineNumber: 207,
                                                columnNumber: 17
                                            }, this),
                                            release.hot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '7px',
                                                    background: 'var(--accent)',
                                                    color: 'var(--accent-dark)',
                                                    padding: '2px 7px',
                                                    letterSpacing: '0.1em',
                                                    textTransform: 'uppercase'
                                                },
                                                children: "本週強推"
                                            }, void 0, false, {
                                                fileName: "[project]/fraw-nextjs/app/page.js",
                                                lineNumber: 209,
                                                columnNumber: 19
                                            }, this) : release.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-mono)',
                                                    fontSize: '10px',
                                                    color: 'var(--accent)'
                                                },
                                                children: [
                                                    "$",
                                                    release.price
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/fraw-nextjs/app/page.js",
                                                lineNumber: 211,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/fraw-nextjs/app/page.js",
                                        lineNumber: 206,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, release._id, true, {
                                fileName: "[project]/fraw-nextjs/app/page.js",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/fraw-nextjs/app/page.js",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '44px 32px',
                    borderBottom: '0.5px solid var(--border)',
                    gap: '24px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '8px',
                                    letterSpacing: '0.16em',
                                    textTransform: 'uppercase',
                                    color: 'var(--accent)',
                                    marginBottom: '10px'
                                },
                                children: "每週發售報告"
                            }, void 0, false, {
                                fileName: "[project]/fraw-nextjs/app/page.js",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: 'var(--font-serif)',
                                    fontSize: '22px',
                                    fontWeight: 700,
                                    lineHeight: 1.35
                                },
                                children: settings?.newsletterHeading || '不錯過任何一雙。每週五直送信箱。'
                            }, void 0, false, {
                                fileName: "[project]/fraw-nextjs/app/page.js",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            border: '0.5px solid var(--border2)',
                            overflow: 'hidden',
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                style: {
                                    background: 'var(--surface)',
                                    border: 'none',
                                    outline: 'none',
                                    padding: '10px 18px',
                                    fontSize: '12px',
                                    color: 'var(--muted)',
                                    width: '230px',
                                    fontFamily: 'var(--font-mono)'
                                },
                                type: "email",
                                placeholder: "your@email.com"
                            }, void 0, false, {
                                fileName: "[project]/fraw-nextjs/app/page.js",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: {
                                    background: 'var(--accent)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '10px 18px',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '8px',
                                    letterSpacing: '0.14em',
                                    textTransform: 'uppercase',
                                    color: 'var(--accent-dark)'
                                },
                                children: "訂閱"
                            }, void 0, false, {
                                fileName: "[project]/fraw-nextjs/app/page.js",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/fraw-nextjs/app/page.js",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                style: {
                    padding: '22px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '0.5px solid var(--border)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: 'var(--font-serif)',
                            fontSize: '14px',
                            fontWeight: 700,
                            letterSpacing: '0.22em',
                            color: 'var(--hint)'
                        },
                        children: settings?.siteTitle || 'F.RAW 阜絡'
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: 'var(--font-mono)',
                            fontSize: '9px',
                            color: 'var(--hint)'
                        },
                        children: "© 2025 F.RAW 阜絡"
                    }, void 0, false, {
                        fileName: "[project]/fraw-nextjs/app/page.js",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/fraw-nextjs/app/page.js",
                lineNumber: 234,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/fraw-nextjs/app/page.js",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}),
"[project]/fraw-nextjs/app/page.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/fraw-nextjs/app/page.js [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0kvq2e_._.js.map