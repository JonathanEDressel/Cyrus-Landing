// Returns the total number of download-button clicks recorded by the
// "download-click" Netlify Form, plus GitHub release download totals.
// Requires a NETLIFY_API_TOKEN environment variable (personal access token)
// set in Site settings → Environment variables. SITE_ID is provided by the
// Netlify runtime automatically.
exports.handler = async function () {
  const token = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.SITE_ID;

  let clicks = null;
  if (token && siteId) {
    try {
      const res = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const forms = await res.json();
        const form = forms.find((f) => f.name === 'download-click');
        if (form) clicks = form.submission_count;
      }
    } catch (e) {
      // fall through — clicks stays null
    }
  }

  let githubDownloads = null;
  try {
    const res = await fetch('https://api.github.com/repos/JonathanEDressel/Cyrus/releases?per_page=100');
    if (res.ok) {
      const releases = await res.json();
      githubDownloads = releases.reduce(
        (sum, rel) =>
          sum +
          (rel.assets || []).reduce(
            (s, a) => s + (a.name && a.name.endsWith('.exe') ? a.download_count || 0 : 0),
            0
          ),
        0
      );
    }
  } catch (e) {
    // fall through — githubDownloads stays null
  }

  if (clicks === null && githubDownloads === null) {
    return { statusCode: 502, body: JSON.stringify({ error: 'no data source available' }) };
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=300',
    },
    body: JSON.stringify({ clicks, githubDownloads, count: clicks !== null ? clicks : githubDownloads }),
  };
};
