/* eslint-disable no-underscore-dangle */
import L from 'leaflet';
import { flipAgriculturalLand } from './image';

const { DomEvent, Util } = L;

export const FarmlandLayer = L.TileLayer.extend({
  // Patch the Leaflet TileLayer createTile function to return a custom tile url
  // https://github.com/Leaflet/Leaflet/blob/990d49773a129619f2eed09712867627c8e3cf60/src/layer/tile/TileLayer.js#L147
  createTile(coords, done) {
    const tile = document.createElement('img');

    DomEvent.on(tile, 'load', Util.bind(this._tileOnLoad, this, done, tile));
    DomEvent.on(tile, 'error', Util.bind(this._tileOnError, this, done, tile));

    if (this.options.crossOrigin || this.options.crossOrigin === '') {
      tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
    }

    // for this new option we follow the documented behavior
    // more closely by only setting the property when string
    if (typeof this.options.referrerPolicy === 'string') {
      tile.referrerPolicy = this.options.referrerPolicy;
    }

    // The alt attribute is set to the empty string,
    // allowing screen readers to ignore the decorative image tiles.
    // https://www.w3.org/WAI/tutorials/images/decorative/
    // https://www.w3.org/TR/html-aria/#el-img-empty-alt
    tile.alt = '';

    const originalSrc = this.getTileUrl(coords);

    flipAgriculturalLand(originalSrc).then((flippedSrc) => {
      tile.src = flippedSrc;
    });

    return tile;
  },
});

export default FarmlandLayer;

export function addFarmlandLayer(map) {
  new FarmlandLayer(
    'https://map.coa.gov.tw/server/rest/services/FarmlandSurvey/L13_109/MapServer/tile/{z}/{y}/{x}',
    {
      opacity: 0.5,
    },
  ).addTo(map);
}
