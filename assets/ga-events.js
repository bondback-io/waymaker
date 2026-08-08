/**
 * GA4 phone click tracking for Waymaker Rubbish Solutions.
 * Sends one phone_call_click event per tel: link click.
 */
(function () {
  if (window.__waymakerPhoneClickTracking) return;
  window.__waymakerPhoneClickTracking = true;

  document.addEventListener(
    'click',
    function (event) {
      var target = event.target;
      if (!target || typeof target.closest !== 'function') return;
      var link = target.closest('a[href^="tel:"]');
      if (!link) return;
      if (typeof gtag === 'function') {
        gtag('event', 'phone_call_click');
      }
    },
    false
  );
})();
