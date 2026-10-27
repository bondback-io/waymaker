(function () {
  var toggle = document.getElementById('menu-toggle');
  var panel = document.getElementById('waymaker-nav-dropdown-panel');
  var wrap = document.querySelector('.waymaker-nav-dropdown-wrap');
  var navbar = document.getElementById('navbar');
  if (!toggle || !panel) return;

  var backdrop = document.querySelector('.waymaker-nav-dropdown-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('button');
    backdrop.type = 'button';
    backdrop.className = 'waymaker-nav-dropdown-backdrop';
    backdrop.setAttribute('aria-label', 'Close menu');
    backdrop.hidden = true;
    document.body.appendChild(backdrop);
  }

  function positionPanel() {
    var rect = toggle.getBoundingClientRect();
    panel.style.setProperty('--waymaker-dropdown-top', Math.round(rect.bottom + 8) + 'px');
    panel.style.left = '';
    panel.style.right = '';
    panel.style.width = '';
  }

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.classList.toggle('is-open', open);
    panel.classList.toggle('is-open', open);
    panel.hidden = !open;
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    backdrop.hidden = !open;
    document.body.classList.toggle('waymaker-nav-dropdown-open', open);
    if (navbar) {
      navbar.classList.toggle('waymaker-nav-dropdown-active', open);
      if (open) navbar.classList.add('nav-scrolled');
      else if (window.scrollY <= 60) navbar.classList.remove('nav-scrolled');
    }
    if (open) {
      positionPanel();
      window.requestAnimationFrame(positionPanel);
    }
  }

  window.waymakerSetNavDropdownOpen = setOpen;

  toggle.addEventListener('click', function (ev) {
    ev.stopPropagation();
    setOpen(panel.hidden);
  });

  backdrop.addEventListener('click', function () {
    setOpen(false);
  });

  panel.querySelectorAll('a[role="menuitem"]').forEach(function (link) {
    link.addEventListener('click', function () {
      setOpen(false);
    });
  });

  document.addEventListener('click', function (ev) {
    if (panel.hidden) return;
    if (wrap && wrap.contains(ev.target)) return;
    setOpen(false);
  });

  panel.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Tab' || panel.hidden) return;
    var items = Array.prototype.slice.call(panel.querySelectorAll('a[role="menuitem"]'));
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (ev.shiftKey && document.activeElement === first) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && document.activeElement === last) {
      ev.preventDefault();
      first.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (!panel.hidden) positionPanel();
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && !panel.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
})();
