# Will You Marry Me?

A romantic, responsive, no-build static website. It uses plain HTML, CSS, and JavaScript and can be served locally or published directly with GitHub Pages.

## Files

```text
.
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── memories/
    │   ├── memory-01.jpeg
    │   └── ... memory-21.jpeg
    ├── README.txt
    ├── romantic-music.mp3   # Licensed soundtrack
    └── secret-memory.jpeg
```

## Personalize it

1. In `script.js`, the love counter starts from your first meeting on April 2, 2026. Change `LOVE_START_DATE` if needed. `PROPOSAL_DATE` is set to your engagement date, December 4, 2026, at 6:00 PM local time. Update the time if needed. Use local date/time values in the format `YYYY-MM-DDTHH:mm:ss`.
2. Edit the six story moments, the letter, and other page copy in `index.html`.
3. The 21 gallery photos are stored locally in `assets/memories/` and shuffled on each page load. Update their paths/captions in the `memories` list in `script.js` to replace or remove them. The Secret Memory photo is `assets/secret-memory.jpeg`.
4. The licensed soundtrack is included as `assets/romantic-music.mp3`. The site attempts to start it when the page loads. Browsers may block audible autoplay until a visitor interacts with the page; if so, press the music button.

The gallery and Secret Memory photos are included locally. Web fonts load from Google Fonts. For an offline or fully self-hosted site, download font files you have permission to use and update their references.

## Run locally

For the full experience, including music, serve this folder with a static file server. For example, run `python3 -m http.server 8000` from the project folder and open `http://localhost:8000`. No install or build step is needed. Some browsers block audio when `index.html` is opened directly as a `file://` URL.

## Publish with GitHub Pages

1. Put these files at the root of a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select your branch and the `/(root)` folder, then save.
4. Visit the Pages URL shown in settings. Changes can take a short time to appear.

The site uses no backend. It includes a color-theme toggle, reduced-motion support, keyboard-accessible controls, responsive layouts, and native dialog lightboxes.
