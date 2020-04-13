(function (document, window) {
    let docHTML = document.documentElement;
    let resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
    let recalc = () => {
        docHTMLWidth = docHTML.clientWidth;
        if (!docHTMLWidth) { return };
        docHTML.style.fontSize = 20 * (docHTMLWidth / 320) + "px";
    }
    if (!document.addEventListener) { return };
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener("DOMContentLoaded", recalc, false);
    
})(document, window);