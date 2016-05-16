Installing:

```
npm install mapbox-gl --save
typings install registry:dt/geojson --save --global 
typings install github:smartrak/mapbox-gl-js-typescript/typings.json --save
```

Edit your tsconfig.json to contain
```json
{
    "files": [
        "typings/index.d.ts"
	]
}
```

Now you can ```import mapboxgl = require('mapbox-gl');```

There is a working example with webpack here: https://github.com/danzel/mapboxgl-webpack-example