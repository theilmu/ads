// Save as: adblock-recovery.js
// Purpose: Recovers 20-40% lost revenue from adblock users
(function() {
    const detect = () => {
        const test = document.createElement('div');
        test.className = 'adsbox pub_300x250 ads-sticky';
        test.style.cssText = 'height:1px;width:1px;position:absolute;left:-9999px';
        document.body.appendChild(test);
        
        setTimeout(() => {
            if (test.offsetHeight === 0) {
                // Adblock detected - inject native content
                document.querySelectorAll('.sulvo-auto, ins.adsbygoogle').forEach(ad => {
                    if (ad.offsetHeight === 0) {
                        const native = document.createElement('div');
                        native.innerHTML = `
                            <div style="padding:15px;background:#f8f9fa;border-radius:8px;margin:20px 0">
                                <a href="/p/tool-kalkulator-zakat.html" style="color:#333;text-decoration:none">
                                    <strong>🕌 Kira Zakat Anda</strong><br>
                                    <span style="color:#666;font-size:14px">Kalkulator zakat terkini dengan nisab 2025</span>
                                </a>
                            </div>`;
                        ad.parentNode.replaceChild(native, ad);
                    }
                });
                
                // Add affiliate links
                const keywords = {
                    'quran': 'https://shopee.my/quran-digital',
                    'sejadah': 'https://shopee.my/sejadah-travel',
                    'tasbih': 'https://shopee.my/tasbih-digital'
                };
                
                document.querySelectorAll('.post-body p').forEach(p => {
                    Object.keys(keywords).forEach(word => {
                        if (p.textContent.includes(word) && !p.querySelector('a')) {
                            p.innerHTML = p.innerHTML.replace(
                                new RegExp(`\\b${word}\\b`, 'gi'),
                                `<a href="${keywords[word]}" rel="sponsored" target="_blank" 
                                 style="color:inherit;text-decoration:underline dotted">${word}</a>`
                            );
                        }
                    });
                });
            }
            test.remove();
        }, 100);
    };
    
    window.addEventListener('load', detect);
})();
