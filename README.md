# FGG Dashboard Proto

Static prototypes for First Group Group. Push to `main` uploads the matching folder to [chypulis.top](https://chypulis.top/).

## Live URLs

| Страница | URL |
|---|---|
| Домен | https://chypulis.top/ |
| Презентация (RU) | https://chypulis.top/fgg-presentation/ |
| Презентация (EN) | https://chypulis.top/fgg-presentation/en.html |
| FlightAero corporate (RU) | https://chypulis.top/corporate/ |
| FlightAero corporate (EN) | https://chypulis.top/corporate/en.html |
| Яхты — навигация | https://chypulis.top/fgg-yachts/ |
| Яхты — дашборд | https://chypulis.top/fgg-yachts/dashboard.html |
| Яхты — лендинг (RU) | https://chypulis.top/fgg-yachts/landing.html |
| Яхты — лендинг (EN) | https://chypulis.top/fgg-yachts/landing_en.html |
| Самолёты — лендинг (RU) | https://chypulis.top/fgg-planes/ |
| Самолёты — лендинг (EN) | https://chypulis.top/fgg-planes/landing_en.html |
| Самолёты — дашборд | https://chypulis.top/fgg-planes/dashboard.html |
| Фильтры кэша топлива | https://chypulis.top/filter-proto/ |

## Деплой

```bash
git add -A
git commit -m "Describe the change"
git push origin main
```

GitHub Actions выгружает только затронутую папку:

| Локальная папка | Директория на FTP |
|---|---|
| `domain/` | `/` (корень домена) |
| `presentation/` | `/fgg-presentation/` |
| `corporate/` | `/corporate/` |
| `yachts/` | `/fgg-yachts/` |
| `planes/` | `/fgg-planes/` |
| `filter-proto/` | `/filter-proto/` |

Ручной повтор: GitHub → Actions → нужный workflow → Run workflow.

FTP-секреты лежат в GitHub (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`). Пароли в репозиторий не коммитить.
