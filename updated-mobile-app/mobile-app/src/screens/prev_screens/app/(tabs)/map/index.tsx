import { ScreenWrapper } from "../../../../../components/ScreenWrapper"
import React, { useEffect, useRef, useState } from "react"
import { Text } from "../../../../../components"
import Mapbox from '@rnmapbox/maps';
import { Image, StyleSheet, View } from "react-native";
import axios from "axios";
const accessToken = "pk.eyJ1IjoiZGV0c3VtaSIsImEiOiJjbGo0YmdxMjUwMHBmM2xwYW9kdDhzeXFtIn0.jj3tALTLgCnS84y-VSN8KA"
Mapbox.setWellKnownTileServer('mapbox')
Mapbox.setAccessToken(accessToken);

const testImage = require("../../../../assets/images/testphoto.png");
const final = require('../../../../assets/images/club.png');
const styles2 = {
  lineLayer: {
    lineColor: 'white',
    lineCap: 'round',
    lineJoin: 'round',
    lineWidth: 14,
		lineGradient: [
			'interpolate',
			['linear'],
			['line-progress'],
			0,
			'#FFFFFF',
			0.3,
			'#D0D0D0',
			0.7,
			'#FFFFFF',
			1,
			'#D0D0D0'
		]
  },
};

export default function Events() {
	const mapRef = useRef<Mapbox.MapView | null>(null);
	const cameraRef = useRef<Mapbox.Camera | null>(null);
	const [geojson, setGeojson] = useState<any>(null)

	useEffect(() => {
		(async () => {
			const res = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/walking/-74.014359%2C40.704578%3B-74.01367%2C40.702368?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${accessToken}`)
			if (res.data) {
				const route = res.data.routes[0].geometry.coordinates;
				const geojsonRes = {
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'LineString',
						coordinates: route
					}
				};
				setGeojson(geojsonRes)
			}
		})()
	}, [])

	return (
		<ScreenWrapper>
			<Mapbox.MapView ref={mapRef} style={styles.map} styleURL="mapbox://styles/detsumi/clj5qhqle005d01pdcn5yda90/draft" >
				<Mapbox.Camera
					zoomLevel={16}
					centerCoordinate={[-74.014889, 40.703397]}
					pitch={15}
					heading={0}
				/>
				{geojson && (
					 <Mapbox.ShapeSource
            id="source1"
            lineMetrics={true}
            shape={geojson}
          >
            <Mapbox.LineLayer id="layer1" style={styles2.lineLayer} />
          </Mapbox.ShapeSource>
				)}
					<Mapbox.MarkerView coordinate={[-74.014259, 40.704553]}>
						<View style={styles.outerCircle}>
							<View style={styles.innerCircle}>
								<Image source={testImage} style={styles.image} resizeMode="contain" />
							</View>
						</View>
					</Mapbox.MarkerView>
					<Mapbox.MarkerView coordinate={[-74.013606, 40.702507]}>
						<Image source={final} style={styles.imageFinal} resizeMode="contain" />
					</Mapbox.MarkerView>
			</Mapbox.MapView>
		</ScreenWrapper>
	)
}

const styles = StyleSheet.create({
	map: {
		flex: 1,
		marginBottom: 60,
	},
	image: {
		width: 44,
		height: 44
	},
	imageFinal: {
		width: 70,
		height: 70
	},
	innerCircle: {
		width: 70,
		height: 70,
		backgroundColor: 'rgba(255, 123, 2, 0.3)',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 35,
	},
	outerCircle: {
		width: 100,
		height: 100,
		backgroundColor: 'rgba(255, 123, 2, 0.1)',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
	}
})