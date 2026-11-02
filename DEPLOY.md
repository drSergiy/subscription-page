# Tolstoy VPN — страница подписки

Форк [remnawave/subscription-page](https://github.com/remnawave/subscription-page) с переработанным
оформлением. Логика, роуты, схема конфига и работа с панелью не менялись — изменён только фронтенд.

## Что меняется и где

| Что | Где |
| --- | --- |
| Ссылки (канал, бот, видео, поддержка), тексты FAQ, строка футера | `frontend/src/shared/constants/brand.ts` |
| Логотип | `frontend/public/assets/logo.png` |
| Палитра и шрифты | `frontend/src/shared/constants/theme/theme.ts` |
| Базовые стили страницы | `frontend/src/global.css` |

Тексты шагов установки, названия приложений, кнопки и переводы приходят **из конфига панели
Remnawave**, а не из кода. Их правят в панели, в настройках страницы подписки.

## Сборка образа

Каждый пуш в `main` запускает GitHub Actions, который собирает фронт, упаковывает образ и
кладёт его в GHCR:

```
ghcr.io/drsergiy/subscription-page:latest
```

После первой сборки пакет в GitHub создаётся приватным. Чтобы сервер мог его тянуть без
авторизации, откройте его: **GitHub → Packages → subscription-page → Package settings →
Change visibility → Public**.

Либо оставьте приватным и авторизуйтесь на сервере:

```bash
echo ВАШ_GITHUB_TOKEN | docker login ghcr.io -u drSergiy --password-stdin
```

## Деплой на сервер

1. Откройте compose страницы подписки:

```bash
nano /opt/remnawave/subscription/docker-compose.yml
```

2. Замените строку образа:

```yaml
    image: ghcr.io/drsergiy/subscription-page:latest
```

3. Обновите контейнер:

```bash
cd /opt/remnawave/subscription
docker compose pull
docker compose up -d
```

4. Проверьте, что поднялся:

```bash
docker compose logs -f --tail=50 remnawave-subscription-page
```

## Откат

Если что-то пошло не так, вернитесь на официальный образ:

```yaml
    image: remnawave/subscription-page:latest
```

и повторите `docker compose pull && docker compose up -d`.

## Обновление с upstream

Чтобы подтянуть изменения оригинального проекта:

```bash
git remote add upstream https://github.com/remnawave/subscription-page.git
git fetch upstream
git merge upstream/main
```

Конфликты будут в файлах темы, стилей и виджетов — это ожидаемо, их правили. Backend и схема
конфига не трогались, так что там конфликтов быть не должно.
