// Company login client for static page
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('founderLoginForm');
  const msg = document.getElementById('loginMsg');
  const backendOrigin = 'http://localhost:4000';
  const endpoint = (window.location.origin === backendOrigin) ? '/api/auth/login' : `${backendOrigin}/api/auth/login`;

  if (!form) return;

  // If the form is submitted normally (non-JS), backend will accept JSON only,
  // so we intercept and send JSON to the API, then store token and redirect.
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';

    const username = form.username.value.trim();
    const password = form.password.value;

    if (!username || !password) {
      msg.textContent = 'Please enter both username and password.';
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const contentType = res.headers.get('content-type') || '';
      let body = null;
      if (contentType.includes('application/json')) body = await res.json().catch(()=>null);

      if (!res.ok) {
        const reason = (body && body.message) || 'Login failed. Check credentials.';
        msg.textContent = reason;
        return;
      }

      const token = body && body.token;
      if (!token) {
        msg.textContent = 'Login succeeded but token missing from response.';
        return;
      }

      // Store token under the same key AdminDashboard expects
      localStorage.setItem('authToken', token);

      // redirect to admin dashboard. Default to backend-served dashboard so
      // users don't see "can't reach this page" when the Vite dev server
      // is not running. Change to your frontend dev URL if needed.
      const dashboardUrl = `${backendOrigin}/admin-dashboard`;
      window.location.href = dashboardUrl;
    } catch (err) {
      console.error('Company login error', err);
      msg.textContent = 'Network error. Ensure backend is running at http://localhost:4000';
    }
  });
});
