import { useState, useRef, useEffect } from 'react';
import AppHelper from '../apphelper'
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = AppHelper.MAPBOX_KEY

export default function Map({province}){
	const mapContainerRef = useRef(null)
	const [latitude, setLatitude] = useState(0)
	const [longitude, setLongitude] = useState(0)

	console.log(province)

	useEffect(() => {
		fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${province}.json?access_token=${ AppHelper.MAPBOX_KEY }`)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			console.log(data.features[0].center[0])
			console.log(data.features[0].center[1])
			setLongitude(data.features[0].center[0])
			setLatitude(data.features[0].center[1])
		})

		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [longitude, latitude],
			zoom: 8
		})

		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

		// const marker = new mapboxgl.Marker()
		// .setLngLat([longitude, latitude])
		// .addTo(map)

		// console.log(marker)

		return () => map.remove()
	}, [latitude, longitude])

	return(
		<div className="mapContainer" ref={mapContainerRef}/>
	)
}