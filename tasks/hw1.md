
<h2>Техічне завдання:</h2>

1. Створити новий github репозиторій для домашок, шаблон назви - **nodejs24_hw\_%YOURNAME%.** Додайте мене в колаборанти, щоб я міг мерджати пул ріквести і за потреби комітити щось
2. Додати оцей файлік [gitignore for node](https://github.com/github/gitignore/blob/main/Node.gitignore) (про всяк випадок - ім'я файла має бути просто **.gitignore**)
3. Створити нову бранчу **homework_1**,** в якій створити файл **utils/logger.js**. В ньому має бути реалізований логгер по типу того що я показував на занятті, але з трьома методами - **info**, **warn**, **error.\*\* Метод info пише в console.log, інші два - в console.error. Логгер має працювати таким чином (зверніть увагу на передачу параметра і де він потім використовується):

```
// main.js (в корні репозиторія):

const logger = require('./utils/logger')('main');

logger.info('the script is running!');
```

Що має вивестись в терміналі:

```
\> node ./main.js

main: the script is running!
```

Створити PR із бранчі з домашкою в бранчу main, поставити мене рев'юєром

**Прошу PR самим не мерджати, залиште це мені -** бо інакше якщо в мене є зауваження або пропозиції по коду, що мені з ними робити? ))

В здачу домашки кидайте посилання на пулріквест

---

<h2>Дополнительно:</h2>

[Відкозапис заняття](https://www.youtube.com/watch?v=_HgLSIrAwjc&ab_channel=UNIT1)

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

Вресии node установленные в вашей среде команда:

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
