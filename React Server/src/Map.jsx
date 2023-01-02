import React, {useEffect} from 'react';
import geoJson from './assets/new_map'

const { naver } = window;
const regionGeoJson = geoJson['features'];
function YMap(props) {
    const [ku, dong, setKu, setDong, setKuku, setTotong] = [props.methods.ku, props.methods.dong, props.methods.setKu, props.methods.setDong, props.methods.setKuku, props.methods.setTotong]
    const kudong = '서울특별시 '+ku+' '+dong
    let focus = [];
    
    useEffect(() => {
        // map 구현
        const container = document.getElementById("map"); // 지도를 표시할 div
        const position = new naver.maps.LatLng(37.5408099887378, 126.98069983235905);
        const mapOptions = {
            center: position,
            zoom: 12,
            minZoom: 6,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        };
        const map = new naver.maps.Map(container, mapOptions);

        // startDataLayer
        function startDataLayer() {
            map.data.setStyle(function(feature) {
                var styleOptions = {
                    fillColor: '#3F51B5',
                    fillOpacity: 0.0001,
                    strokeColor: '#3F51B5',
                    strokeWeight: 3,
                    strokeOpacity: 0.4
                };
                if (feature.getProperty('focus')) {
                    styleOptions.fillOpacity = 0.6;
                    styleOptions.fillColor = '#448AFF';
                    styleOptions.strokeColor = '#448AFF';
                    styleOptions.strokeWeight = 4;
                    styleOptions.strokeOpacity = 1;
                }
        
                return styleOptions;
            });
        
            regionGeoJson.forEach(function(geojson) {
                map.data.addGeoJson(geojson);
            });
            
            if (kudong !== '서울특별시  '){
                map.data._features.map(f => {
                  if (f.getProperty('EMD_NM') === kudong)  {
                    f.setProperty('focus', true);
                    if(focus[0]) {
                        map.data._features[focus[0]].setProperty('focus', false)
                    }
                    focus = [map.data._features.indexOf(f)]
                    return map.data._features.indexOf(f)
                  }
                })   
            }

            try {
                map.data.addListener('click', function(e) {
                    var feature = e.feature,
                        regionName = feature.getProperty('EMD_NM');
                        
                        setKu(regionName.split(' ')[1])
                        setDong(regionName.split(' ')[2])
                        
                    if (feature.getProperty('focus') !== true) {
                        feature.setProperty('focus', true);
                        if (focus[0]) {
                            map.data._features[focus[0]].setProperty('focus', false)
                        }
                        focus = [map.data._features.indexOf(e.feature)]
                    } else {
                        feature.setProperty('focus', false);
                        focus = []
                    }
                });
            } catch {}


            map.data.addListener('mouseover', function(e) {
                var feature = e.feature,
                    regionName = feature.getProperty('EMD_NM');
                    
                    setKuku(regionName.split(' ')[1])
                    setTotong(regionName.split(' ')[2])

                map.data.overrideStyle(feature, {
                    fillOpacity: 0.6,
                    strokeWeight: 4,
                    strokeOpacity: 1
                });
            });
        
            map.data.addListener('mouseout', function(e) {
                map.data.revertStyle();
            });
        }
    
        naver.maps.Event.once(map, 'init', function () {
            for (var i = 1; i < 2; i++) {
                startDataLayer()
                $.ajax({
                    url: url,
                    success: function(idx) {
                        return function(geojson) {
                            regionGeoJson[idx] = geojson;
                            loadCount++;

                            if (loadCount === 1) {
                                ;
                                
                            }
                        }
                    }(i - 1)
                });
            }
        });

    },[dong]);
    
    return (
        <div id="map" style={{ width:'75%', height:'60vh', borderRadius:'2rem', border:'None' }}></div>
    );
};

export default YMap;