clean: clean_input clean_output

clean_input:
	cd data; \
	rm -rf input; \
	mkdir input;

clean_output:
	cd data; \
	rm -rf output; \
	mkdir output;

download: download_MA download_US

download_US:
	cd data/input; \
		curl http://www2.census.gov/geo/tiger/GENZ2015/shp/cb_2015_us_state_500k.zip > us.zip; \
		unzip us.zip;

download_MA:
	cd data/input; \
		curl http://wsgw.mass.gov/data/gispub/shape/state/towns.zip > towns.zip; \
		unzip towns.zip;

reproject: reproject_MA reproject_US

reproject_US:
	cd data/output; \
		ogr2ogr -t_srs EPSG:4326 -f GeoJSON STATES.geojson ../input/cb_2015_us_state_500k.shp; \
		topojson --id-property STUSPS -o STATES.json --simplify-proportion 0.05 STATES.geojson;

reproject_MA:
	cd data/output; \
		ogr2ogr -t_srs EPSG:4326 -f GeoJSON TOWNS.geojson ../input/TOWNS_POLYM.shp; \
		topojson -p REPORTING_UNIT=TOWN -o TOWNS.json --simplify-proportion 0.05 TOWNS.geojson;

all: clean download reproject
