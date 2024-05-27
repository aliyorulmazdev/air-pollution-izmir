"use client";
import React, { useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import { Style, Fill, Stroke } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import OSM from "ol/source/OSM";
import "ol/ol.css";

function MapComponent() {
  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            format: new GeoJSON(),
            url: "izmir.geojson",
          }),
          style: (feature) => {
            const name = feature.getProperties().Name;

            let fillColor = "rgba(0, 0, 0, 0)";
            if ([
              "Gaziemir",
              "Bornova\n\n",
              "Konak",
              "Buca",
              "Karsiyaka",
              "Çigli\n\n",
              "Kemalpasa",
              "Menderes",
              "Torbali",
              "Bayindir",
              "Tire",
              "Ödemis",
              "Kiraz",
              "Balçova",
              "Güzelbahçe",
              "Narlidere",
              "Seferihisar",
              "Urla",
              "Çesme",
              "Karaburun",
              "Foça",
              "Menemen",
              "Aliaga",
              "Beydag",
              "Selçuk"
            ].includes(name)) {
              fillColor = "rgba(0, 255, 0, 0.2)";
            }

            return new Style({
              fill: new Fill({
                color: fillColor,
              }),
              stroke: new Stroke({
                color: "green",
                width: 0.1
              }),
            });
          },
        }),
      ],
      view: new View({
        center: fromLonLat([27.1428, 38.4192]),
        zoom: 10,
      }),
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "800px" }}></div>;
}

export default MapComponent;
