function runEbsPlayer() {
    if (location == null || typeof location == "undefined") {
        console.warn("[EBSOC-ADDON] Cannot found location variable. skipping..");
        return;
    }
    if (location.host != "player.ebsoc.co.kr") return;

    // inject style
    var style = document.createElement("link");
    style.href = chrome.runtime.getURL("styles/ebsplayer.css");
    style.type = "text/css";
    style.rel = "stylesheet";
    document.querySelector("head").append(style);

    var main = document.createElement("div");
    main.className = "ebsoc-addon-main";
    // create object
    var obj = document.createElement("div");
    obj.className = "ebsoc-addon-object";


    // get content url
    const search = new URLSearchParams(location?.search);
    // get content-url
    const contenturl = search.get("content-url");
    if (contenturl == null) {
        console.warn("[EBSOC-ADDON] Cannot found content-url param. skipping..");
        console.warn("[EBSOC-ADDON] location.search = " + location?.search);
        return;
    }

    // create button
    var btn = document.createElement("a");
    btn.href = contenturl;
    btn.target = "_blank";
    btn.className = "ebsoc-addon-common ebsoc-addon-button";
    btn.innerHTML = "새 탭에서 영상 열기";

    // get title
    const titlevalue = search.get("title");
    if (titlevalue != null && titlevalue.length > 1 && titlevalue != "undefined") {
        var titlediv = document.createElement("div");
        titlediv.className = "ebsoc-addon-common ebsoc-addon-attribute";
        titlediv.innerHTML = titlevalue;
        obj.append(titlediv)
    }

    // get original filename
    const originalfilename = search.get("originalFileName");
    if (originalfilename != null && originalfilename.length > 1 && originalfilename != "undefined") {
        var filen = document.createElement("div");
        filen.className = "ebsoc-addon-common ebsoc-addon-attribute";
        filen.innerHTML = originalfilename;
        obj.append(filen)
    }

    // current playing username
    const userId = search.get("userId");
    if (userId != null && userId.length > 1 && userId != "undefined") {
        var uid = document.createElement("div");
        uid.className = "ebsoc-addon-common ebsoc-addon-attribute";
        uid.innerHTML = "@" + userId;
        obj.append(uid);
    }

    // final: inject button
    obj.append(btn);
    main.append(obj);

    var warnattr = document.createElement("div");
    warnattr.className = "ebsoc-addon-common ebsoc-addon-warning";
    warnattr.innerHTML = "수업자료에는 저작권법 제25조 제2항에 의해 수업 목적으로 이용한 저작물이 포함되어 있으므로 본 수업자료를 외부에 공개, 게시하는 것을 금지하며 이를 위반하는 경우 저작권 침해로서 관련법에 따라 처벌될 수 있습니다.";
    main.append(warnattr);

    const body = document.querySelector("body");
    body.append(main);

    // disable full height
    document.querySelector("body > div.container").setAttribute("style", "height: auto !important");
}
runEbsPlayer();