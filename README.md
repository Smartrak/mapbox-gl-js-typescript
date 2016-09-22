Repository Retired!
===================

This repository is now considered retired.
The latest one is hosted in the DefinitelyTyped repository here https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/mapbox-gl

Instructions here:
https://github.com/mapbox/mapbox-gl-js/issues/2440#issuecomment-249020865


Old instructions follow
=======================

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
