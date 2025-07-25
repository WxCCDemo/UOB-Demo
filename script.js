// Smooth scroll for in-page navigation
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // Webex Chat Widget Loader (as per OCBC pattern, adapted for UOB)
  (function loadWebexWidget() {
    var chatDiv = document.getElementById('divicw');
    if (!chatDiv) return;
    var scriptUrl = "https://attachments.apac2.webexengage.com/widget/js/imichatinit.js";
    try {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 0) {
            insertUnsupportedFrame();
            return;
          }
          var script = document.createElement("script");
          script.innerHTML = xhr.responseText;
          chatDiv.parentNode.insertBefore(script, chatDiv.nextSibling);
        }
      };
      xhr.open("GET", scriptUrl, true);
      xhr.send();
    } catch (err) {
      console.error(err);
    }

    function insertUnsupportedFrame() {
      chatDiv.insertAdjacentHTML("afterend", '<iframe id="tls_al_frm" frameborder="0" style="overflow: hidden;height: 208px;width: 394px;position: fixed;display: block;right: 48px;bottom: 12px;z-index: 99999; display:none;"></iframe>');
      var iframe = document.getElementById("tls_al_frm");
      var doc = iframe.contentWindow || (iframe.contentDocument.document || iframe.contentDocument);
      doc.document.open();
      doc.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Not Supported</title><style>body{font-family:sans-serif;color:#99a0b0;font-size:14px;}</style></head><body><div>This browser version is not supported for LiveChat.<br>Please update your browser to access the widget.</div></body></html>');
      doc.document.close();
      iframe.style.display = "block";
    }
  })();
});
