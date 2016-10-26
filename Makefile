getOffices:

	curl 'http://${env}.bostonglobe.com/electionapi/elections/2016-11-08?statePostal=MA' \
		| jq '[.races[] | .officeName]' | jq 'unique' > data/offices.json;
	cat data/offices.json

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
		ogr2ogr -clipsrc -172 18 -66 72 -where "GEOID NOT IN ('60','66','69','72','78')" -t_srs EPSG:4326 -f GeoJSON UNITS.geojson ../input/cb_2015_us_state_500k.shp; \
		topojson --id-property NAME -p STUSPS -o STATES.json --simplify-proportion 0.05 UNITS.geojson; \
		topojson --id-property NAME -p STUSPS -o STATES-lite.json --simplify-proportion 0.01 UNITS.geojson; \
		rm UNITS.geojson;

reproject_MA:
	cd data/output; \
		ogr2ogr -t_srs EPSG:4326 -f GeoJSON UNITS.geojson ../input/TOWNS_POLYM.shp; \
		topojson --id-property TOWN -p population=POP2010 -o TOWNS.json --simplify-proportion 0.1 UNITS.geojson; \
		topojson --id-property TOWN -p population=POP2010 -o TOWNS-lite.json --simplify-proportion 0.05 UNITS.geojson; \
		rm UNITS.geojson;

all: clean download reproject
