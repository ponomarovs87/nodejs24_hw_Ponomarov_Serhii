Створити окремий файл `server.js`, в якому буде створюватись http server, і чекати на вхідні з'єднання на
будь якому порті який вам подобається (не менше 3000). Сервер повинен містити наступну логіку:

1. при звертанні на ендпоінт із шляхом (req.url) `/healthcheck`, якщо тип ріквеста GET - сервер повинен відповідати статусом `200 OK` і текстом `healthcheck passed` в тілі ріспонса
2. при звертанні на `/healthcheck` іншими методами, а також при звертанні на будь-які інші едїндпоінті сервер повинен відповідати статусом `404 Not Found``
3. Всі вхідні ріквести, (незалежно /healthcheck чи щось інше), сервер має логати в термінал і файли (<em>підключаємо наш логгер!</em>) Запис в лог виглядає так:
```
   `{METHOD} {req.url}`
   `{response status}`
   (тобто наприклад
   `GET /healthcheck 200`
   або
   `POST /test 404`).
```
   Ріспонси зі статусом 200 пишемо в `logger.info`, а статус 404 йде в `logger.warn`

Додайте в package.json скрипти для зручного запуску вашого
сервера
