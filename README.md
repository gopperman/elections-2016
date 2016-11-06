# elections-2016

Please note: do not reproduce Boston Globe logos or fonts without written permission.

## documentation

- components: <https://bostonglobe.github.io/elections-2016/>
- utils API: <https://bostonglobe.github.io/elections-2016/utils>

## setup

-   `npm i`

## dev

-   `API_URL=<API_URL> npm start` - start the main app.
-   `API_URL=<API_URL> HP_CONTAINER=<HP_CONTAINER> npm run start:hp` - start the homepage app, where HP_CONTAINER is one of `HpElectoralCollege, HpMap, HpFeaturedRaces`.

-   `npm run doc` - generate documentation

## prod

-   `npm run build` - build the main app.
-   `API_URL=<API_URL> npm run prod` - run the main app.

-   `API_URL=<API_URL> HP_CONTAINER=<HP_CONTAINER> npm run build:hp` - build the homepage app, where HP_CONTAINER is one of `HpElectoralCollege, HpMap, HpFeaturedRaces`.
-   `npm run prod:hp` - run the homepage app.

## deploy homepage

-   `make homepage env=<env> user=<user>` - deploy js/css files to `apps`.
-   `upload` - run this on `apps`.

## License

MIT © [The Boston Globe](http://github.com/BostonGlobe)
