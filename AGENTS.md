# FGG dashboard proto

Static HTML prototypes for First Group Group. The live copies live on **chypulis.top** via FTP. GitHub Actions uploads a folder when that folder changes on `main`.

## Live URLs

| Local folder | Remote dir | URL |
|---|---|---|
| `domain/` | `/` | https://chypulis.top/ |
| `presentation/` | `/fgg-presentation/` | https://chypulis.top/fgg-presentation/ |
| `corporate/` | `/corporate/` | https://chypulis.top/corporate/ |
| `yachts/` | `/fgg-yachts/` | https://chypulis.top/fgg-yachts/ |
| `planes/` | `/fgg-planes/` | https://chypulis.top/fgg-planes/ |
| `filter-proto/` | `/filter-proto/` | https://chypulis.top/filter-proto/ |

English presentation: https://chypulis.top/fgg-presentation/en.html

English FlightAero corporate: https://chypulis.top/corporate/en.html

## Deploy

Push to `main`. Path filters pick the workflow:

- `domain/**` → homepage
- `presentation/**` → `/fgg-presentation/`
- `corporate/**` → `/corporate/`
- `yachts/**` → `/fgg-yachts/`
- `planes/**` → `/fgg-planes/`
- `filter-proto/**` → `/filter-proto/`

FTP secrets on the GitHub repo: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`. Do not commit credentials. Local `*.py` upload scripts are gitignored.

Do not upload `venv/`, `scratch/`, generator scripts, or PDFs. Yacht HTML needs `yachts/images/`. Plane HTML needs `planes/g550photo/`.

## After HTML edits

1. Commit the changed files.
2. Push `main`.
3. Check the matching **Deploy …** workflow on GitHub.
4. Hard-refresh the live URL.

Manual rerun: Actions → the deploy workflow → Run workflow.
