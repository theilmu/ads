// Save as: engagement-boost.js
// Purpose: Increases CPM by 30-50% through viewability optimization
(function() {
    // Lazy load ads for better viewability scores
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.loaded) {
                const ad = entry.target;
                ad.innerHTML = ad.dataset.adcode;
                ad.dataset.loaded = 'true';
                
                // Re-execute scripts
                ad.querySelectorAll('script').forEach(s => {
                    const n = document.createElement('script');
                    n.text = s.text;
                    s.parentNode.replaceChild(n, s);
                });
            }
        });
    }, { rootMargin: '100px' });
    
    // Apply to all ad slots
    document.querySelectorAll('.sulvo-auto').forEach(slot => {
        if (slot.innerHTML) {
            slot.dataset.adcode = slot.innerHTML;
            slot.innerHTML = '<div style="height:250px;background:#f0f0f0"></div>';
            observer.observe(slot);
        }
    });
    
    // Track engagement for premium ad delivery
    let engaged = 0;
    ['click', 'scroll'].forEach(e => 
        document.addEventListener(e, () => engaged++)
    );
    
    setTimeout(() => {
        if (engaged > 10) {
            // User is engaged - show sticky ad
            const sticky = document.createElement('div');
            sticky.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9999;background:white;padding:10px;text-align:center;box-shadow:0 -2px 10px rgba(0,0,0,0.1)';
            sticky.innerHTML = 'YOUR_SULVO_STICKY_CODE';
            document.body.appendChild(sticky);
        }
    }, 30000);
})();
