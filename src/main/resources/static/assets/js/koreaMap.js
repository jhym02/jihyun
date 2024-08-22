 var myChart = echarts.init(document.getElementById('map'));
	
	 fetch('assets/json/koreaMap.json')
     .then(response => response.json())
     .then(geoJson => {
         echarts.registerMap('myMap', geoJson);

         var option = {
             series: [{
                 type: 'map',
                 map: 'myMap',
                 label: {
                     show: true
                 },
                 itemStyle: {
                     areaColor: '#cccccc',
                     borderColor: '#333333'
                 }
             }]
         };

         myChart.setOption(option);
     });