/**
 * GA4 event tracking for Waymaker Rubbish Solutions.
 * - phone_call_click: one event per tel: link click
 * - generate_lead: call waymakerTrackGenerateLead() only after a confirmed successful enquiry
 */
(function () {
  if (window.__waymakerGaEventsInit) return;
  window.__waymakerGaEventsInit = true;

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

  /**
   * Fire generate_lead once per successful enquiry.
   * Uses a short lock so the same success path cannot double-fire.
   */
  var leadLockUntil = 0;
  window.waymakerTrackGenerateLead = function () {
    var now = Date.now();
    if (now < leadLockUntil) return;
    leadLockUntil = now + 2000;
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead');
    }
  };
})();
