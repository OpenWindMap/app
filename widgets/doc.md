> # Diffuser les widgets
>
> 1. Se rendre sur la branch `feature/PIOUPWIDGETS-1`
>    ```bash
>    git checkout feature/PIOUPWIDGETS-1
>    ```
> 2. Build les widgets
>    ```bash
>    cd widgets
>    npm run build
>    ```
> 2. Heberger le dossier `dist`  
>    Il contient les fichiers JS, CSS ainsi que les dependances statics : images, logo, etc...
>  
>

# Widgets

## Requirements
Pour utiliser les widgets, il suffit simplement, dans un premier temps, d'importer les sources JavaScript ainsi que le ficher de style.
Un seul import par type de widget est suffisant, vous pourrez ensuite utiliser autant de fois le widget que voulu.
```html
<head>
  <link rel="stylesheet" href="WIDGET_STYLE_URL">
  <script src="WIDGET_JAVASCRIPT_URL" defer></script>
<head>
```

## Widgets

### Station overview
```html
<link rel="stylesheet" href="WIDGET_STYLE_URL">
<script src="WIDGET_JAVASCRIPT_URL" defer></script>
```
```html
<pioupiou-station station-id="{station_id}"></pioupiou-station>
```
> <pioupiou-station station-id="620"></pioupiou-station>

### Station map
```html
<link rel="stylesheet" href="WIDGET_STYLE_URL">
<script src="WIDGET_JAVASCRIPT_URL" defer></script>
```
```html
<pioupiou-map station-id="{station_id}"></pioupiou-map>
```

> <pioupiou-map station-id="620"></pioupiou-station>

## Composition

Il est possible de composer les widgets entre eux, dans l'ordre que vous souhaitez.
Seulement le dernier widget se verra apposé le watermark.
```html
<div>
  <pioupiou-map station-id="620"></pioupiou-map>
  <pioupiou-station station-id="620"></pioupiou-station>
</div>
```
<div>
  <pioupiou-map station-id="620"></pioupiou-map>
  <pioupiou-station station-id="620"></pioupiou-station>
</div>

```html
<div>
  <pioupiou-station station-id="620"></pioupiou-station>
  <pioupiou-map station-id="620"></pioupiou-map>
</div>
```
<div>
  <pioupiou-station station-id="620"></pioupiou-station>
  <pioupiou-map station-id="620"></pioupiou-map>
</div>

<!-- pioupiou-station js:52.1KB css:22.9KB -->
<script src="./dist/station-overview.js"></script>
<link rel="stylesheet" href="./dist/station-overview.css">

<!-- pioupiou-map js:97.1KB css:23.4KB -->
<script src="./dist/map-content.js"></script>
<link rel="stylesheet" href="./dist/map-content.css">