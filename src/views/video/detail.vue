<template>
    <div id="id_video" :style="heightbody"></div>
</template>

<script>
import { videodetail } from "@/services/outsite";
export default {
    data() {
        return {
            heightbody: {},
            player: null,
        };
    },
    methods: {
        getLiveDetail() {
            // 获取直播详情
            if (!this.$route.query.live_id) {
                this.$router.back();
                return;
            }
            let data = {
                live_mid: this.$route.query.live_id,
                mid: window.localStorage.getItem("uid") || 0,
                from: 2,
                version: "3.3.6",
                appointment: 0,
                channel: 2,
            };
            videodetail(data).then((res) => {
                if (res.code == 200) {
                    let videoAuto, videoOncan;
                    if (res.data.isPwd == 1) {
                        videoAuto = false;
                        videoOncan = false;
                    } else {
                        videoAuto = false;
                        videoOncan = false;
                    }
                    var option = {
                        m3u8: res.data.PlayUrl.HLS, //请替换成实际可用的播放地址
                        flv: res.data.PlayUrl.FLV, //请替换成实际可用的播放地址
                        oncanplay: videoOncan, //两个同时存在 安卓可自动播放
                        autoplay: videoAuto, //
                        x5_fullscreen: "true", //安卓
                        wording: {
                            1002: "即将直播，请稍等",
                            2032: "请求视频失败，请检查网络",
                            2048: "请求m3u8文件失败，可能是网络错误或者跨域问题",
                        },
                        live: true,
                        coverpic: {
                            style: "cover",
                            src: res.data.cover,
                        },
                        width: "100%", //视频的显示宽度，请尽量使用视频分辨率宽度
                        height: "100%", //视频的显示高度，请尽量使用视频分辨率高度
                        x5_type: "h5",
                        x5_orientation: 1,
                        "webkit-playsinline": true,
                        playsinline: true,
                        x5_playsinline: true
                    };
                    this.player = new TcPlayer('id_video', option);
                }
            });
        },
    },
    created() {
        this.heightbody = {
            width: "100%",
            height: window.screen.availHeight - 80 + "px"
        };
    },
    mounted() {
        this.getLiveDetail();
    },
};
</script>

<style lang="less" scoped></style>
