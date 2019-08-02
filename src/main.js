import './main.css';
require('simplelightbox');

(($) => {
  const $win = $(window);
  const $html = $('html');
  const $doc = $(document);
  const $bod = $(document.body);
  const $nav = $('#mainnav');
  const $mobileNav = $('#mobileNav');
  const $arrownav = $('#arrownav');
  const $arrownav_a = $arrownav.find('a.prev');
  const $arrownav_b = $arrownav.find('a.next');
  const $pauseAnimSet = $bod.find('.pause-anim');
  const $bg = $('#bg');
  const $tagline = $('#tagline');

  let ticking = false;
  let lastY = 0;
  
  function requestTick(fn) {
    if(!ticking) {
      ticking = true;
      requestAnimationFrame(fn);
      ticking = false;
    }
  }

  function handleLayout() {
    const thisY = window.scrollY;
    const innerH = window.innerHeight;
    const slot = ~~ (thisY / innerH);
    const slots = ['#intro', '#overview', '#whatwedo', '#location', '#gallery', '#contact'];
    if (thisY) $tagline.attr({ 'data-css': `${thisY} / ${innerH}` });

    if (lastY > thisY) {
      $nav.toggleClass('hidden', false);
    } else {
      $nav.toggleClass('hidden', thisY > 100);
    }
    $nav.toggleClass('filled', thisY > 200);
    $nav.attr({ ariaHidden: screen.width < 768 });
    $bod.attr({ slot });
    $arrownav_a.attr('href', slots[slot - (slot ? 1 : 0)]);
    $arrownav_b.attr('href', slots[slot + 1]);
    $pauseAnimSet.each((i, elem) => {
      if((elem.offsetTop - elem.offsetHeight - thisY - (innerH / 7)) < 0) {
        $(elem).addClass('pause-anim-show');
      };
    });
    lastY = thisY;  
  }

  function handleMenuClick(event) {
    if (event && event.preventDefault) event.preventDefault();
    toggleMenu($mobileNav.attr('aria-enabled') === 'false');
  }

  function toggleMenu(to) {
    $mobileNav.attr('aria-enabled', to);
  }

  const ARIA = {
    HIDDEN: 'aria-hidden',
  };

  const onReady = () => {
    $html.addClass('ready');
    $doc
      .resize(() => requestTick(() => handleLayout()))
      .scroll(() => requestTick(() => {
        handleLayout();
        toggleMenu(false);
      }));

    $mobileNav.click(handleMenuClick);

    handleLayout();

    $bod.find('.gallery a').simpleLightbox();
  };

  $doc.on('ready', onReady());
})(jQuery);
