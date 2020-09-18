function setFontSize(){
    var dpr =window.devicePixelRatio;
    var width =window.screen.width;//逻辑像素
    if (width  > 540) {
        var fontsize = width / 10;
        document.getElementsByTagName('html')[0].style.fontSize = fontsize + 'px';
    }
}
setFontSize();
window.onresize=setFontSize;

