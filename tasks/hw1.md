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

<h2>Дополнительно:</h2>

[Відкозапис заняття](https://www.youtube.com/watch?v=_HgLSIrAwjc&ab_channel=UNIT1)

<h2>Материалы:</h2>

\*для пользования NVM для видны </br>
<span style="color:red">Только не официальная версия ссылка-</span>
[nvm for windows](https://github.com/coreybutler/nvm-windows/releases)

<div style="color:green">После установки обязательно перезагрузить Винду</div>

Проверить версию nvm просто прописать в вашем терминале команда: <div style="color:yellow">nvm</div>

Вресии node установленные в вашей среде команда: <div style="color:yellow">nvm ls</div>

Версии node которые существуют глобально команда: <div style="color:yellow">nvm list available</div>

Установка через nvm дополнительной версии node: <div style="color:yellow">nvm install **Ваша версия( например 14.17.0 )**</div>

Переключится на версию: <div style="color:yellow">nvm use **Ваша версия( например 14.17.0 )**</br>node -v</div>
