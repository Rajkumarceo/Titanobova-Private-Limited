// Payment page logic moved to external file to satisfy CSP
(function(){
  try{
    console.log('payment.js: loaded');
    function qs(name){
      const u = new URL(location.href);
      return u.searchParams.get(name);
    }
    const id = qs('id');
    const info = document.getElementById('info');
    const details = document.getElementById('details');
    const amountEl = document.getElementById('amount');
    const copyBtn = document.getElementById('copy');
    if (!id) { info.textContent = 'No registration id provided.'; return; }

    console.log('payment.js: fetching registration id=',id);
    const backendOrigin = 'http://localhost:4000';
    const endpoint = (window.location.origin === backendOrigin)
      ? ('/api/registrations/public?id=' + encodeURIComponent(id))
      : (backendOrigin + '/api/registrations/public?id=' + encodeURIComponent(id));
    console.log('payment.js: using endpoint=', endpoint);
    fetch(endpoint, { method:'GET' })
      .then(async (r) => {
        console.log('payment.js: fetch status', r.status);
        if (r.status !== 200) {
          const body = await r.json().catch(()=>null);
          info.textContent = (body && body.message) ? body.message : 'Could not fetch registration details.';
          return;
        }
        const body = await r.json();
        console.log('payment.js: body', body && body.registration && body.registration.id);
        const reg = body && body.registration;
        if (!reg) { info.textContent = 'Registration not found.'; return; }
        console.log('payment.js: updating UI with price=', reg.price);
        try{
          info.style.display = 'none';
          details.style.display = '';
          amountEl.textContent = '₹' + reg.price;
          console.log('payment.js: UI updated');
        }catch(e){
          console.error('payment.js: UI update error', e && e.message);
        }
        copyBtn.addEventListener('click', ()=>{
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('titanobova@upi').then(()=>alert('UPI copied')).catch(()=>alert('Copy failed'));
          } else {
            try{ const ta=document.createElement('textarea'); ta.value='titanobova@upi'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); alert('UPI copied'); }catch(e){ alert('Copy unavailable'); }
          }
        });
      }).catch(err=>{ info.textContent = 'Network error: '+err.message; });
  }catch(e){ console.error('Payment script error', e); }
})();
