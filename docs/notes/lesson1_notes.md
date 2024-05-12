<h2>Дополнительно:</h2>

[Відеозапис заняття](https://www.youtube.com/watch?v=_HgLSIrAwjc&ab_channel=UNIT1)

---

<h2>Материалы:</h2>

\*для пользования NVM для видны </br>
<span style="color:red">Только не официальная версия ссылка-</span>
[nvm for windows](https://github.com/coreybutler/nvm-windows/releases)

<div style="color:green">После установки обязательно перезагрузить Винду</div>
---

Проверить версию nvm просто прописать в вашем терминале команда:

```
nvm
```

Версии node установленные в вашей среде команда:

```
 nvm ls
```

Версии node которые существуют глобально команда:

```
 nvm list available
```

Установка через nvm дополнительной версии node:

```
 nvm install Ваша версия( например 14.17.0 )
```

Переключится на версию:

```
 nvm use Ваша версия( например 14.17.0 )
 node -v
```

---

<h2>Цвета для консоли:</h2>

ссылка - [ANSI_escape_code#Colors](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)

---

основные цвета:

```
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m'
```

пример использования:

```
function greenConsoleLog(message) {
  console.log('\x1b[32m', message,'\x1b[0m');
}

greenConsoleLog('Этот текст будет зелёным');

```

- ! если не сбросить цвет в конце консоль будет вечно нового цвета
