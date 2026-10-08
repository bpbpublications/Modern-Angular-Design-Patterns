// ============================================================================
// REFERENCE FILE ONLY: Dynamic Runtime Loading With Graceful Failure Handling
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// This the final revision of loadScript with the .catch fallback. 
// The CDN bundle is an example bundle that does not exist, and the load would
// run at import time.
// ============================================================================
import { loadScript } from './load-script';

loadScript('https://cdn.example.com/micro-frontends/inventory/main.js')
  .then(() => {
    const widget = document.createElement('inventory-widget');
    document.body.appendChild(widget);
  })
  .catch(error => {
    console.error('Failed to load inventory micro frontend:', error);
    // Optionally render a fallback UI, retry, or notify the user
  });
