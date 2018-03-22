var global_config = require('global-config');

export default {
    passport: global_config.passport || "",
    uc: global_config.uc || "",
    account: global_config.account || "",
    vip: global_config.vip || "",
    live: global_config.live || "",
    game: global_config.game || "",
    img: global_config.imgServer || "", //图片上传服务器
    data: global_config.dataServer || "", //api接口服务器
    resource:global_config.resource || ""
};