const path = require('path');
const fs = require('fs-extra')
const prismThemes= require('prism-react-renderer');
const remarkMath = require('remark-math');
const remarkHtml = require('remark-html');
const rehypeKatex = require('rehype-katex');
const pkg = require(path.resolve(__dirname,'./scripts/config.json'));
const finalBaseUrl = pkg.githubConfig.baseURL ||  '/home/';
// import ConfigLocalized from './docusaurus.config.localized.json';
// const baseUrl = pkg&&pkg.baseUrl
// const finalBaseUrl = baseUrl || `${BASE_URL}/`;
// const sidebarPath = require.resolve(path.resolve(__dirname,'./sidebars.js'));

const defaultLocale = 'en';
// let _navBarItems = {
//     type:"dropdown",
//     position: 'right',
//     className: 'header-github-link',
//     label:"相关文档",
//     items: [...(pkg.navBarDropDownList || [])],
// };

let items = [
    {
        label: 'Projects',
        position: 'right',
        to: '/projects/',
        target: '_self',
    },
    // {
    //     label: 'Memberships',
    //     position: 'right',
    //     to: '/memberships/',
    //     target: '_self',
    // },
    // {
    //     label: 'Year in Review',
    //     position: 'right',
    //     to: '/year-in-review/',
    //     target: '_self',
    // },
    // {
    //     label: 'Blog',
    //     position: 'right',
    //     to: '/blog/',
    //     target: '_self',
    // },
    {
        label: 'GitHub',
        position: 'right',
        to: 'https://github.com/TongchengOpenSource',
        target: '_blank',
    },
    // {
    //     type: 'html', //iconLink => default
    //     position: 'right',
    //     value: `<a href="" class="github-logo" target="_blank" rel="noopener noreferrer" ></a>`,
    // }
]

// try{
//     const axure_files_index_html = require(path.resolve(__dirname,'./static/axure_files/html/index.html'));
//     console.log(axure_files_index_html.toString())
// }catch (e){
//     console.log(_navBarItems)
//     if(e.message.toString().indexOf(`Cannot find module`) === 0){
//         console.log('shift')
//         _navBarItems.items.shift()
//     }
//     if(_navBarItems.items.length>0){
//         items.unshift(_navBarItems)
//     }
//     console.log(_navBarItems)
// }

//处理自定义sideBarConfig的情况
// if (pkg.sideBarConfig) {
//     items.splice(0,1)
//     fs.writeFileSync(sidebarPath, `module.exports =${JSON.stringify(pkg.sideBarConfig)}`)
// }

