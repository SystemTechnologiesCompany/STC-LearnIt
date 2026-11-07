# Capture Failed

Capture failed: Failed to install chrome-headless-shell 152.0.7977.30: All providers failed for chrome-headless-shell 152.0.7977.30:
  - DefaultProvider: D4210000:error:0A000119:SSL routines:tls_get_more_records:decryption failed or bad record mac:openssl\ssl\record\methods\tls_common.c:874:


Point hyperframes at an already-installed Chrome/Chromium instead:

  export HYPERFRAMES_BROWSER_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"

Run `hyperframes doctor` to see which Chrome was found. Then re-run your command. Any Chrome build works for the screenshot capture path; install a real chrome-headless-shell later if you need the perf-optimized BeginFrame path. Alternatively, run inside the hyperframes Docker image which ships a compatible headless-shell.

URL: https://stclearnit.netlify.app

## What to try

- Re-run with a longer timeout: `--timeout 60000`
- The site may block headless browsers (anti-bot protection)
- Try capturing a different page on the same domain
