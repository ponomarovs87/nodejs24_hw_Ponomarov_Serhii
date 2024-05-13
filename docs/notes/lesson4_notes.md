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

## Lock в .gitignore

No, the package-lock.json SHOULD NOT be added to .gitignore. Instead, I strongly advise:

Add the package-lock.json you to your version control repository
Use npm ci instead of npm install when building your application both locally and in your deployment pipeline.
(The ci command is available since npm@5.7, if in doubt upgrade your npm via:
npm install -g npm.)
One of the biggest downside of the npm install command is its unexpected behavior that it may mutate the package-lock.json, whereas npm ci only uses the version in the lockfile and produces an error if the package-lock.json and package.json are out of sync.

Also, npm ci requires the existence of a package-lock.json and would print an error if it wasn't there. There is a strong use-case for being able to trust that the project's dependencies resolve repeatably in a reliable way across different machines.

Furthermore, npm ci nukes the entire node_modules folder before adding the dependencies making sure you work with your actual dependencies instead of local changes while still being faster than a normal npm install.

From a package-lock.json you get exactly that: a known-to-work state with always exactly the same dependency tree.

In the past, I had projects without package-lock.json / npm-shrinkwrap.json / yarn.lock files whose build would fail one day because a random dependency got a breaking update. (While a lot of libraries respect the semvar versioning guideline, you have no guarantee they won't break on a minor upgrade.)

Those issue are hard to resolve as you sometimes have to guess what the last working version was.

In regards to testing the latest dependencies for your project: This is what npm update is for and I argue that it should be run by a developer, who also runs the test locally, who resolves issue if they may arise, and who then commits the changed package-lock.json. (If an upgrade fails, they can revert to the last working package-lock.json.)

Furthermore, I rarely upgrade all the dependencies at once (as that too might require further maintenance) but I rather cherry-pick the update I need (e.g. npm update {dependency}, or npm install {dependency}@2.1.3). Which is another reason why I would see it as a manual maintenance step.

If you really want to have it automated you could create a job for:

checkout repository
run npm update
run tests
if tests passes, then commit and push to repository
else fail and report issue to be manually resolved
This is something I would see hosted on a CI server, e.g. Jenkins, and it should not be achieved through aforementioned reason through adding the file to the .gitignore.

Or to quote npm doc:

It is highly recommended you commit the generated package lock to source control: this will allow anyone else on your team, your deployments, your CI/continuous integration, and anyone else who runs npm install in your package source to get the exact same dependency tree that you were developing on. Additionally, the diffs from these changes are human-readable and will inform you of any changes npm has made to your node_modules, so you can notice if any transitive dependencies were updated, hoisted, etc.

And in regards to the difference between npm ci vs npm install:

The project must have an existing package-lock.json or npm-shrinkwrap.json.
If dependencies in the package lock do not match those in package.json, npm ci will exit with an error, instead of updating the package lock.
npm ci can only install entire projects at a time: individual dependencies cannot be added with this command.
If a node_modules is already present, it will be automatically removed before npm ci begins its install.
It will never write to package.json or any of the package-locks: installs are essentially frozen.
Share
Improve this answer
Follow
edited May 4, 2022 at 10:39
answered Jan 30, 2018 at 15:02
k0pernikus's user avatar
k0pernikus
64k7575 gold badges226226 silver badges352352 bronze badges
8
@MagicLAMP You rather should use npm ci instead of npm install on your build server. Then your problem would go away. – 
k0pernikus
 Aug 26, 2019 at 8:11 
6
Fwiw the .gitignore on the webpack Github does include package-lock.json... – 
jsstuball
 Jan 28, 2020 at 19:16 
7
@JSStuball webpack uses yarn instead of npm. It has a yarn.lock (equivalent to package-lock.json) in its repository. See also: github.com/webpack/webpack/pull/6930#issuecomment-377987981 – 
k0pernikus
 Jan 28, 2020 at 19:49
3
@k0pernikus finally got npm ci working on my ansible deploy, and committed package-lock to the repository. This allows my front end developer to deploy things. Thanks. – 
MagicLAMP
 May 4, 2020 at 3:07
5
@Jundl Could you please open a new question in the form of "Why does npm ci not use cache for chromium dependency?" and reference minimal, complete and verifyable example of a package.json of yours? I would have a look then. You could link your question here. – 
k0pernikus
 Feb 2, 2021 at 11:14