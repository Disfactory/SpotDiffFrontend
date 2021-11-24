# SpotDiffFrontend

Frontend of Disfactory

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Testing database for development in frontend

```
json-server --watch testDB.json
```

In order to test the data communication for statile photo source and Leaflet (a JavaScript library for interactive maps), we add a local database by using package 'Json-server'. If you need to testing data communication and API, please execute `npm run serve` and `json-server --watch testDB.json` in differnet terminal at the same time.

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
