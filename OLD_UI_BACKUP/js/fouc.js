// Small script to reveal page after styles load (avoids FOUC)
(function(){
  try{
    function reveal(){
      try{ document.documentElement.style.opacity = '1'; }catch(e){}
      try{ const ph = document.getElementById('public-header'); if(ph) ph.style.opacity = '1'; }catch(e){}
    }
    if (document.readyState !== 'loading') reveal();
    else {
      window.addEventListener('DOMContentLoaded', reveal);
      window.addEventListener('load', reveal);
    }
    // Fallback in case events are blocked by CSP or other timing issues
    setTimeout(reveal, 500);
  }catch(e){/* no-op */}
})();
