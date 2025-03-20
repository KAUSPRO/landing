/*setTimeout(function(){
	var el = document.createElement('script');
	el.type = 'text/javascript';
	el.src = '//api-maps.yandex.ru/2.1/?lang=ru_RU&load=package.standard&apikey=15aea456-44d4-45a9-b1f4-846d940002da&onload=init';
	document.getElementsByTagName('body')[0].appendChild(el);
}, 2000);*/

//ymaps.ready(init);


function init(){
  var map,
    placemark,
    ymap_coords;

  ymap_coords = {
    msk: [55.730963, 37.646687],
    spb: [59.904097, 30.300436]
  };
	var activeCity = $(".map-controls .map-control.active").data('id');

	map = new ymaps.Map("map", {
		center: activeCity !== undefined && ymap_coords[activeCity] !== undefined ? ymap_coords[activeCity] : ymap_coords.msk,
		zoom: 17,
		controls: []
	});
	placemark = new ymaps.Placemark(ymap_coords.msk, {
		hintContent: 'КАУС',
		balloonContent: 'КАУС кадровое агенство'
	}, {
		iconLayout: 'default#image',
		iconImageHref: 'src/img/icons/placemark.png',
		iconImageSize: [40, 59],
		iconImageOffset: [-20, -29]
	});

	var placemark_spb = new ymaps.Placemark(ymap_coords['spb'], {
		hintContent: 'КАУС',
		balloonContent: 'КАУС кадровое агенство'
	}, {
		iconLayout: 'default#image',
		iconImageHref: 'src/img/icons/placemark.png',
		iconImageSize: [40, 59],
		iconImageOffset: [-20, -29]
	});



	var map_elem = document.getElementById('map');
	var viewport_width = map_elem.clientWidth;

	function updateMapPosition(){
		// Check for map-center class
		if (map_elem.className.indexOf('map-center') == -1) {
			// If not center then
			// Move our marker to the left

			if (viewport_width > 1023) {
				var position = map.getGlobalPixelCenter();
				// Get current width
				
				var map_offset_value = viewport_width / 5;
				map.setGlobalPixelCenter([ position[0] + map_offset_value , position[1] ]);
			}
		}
	};

	updateMapPosition();

	
	
	map.geoObjects.add(placemark);
	map.geoObjects.add(placemark_spb);


	// Map controls
	if ($(".map-controls").length) {
		$(".map-controls").on("click", ".map-control", function(e){
			e.preventDefault();

			if ($(this).hasClass("active")) {
				return false;
			} else {
				$(".map-control.active").removeClass("active");
				$(this).addClass("active");

				// Update the map position
				var coords_id = $(this).data("id") || "msk";

				map.panTo([
	                ymap_coords[coords_id]
	            ], {
	            	duration: 800,
	            	useMapMargin: true,
	            	safe: true,
	            	flying: false
	            }).then(function () {
					updateMapPosition();
				}, function (err) {
					 //alert('Произошла ошибка ' + err);
					 console.log('Произошла ошибка ' + err);
				}, this);

			}
		});
	}
}


