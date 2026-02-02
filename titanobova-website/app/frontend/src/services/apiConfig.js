/**
 * API URL Configuration for Titanobova
 * Automatically detects environment (local vs tunnel) and uses correct API URL
 */

export const getApiUrl = () => {
  // If VITE_API_URL is set in .env.local, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }

  // For tunnel access (*.loca.lt, *.ngrok.io, etc)
  const hostname = window.location.hostname
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'
  
  if (isLocalhost) {
    // Local development - connect to localhost:8000
    return 'http://localhost:8000/api/v1'
  } else {
    // Tunnel access - use same domain as frontend, port 8000
    // Example: https://proud-moons-teach.loca.lt -> https://proud-moons-teach.loca.lt:8000/api/v1
    // But tunnels don't use ports, so we replace the hostname but keep https
    const protocol = window.location.protocol
    return `${protocol}//${hostname}/api/v1`
  }
}

export const getBackendUrl = () => {
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL
  }

  const hostname = window.location.hostname
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'
  
  if (isLocalhost) {
    return 'http://localhost:8000'
  } else {
    const protocol = window.location.protocol
    return `${protocol}//${hostname}`
  }
}

// Log current API URL for debugging
console.log('API URL:', getApiUrl())
console.log('Backend URL:', getBackendUrl())
