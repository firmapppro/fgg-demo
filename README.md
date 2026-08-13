# FGG Dashboard Proto

## 🌐 URLs

| Страница | URL |
|---|---|
| Лэндинг (RU) | http://fgg-yachts.my.s29.hhos.net/planes/landing.html |
| Лэндинг (EN) | http://fgg-yachts.my.s29.hhos.net/planes/landing_en.html |
| Дашборд | http://fgg-yachts.my.s29.hhos.net/planes/dashboard.html |

## 📡 FTP

| Параметр | Значение |
|---|---|
| Host | ftp29.nska.net |
| User | inpix |
| Remote dir | /domains/fgg-yachts.my/public_html |

## 🚀 Деплой

```bash
python3 upload_fgg.py
```

Скрипт загружает:
- `planes/dashboard.html`
- `planes/landing.html`
- `planes/landing_en.html`
- `planes/g550photo/` (все фото)
