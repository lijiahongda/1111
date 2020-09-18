export default [
    {
        path: "/goodsDetailZY",
        name: "goodsDetailZY",
        component: () => import("@/views/goodsDetail/goods-detail-zy"), //懒加载方式
        meta: {
            title: "商品详情", // 自营详情
        },
    },
    {
        path: "/goodsDetailMS",
        name: "goodsDetailMS",
        component: () => import("@/views/goodsDetail/goods-detail-ms"), //懒加载方式
        meta: {
            title: "商品详情", // 秒杀详情
        },
    },
    {
        path: "/goodsDetailCPS",
        name: "goodsDetailCPS",
        component: () => import("@/views/goodsDetail/goods-detail-cps"), //懒加载方式
        meta: {
            title: "商品详情", // 京东详情
        },
    },
    {
        path: "/growCount",
        name: "growCount",
        component: () => import("@/views/goodsDetail/grow-count"), //懒加载方式
        meta: {
            title: "预估成长值",
        },
    },
    {
        path: "/assessList",
        name: "assessList",
        component: () => import("@/views/goodsDetail/assess-list"), //懒加载方式
        meta: {
            title: "评论列表",
        },
    },
    {
        path: "/shopCar",
        name: "shopCar",
        component: () => import("@/views/shopcar/shopcar"), //懒加载方式
        meta: {
            title: "购物车",
            requireAuth: true
        },
    },
    {
        path: "/goodsSearch",
        name: "goodsSearch",
        component: () => import("@/views/goods/goods-search"), //懒加载方式
        meta: {
            title: "搜索结果页",
        },
    }
];
