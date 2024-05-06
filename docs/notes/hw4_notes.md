# Дополнительно:

[Відеозапис заняття](https://www.youtube.com/watch?v=N0vdWVmquWU&t=3s&ab_channel=UNIT1)

---

## Ход выполнения:

1. Открыть два стрима :
    если нет папки ее создать
    открыть стрим по пути logs/`[параметр]`.log


2. Добавление в `logger` :
    в зависимости от метода должен писать в свой лог
    Должен писать в лог даже если не включен через `config || env` // если выключен не пишет только в консоль

3. Добавить дату и время в начало лога
    ```markdown
    1. `Дата(31.12.1999)` `Время(00:01:32)`
    2. Logger info....
    3. пустая строка
    4. ....сначала
    ```

4. Закрытие стрима :
    Закрытие стрима повесить на `beforeExit`

---
## Дополнительно:

1. Сделать чтобы в `env` был параметр на который будет реакция перезаписывать или дополнять лог
    * я это вижу реакцией на `true` || `false`

2. Переделать относительные ссылки через process.env
---
## Материалы :
[флаги](https://nodejs.org/api/fs.html#file-system-flags)
[конфиг ноды](https://github.com/node-config/node-config/wiki/Configuration-Files)
[fs.createWriteStream](https://nodejs.org/api/fs.html#fscreatewritestreampath-options)