download:
	cd data; \
		rm -rf input; \
		mkdir input; \
		cd input; \
		curl http://wsgw.mass.gov/data/gispub/shape/state/towns.zip > towns.zip; \
		unzip towns.zip;

reproject:
	cd data; \
		rm -rf output; \
		mkdir output; \
		cd output; \
		ogr2ogr -t_srs EPSG:4326 -f GeoJSON ../input/TOWNS.geojson ../input/TOWNS_POLYM.shp; \
		topojson -p REPORTING_UNIT=TOWN -o TOWNS.json --simplify-proportion 0.05 ../input/TOWNS.geojson;


# topojson -p REPORTING_UNIT=TOWN -o REPORTING_UNITS.json --simplify-proportion 0.1 ../input/TOWNS_POLYM.shp;
