(function(doc, win) {

  //设置rem
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 20 * (clientWidth / 1024) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);


  //设置全局变量
  window.isPhone=/Android|webOS|iPhone|iPod|iPad/i.test(navigator.userAgent)?true:false;

})(document, window);


