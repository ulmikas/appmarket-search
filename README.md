# Виджет поиска для аппмаркета

**структура файлов:**

настройки сборки для dev окружения и для production
./webpack.development.config.js
./webpack.production.config.js

**результат сборки**
./dist:
    build.js            // основной build который подключается на страницу
    build.js.map        // sourceMap
    index.html          // тестовая страница со встроенным поиском

**исходники**
./src:
    apps-search.css      // css для виджета
    index.html           // тестовая страница со встроенным поиском
    index.js             // входной файл для сборщика
    search-appmarket.js  // основной компонент приложения

    /components
        application.js   // компонент App