const plugins = [
    // "docusaurus-plugin-umami",
    'docusaurus-plugin-sass',
    'docusaurus-plugin-image-zoom',
    // '@docusaurus/theme-live-codeblock',
    // [require.resolve('./src/plugins/translate-plugin'), {}],
    // ['docusaurus-plugin-drawio',{
    //     lib: 'https://file.40017.cn/tech_static/docusaurus/docusaurus-plugin-drawio-min-viewer.js?v=2024-01-20',
    //     toolbarPosition: 'bottom',
    //     // autoFit: false,
    //     // autoOrigin: false,
    //     // toolbarNohide: false,
    //     // toolbar: 'zoom lightbox',
    //     // nav: false,
    //     // resize: false,
    //     // move: false,
    // }],
    [
        'docusaurus-plugin-module-alias',
        {
            alias: {
                'styled-components': path.resolve(__dirname, './node_modules/styled-components'),
                react: path.resolve(__dirname, './node_modules/react'),
                'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
                '@components': path.resolve(__dirname, './src/components'),
                '@utils': path.resolve(__dirname, './src/utils'),
                '@src': path.resolve(__dirname, './src'),
            },
        },
    ],
    // '@docusaurus/plugin-content-docs',
    // [
    //     '@docusaurus/plugin-content-docs',
    //     {
    //         id: "docs1",
    //         routeBasePath: '/',
    //         path: "docs",
    //         beforeDefaultRemarkPlugins: [],
    //         remarkPlugins: [require('mdx-mermaid'), {
    //             theme: {light: 'neutral', dark: 'forest'}
    //         }],
    //         sidebarPath: sidebarPath,
    //         editUrl: ({versionDocsDirPath, docPath, locale}) => {
    //             if (docPath.indexOf("index.md") != -1) {
    //                 return false
    //             }
    //             return `${pkg.gitConfig.gitURLPath}/tree/${pkg.gitConfig.editBranch}/${versionDocsDirPath}/${docPath}`;
    //         },
    //         exclude: ['README.md', 'static']
    //     },
    // ],
    // '@docusaurus/plugin-content-pages',
    // '@docusaurus/plugin-debug',
    // '@docusaurus/plugin-sitemap'
    //'@ionic-internal/docusaurus-plugin-tag-manager',
];
const themes= [
    // ['@docusaurus/theme-classic',{ id: "classic1"}],
    '@docusaurus/theme-mermaid',
    // [require.resolve("@easyops-cn/docusaurus-search-local"),
    // {
    //     // ... Your options.
    //     // `hashed` is recommended as long-term-cache of index file is possible.
    //     hashed: true,
    //     // For Docs using Chinese, The `language` is recommended to set to:
    //     language: ["en", "zh"],
    //     indexBlog: false,
    //     docsRouteBasePath: ["/"],
    //     docsDir: ["docs"]
    // },],
];
let CONFIG = {
    title: 'Tongcheng Open Source',
    tagline: 'Welcome To Tongcheng Open Source',
    staticDirectories: ["static"],
    url: 'https://tongchengopensource.github.io',
    baseUrl: finalBaseUrl,
    i18n: {
        defaultLocale,
        locales: [defaultLocale],
        localeConfigs: {},
    },
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'logos/ly-pd.png',
    organizationName: 'Tongcheng Open Source',
    projectName: 'Tongcheng Open Source',
    // ...(pkg?.docusaurusConfig || {}),
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                // docs: {
                //     // id: "docs1",
                //     routeBasePath: '/projects',
                //     path: "docs",
                //     // beforeDefaultRemarkPlugins: [],
                //     remarkPlugins: [remarkMath,remarkHtml],
                //     rehypePlugins: [rehypeKatex],
                //     docItemComponent: '@theme/DocItem',
                //     sidebarPath: false,
                //     editCurrentVersion: true,
                //     showLastUpdateAuthor: true,
                //     showLastUpdateTime: true,
                //     sidebarCollapsed: false,
                //     sidebarCollapsible: true,
                //     // editUrl: ({versionDocsDirPath, docPath, locale}) => {
                //     //     if (docPath.indexOf("index.md") != -1) {
                //     //         return false
                //     //     }
                //     //     return `${pkg.gitConfig.gitURLPath}/tree/${pkg.gitConfig.editBranch}/${versionDocsDirPath}/${docPath}`;
                //     // },
                //     exclude: ['README.md', 'static']
                // },
                docs: false,
                // Will be passed to @docusaurus/plugin-content-blog (false to disable)
                blog: false,
                // blog: {
                //     id: 'blogs',
                //     path: 'blogs',
                //     routeBasePath: 'blog',
                //     beforeDefaultRehypePlugins: [],
                //     beforeDefaultRemarkPlugins: [],
                //     showReadingTime: true,
                //     showLastUpdateTime: true,
                //     showLastUpdateAuthor: true,
                //     remarkPlugins: [remarkMath, remarkHtml],
                //     rehypePlugins: [rehypeKatex],
                //     postsPerPage: 'ALL',
                //     blogSidebarTitle: 'All posts',
                //     blogSidebarCount: 'ALL',
                //     blogListComponent: '@theme/BlogListPage',
                //     blogPostComponent: '@theme/BlogPostPage',
                //     blogTagsListComponent: '@theme/BlogTagsListPage',
                //     blogTagsPostsComponent: '@theme/BlogTagsPostsPage',
                //     include: ['**/*.md', '**/*.mdx'],
                //     exclude: [
                //         '**/_*.{js,jsx,ts,tsx,md,mdx}',
                //         '**/_*/**',
                //         '**/*.test.{js,jsx,ts,tsx}',
                //         '**/__tests__/**',
                //     ],
                // },
                // Will be passed to @docusaurus/plugin-content-pages (false to disable)
                pages: {
                    remarkPlugins: [remarkMath,remarkHtml],
                    rehypePlugins: [rehypeKatex],
                    mdxPageComponent: '@theme/MDXPage',
                    include: ['**/*.{js,jsx,ts,tsx,md,mdx}'],
                    exclude: [
                        '**/_*.{js,jsx,ts,tsx,md,mdx}',
                        '**/_*/**',
                        '**/*.test.{js,jsx,ts,tsx}',
                        '**/__tests__/**',
                    ],
                    beforeDefaultRemarkPlugins: [],
                    beforeDefaultRehypePlugins: [],
                },
                // pages: false,
                debug: false,
                // Will be passed to @docusaurus/plugin-sitemap (false to disable)
                sitemap: false,
                // Will be passed to @docusaurus/plugin-google-gtag (only enabled when explicitly specified)
                gtag: false,
                // Will be passed to @docusaurus/plugin-google-tag-manager (only enabled when explicitly specified)
                // googleTagManager: false,
                // DEPRECATED: Will be passed to @docusaurus/plugin-google-analytics (only enabled when explicitly specified)
                googleAnalytics: false,
                //theme: false,
                theme: {
                    customCss: "/css/customTheme.css",
                },
            },
        ],
    ],
    plugins,
    themes,
    themeConfig:{
        colorMode: {
            defaultMode: 'light',
            disableSwitch: true,
            respectPrefersColorScheme: true,
        },
        navbar: {
            hideOnScroll: false,
            logo: {
                alt: 'Site Logo',
                src: `/logos/ly-pd.png`,
                srcDark: `/logos/ly-pd.png`,
                href: '/',
                target: '_self',
            },
            title: "Open Source",
            items: items
        },
        // tagManager: {
        //     trackingID: 'GTM-TKMGCBC',
        // },
        footer: {
            // links: [],
            logo: {
                alt: "ly.com",
                src: "logos/logo-horizontal.png",
                srcDark: "logos/logo-horizontal-white.png",
                href: "https://www.ly.com/",
                height: 20,
            },
            copyright: `Copyright © ${new Date().getFullYear()} TongchengOpenSource`,
        },
        zoom: {
            // CSS selector to apply the plugin to, defaults to '.markdown img'
            //selector: '.markdown img',
            selector: '.markdown :not(em) > img',
            background: {
                light: 'rgba(255, 255, 255,0.85)',
                dark: 'rgba(50, 50, 50,0.85)'
            },
            // Optional medium-zoom options
            // see: https://www.npmjs.com/package/medium-zoom#options
            options: {
                margin: 24,
                scrollOffset: 0,
                container: '#zoom-container',
                template: '#zoom-template',
            },
        },
        prism: {
            theme: prismThemes.themes.github,
            darkTheme: prismThemes.themes.dracula,
            //theme: {plain: {}, styles: []},
            // https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
            additionalLanguages: ['shell-session', 'http'],
            magicComments: [
                // Remember to extend the default highlight class name as well!
                {
                    className: 'theme-code-block-highlighted-line',
                    line: 'highlight-next-line',
                    block: {start: 'highlight-start', end: 'highlight-end'},
                },
                {
                    className: 'code-block-error-line',
                    line: 'This will error',
                },
            ],
        },
        mermaid: {
            theme: {light: 'forest', dark: 'dark'},
        },
        liveCodeBlock: {
            playgroundPosition: 'bottom',
        },
        // ...(pkg?.docusaurusConfig?.themeConfig || {}),
    },
    markdown:{
        mermaid: true,
        format: "detect",
        // remarkRehypeOptions: {
        //     lastUpdatedAtBy: getLocalizedConfigValue('theme.lastUpdated.lastUpdatedAtBy'),
        // },
    },
    stylesheets: [
        {
            href: `${finalBaseUrl}css/katex.min.css`,
            type: 'text/css',
        },
        {
            href:`${finalBaseUrl}css/global.css`,
            type: 'text/css',
        }
    ],
    customFields: {},
};

CONFIG.url = CONFIG.url.replace(/\/docs\/$/, "")

CONFIG.themeConfig.navbar.items = items;

// CONFIG.themeConfig["umami"]= {
//     websiteid: "ea8727ea-94e8-4fd4-bbea-92fe12e7943c", // Insctructions below on how to find this
//     src: "https://umami.inf.17usoft.com/script.js", // Instructions below on how to find this
// }
module.exports = CONFIG
