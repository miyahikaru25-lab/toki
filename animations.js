(function () {
  // .reveal / .reveal-stagger を付けた要素を、画面に入ったタイミングで
  // ふわっと表示する（スクロールリビール）

  function initReveal() {
    var targets = document.querySelectorAll('.reveal:not([data-reveal-bound]), .reveal-stagger:not([data-reveal-bound])');
    if (!targets.length) return;

    // IntersectionObserver が使えない古いブラウザでは、即座に表示しておく
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('is-visible');
        el.setAttribute('data-reveal-bound', '1');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // 一度表示したら監視を終了（再フェードしない）
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    targets.forEach(function (el) {
      el.setAttribute('data-reveal-bound', '1');
      observer.observe(el);
    });
  }

  // 年齢確認(age gate)などで後からコンテンツが表示される場合に
  // 外部から呼び出せるようにグローバルへ公開
  window.tokiInitReveal = initReveal;

  document.addEventListener('DOMContentLoaded', initReveal);
})();

