# elections-2016

Please note: do not reproduce Boston Globe logos or fonts without written permission.

## documentation

- components: <https://bostonglobe.github.io/elections-2016/>
- utils API: <https://bostonglobe.github.io/elections-2016/utils>

## setup

-   `npm i`

## dev

-   `API_URL=<API_URL> npm start` - start the app
-   `API_URL=<API_URL> HP_CONTAINER=<HP_CONTAINER> npm run start:hp` - start the homepage app, where HP_CONTAINER is one of `HpElectoralCollege, HpMap, HpFeaturedRaces`.
-   `npm run doc` - generate documentation

## prod

-   `npm run build`
-   `API_URL=<API_URL> npm run prod`

## License

MIT © [The Boston Globe](http://github.com/BostonGlobe)
