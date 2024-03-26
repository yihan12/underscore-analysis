const path = require("path");
module.exports = {
    title: 'underscore-analysis',
    description: 'underscore源码分析',
    // 路径名为 "/<REPO>/"
    base: '/underscore-analysis/',
    markdown: {
        lineNumbers: true
    },
    // theme: 'reco',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },

    themeConfig: {
        search: true,
        subSidebar: 'auto',
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated',
        sidebarDepth: 1,
        nav: [
            { text: '首页', link: '/' },
            { text: 'Hexo博客', link: 'https://yihan12.github.io/' },
            {
                text: '易函123 的 博客',
                items: [
                    { text: 'Github', link: 'https://github.com/yihan12' },
                    { text: '掘金', link: 'https://juejin.cn/user/3016715638158381/posts' },
                    { text: 'segmentfault', link: 'https://segmentfault.com/u/yihan123/articles' },
                    { text: '博客园', link: 'https://www.cnblogs.com/yihan123' },
                    { text: 'CSDN', link: 'https://blog.csdn.net/qq_43485006' },
                ]
            }
        ],
        sidebar: [
            {
                title: "写在最前面",
                collapsable: false,
                children: [["start/", "写在最前面"]]
            },
            {
                title: "熟知的方法",
                collapsable: false, // 不折叠
                children: [
                    { title: "前言", path: "familiar/" },
                    { title: "类型判断", path: 'familiar/is' },
                    { title: "restArguments", path: 'familiar/restArguments' },
                    { title: "防抖", path: 'familiar/debounce' },


                ],
            },
        ]
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "public", "assets")
            }
        }
    },
    head: [
        [
            "link",
            {
                rel: "icon",
                href: `/logo.png`
            }
        ],
    ],
    plugins: [
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        ['@vuepress/back-to-top', true],
        // ['@vuepress/blog', true],
        ['@vuepress/nprogress', true],
        [
            "vuepress-plugin-medium-zoom",
            {
                options: {
                    margin: 24,
                    background: "white",
                    scrollOffset: 0
                }
            }
        ],
    ]
}