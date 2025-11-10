// Save as: sulvo-auto.js
// Purpose: Automatically places Sulvo ads in optimal positions
(function() {
    const cfg = {
        ad: '
      <div data-ad="ilmualam.com_fluid_all_under-title" data-devices="m:1,t:1,d:1"  style="min-height: 300px;" class="demand-supply"></div>',
        skip: 3,
        gap: 4,
        max: 3,
        container: '.post-body'
    };
    
    function inject() {
        document.querySelectorAll(cfg.container).forEach(post => {
            if (post.querySelector('.sulvo-auto')) return;
            const items = post.querySelectorAll('p, div.separator');
            if (items.length < cfg.skip + 2) return;
            
            let count = 0, inserted = 0;
            items.forEach(el => {
                count++;
                if (count >= cfg.skip && (count - cfg.skip) % cfg.gap === 0 && inserted < cfg.max) {
                    const wrap = document.createElement('div');
                    wrap.className = 'sulvo-auto';
                    wrap.innerHTML = cfg.ad;
                    el.insertAdjacentElement('afterend', wrap);
                    
                    wrap.querySelectorAll('script').forEach(s => {
                        const n = document.createElement('script');
                        n.text = s.text;
                        if (s.src) n.src = s.src;
                        s.parentNode.replaceChild(n, s);
                    });
                    inserted++;
                }
            });
        });
    }
    
    document.readyState === 'loading' 
        ? document.addEventListener('DOMContentLoaded', inject)
        : inject();
    
    // Handle dynamic content
    new MutationObserver(() => setTimeout(inject, 300))
        .observe(document.body, {childList: true, subtree: true});
})();
