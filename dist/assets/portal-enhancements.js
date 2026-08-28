/* Content bridge for the packaged build: keeps the original interactions while
   presenting the service as a national urban mission. */
(function () {
  // Keep provider failures distinguishable from a genuine clean image. The
  // original UI treated every non-2xx vision response as { issues: [] },
  // which produced a misleading "no actionable issues" report.
  function installApiDiagnostics() {
    if (window.__sbuApiDiagnosticsInstalled || !window.fetch) return;
    window.__sbuApiDiagnosticsInstalled = true;
    var nativeFetch = window.fetch.bind(window);
    window.fetch = function (resource, options) {
      var url = typeof resource === 'string' ? resource : (resource && resource.url) || '';
      return nativeFetch(resource, options).then(function (response) {
        if (url.indexOf('/api/detectInfrastructureIssues') !== -1) {
          if (!response.ok) {
            response.clone().json().then(function (payload) {
              window.__sbuVisionError = (payload && payload.error) || 'Vision scanning is unavailable.';
              setTimeout(enhance, 0);
            }).catch(function () {
              window.__sbuVisionError = 'Vision scanning is unavailable.';
              setTimeout(enhance, 0);
            });
          } else {
            window.__sbuVisionError = null;
          }
        }
        return response;
      }).catch(function (error) {
        // The bundled client has a legacy catch handler that returns a
        // citizen-report summary for any chat network error. Return a normal
        // assistant-shaped response so a failed chat request stays a chat
        // response and never becomes an unrelated report.
        if (url.indexOf('/api/analyzeData') !== -1) {
          return new Response(JSON.stringify({
            text: 'I could not reach the AI assistant right now. Please check the local server/provider connection and try again.'
          }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
        throw error;
      });
    };
  }

  function showVisionError(node) {
    if (!window.__sbuVisionError || !node || node.nodeType !== 3) return;
    if (node.nodeValue.indexOf('No actionable sanitation issues were detected') !== -1) {
      node.nodeValue = 'Vision scan unavailable: ' + window.__sbuVisionError + ' Please check the AI provider/model configuration and try again.';
    }
  }

  var replacements = [
    ["Bengaluru Municipality", "Urban Mission Directorate"],
    ["Bengaluru Admin Portal", "National Urban Portal"],
    ["Bengaluru Sanitation Dashboard", "National Sanitation Operations"],
    ["Bengaluru", "India's cities"],
    ["CleanCity AI", "Swachh Bharat Urban"]
  ];
  function rewrite(node) {
    if (node.nodeType === 3) {
      showVisionError(node);
      var value = node.nodeValue;
      replacements.forEach(function (pair) { value = value.split(pair[0]).join(pair[1]); });
      if (value !== node.nodeValue) node.nodeValue = value;
      return;
    }
    if (node.nodeType !== 1 || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(node.tagName)) return;
    if (node.hasAttribute('placeholder')) {
      var placeholder = node.getAttribute('placeholder');
      replacements.forEach(function (pair) { placeholder = placeholder.split(pair[0]).join(pair[1]); });
      node.setAttribute('placeholder', placeholder);
    }
    Array.prototype.forEach.call(node.childNodes, rewrite);
  }
  function enhance() {
    installApiDiagnostics();
    rewrite(document.body);
    if (document.title !== "Swachh Bharat Urban — National Sanitation Operations") document.title = "Swachh Bharat Urban — National Sanitation Operations";
    var root = document.getElementById('root');
    if (root) root.setAttribute('data-service', 'swachh-bharat-urban');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance);
  else enhance();
  new MutationObserver(enhance).observe(document.documentElement, { childList: true, subtree: true });
})();
