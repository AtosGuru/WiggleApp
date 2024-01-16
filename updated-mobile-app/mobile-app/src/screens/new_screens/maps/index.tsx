import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  Keyboard,
  PermissionsAndroid,
  StyleSheet,
  Platform,
  View,
  Image,
  Text,
  LogBox,
  TouchableOpacity,
  AppState,

} from 'react-native'


import Mapbox, { MapView, StyleImport, Camera, ShapeSource, SymbolLayer, Images } from '@rnmapbox/maps';
import axios from 'axios'
import { YellowBox } from 'react-native'
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
  useFocusEffect
} from '@react-navigation/native'

import FastImage from 'react-native-fast-image'
// import MapboxDirections from '@rnmapbox/maps'
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions'
import Geolocation from '@react-native-community/geolocation'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { MAPBOX_APIKEY } from '../../../constants/config';



// Set your Mapbox access token
import { fetchClubs, MAPS_API_KEY } from '../../../store/actionThunk'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store/store'
import AnimatedLoader from 'react-native-animated-loader'
import {
  setRouteCoordinates,
  setEndLocation,
  setDestinationLat,
  setDestinationLng
} from '../../../store/mapSlice'

import { getEventByClub } from '../../../api/events.methods'
import { getClubsPlacesByLocation } from '../../../store/clubSlice'
import { getClubsPlaces } from '../../../api/map.methods'

type ModalInfoProps = {
  name: string
  street?: string
  photoUrl: string
}

Mapbox.setAccessToken(MAPBOX_APIKEY)

const DAY_LIGHT = 'day'
const NIGHT_LIGHT = 'dusk'
const CAMERA = 60
const ZOOM_LEVEL = 16
const MIN_ZOOM = 3
const MAX_ZOOM = 18


function MapScreen(): JSX.Element {
  LogBox.ignoreAllLogs()  
  
  const { DestinationLat, DestinationLng } = useSelector(
    (root: RootState) => root.map
  )

  const { position } = useSelector(state => state.location)
  const isFocused = useIsFocused()
  const isLoading = useSelector((root: RootState) => root.route.isLoading)
  const currentPosition = useSelector(
    (root: RootState) => root.location.position
  )

  const onKeyboardDismiss = () => Keyboard.dismiss()

  const [currentLat, setLatitude] = useState<number>(0)
  const [currLongitude, setLongitutde] = useState<number>(0)
  const [camera, setCamera] = useState<number>(CAMERA)
  const [zoomLevel, setZoomLevel] = useState<number>(ZOOM_LEVEL)
  const [adjustZoomMin, setAdjustZoom] = useState<number>(MIN_ZOOM)
  const [adjustZoomMax, setAdjustZoomMax] = useState<number>(MAX_ZOOM)
  const [head, setHead] = useState<number>(20)
  const [modal, setModal] = useState<boolean>(false)
  const [lat, setLat] = useState<number>(59.329)
  const [long, setLong] = useState<number>(18.06863)
  const [modalInfo, setModalInfo] = useState<ModalInfoProps | null>(null)
  const [showHighlighted, setHighlighted] = useState<boolean>(true)
  const [searchValue, setSearchValue] = useState<string>('')
  const [eventActive, setEventActive] = useState<boolean>(false)
  const [lightPreset, setLightPreset] = useState(DAY_LIGHT);
  const dispatch = useDispatch<AppDispatch>()

  const [isLoadingClubs, setIsLoadingClubs] = useState(true);

  const [clubs, setClub] = useState([])
  

  let mapRef = useRef<any>(null)
  let mapCameraRef = useRef<any>(null)

  // for fetching current location

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        var currentLongitudeMain = JSON.stringify(position.coords.longitude)
        var currentLongitude = Number(currentLongitudeMain)
        setLongitutde(currentLongitude)
        var currentLatitudeMain = JSON.stringify(position.coords.latitude)
        var currentLatitude = Number(currentLatitudeMain)
        setLatitude(currentLatitude)
      },
      error => {
        console.log('Error_Message = > ', error.message)
      },
      {
        enableHighAccuracy: false,
        timeout: 3000,
        maximumAge: 1000
      }
    )
  }


  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Wiggle',
          message: 'Wiggle needs access to your location'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location')
      } else {
        console.log('Location permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      Mapbox.requestAndroidLocationPermissions()
      requestLocationPermission()
      Mapbox.setTelemetryEnabled(false)
      getOneTimeLocation()
    }
  }, [DestinationLat, DestinationLng, isFocused, dispatch])

  useEffect(() => {
    getClubsByLocations({
      lat: currentPosition?.coords?.latitude,
      long: currentPosition?.coords?.longitude,
      searchInput: ""
    })    
    if (new Date().getHours() >= 6 && new Date().getHours() < 18) {
      setLightPreset(DAY_LIGHT)
    } else {
      setLightPreset(NIGHT_LIGHT)
    }
  }, [isFocused])

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {

        getClubsByLocations({
          lat: currentPosition?.coords?.latitude,
          long: currentPosition?.coords?.longitude,
          searchInput: ""
        }) 
      }
    }
    AppState.addEventListener('change', handleAppStateChange)
  }, [dispatch])


  setTimeout(() => {
    setHead(120)
  }, 6000)


  const handleFlyToLocation = () => {
    mapCameraRef.current.flyTo([DestinationLng, DestinationLat], 4000)
  }

  const handlePlaceSelect = (data, details = null) => {
    setHighlighted(false)
    const location = details?.geometry?.location
    dispatch(setEndLocation(details?.name))
    dispatch(setDestinationLng(location?.lng))
    dispatch(setDestinationLat(location?.lat))
    handleFlyToLocation()
  }

  const handleUserLocationUpdate = location => {
    console.log('User location updated:', location)
    // Perform actions based on the updated user location
  }

  const handleClearSearch = () => {
    setSearchValue('')
    dispatch(setDestinationLat(null))
    dispatch(setDestinationLng(null))
    dispatch(setRouteCoordinates([]))
  }

  const getClubsByLocations = async (data) =>{
    setIsLoadingClubs(true);
    setClub([]);

    const response = await getClubsPlaces(data)
    const clubData = response?.data?.results.map(
      ({ name, rating, photos, geometry, ...rest }: any) => ({
        name: name,
        id: Math.random(),
        ratings: rating,
        photos: photos,
        coordinates: [geometry?.location?.lng, geometry?.location?.lat],
        data: {
          ...rest
        }
      })
    )

    setClub(clubData)
    setIsLoadingClubs(false);

  }

  return (
    <>
      <MapView
        style={styles.map}
        styleURL={'mapbox://styles/mapbox/standard-beta'}
        // pitchEnabled={false}
        onPress={() => {
          onKeyboardDismiss(), setEventActive(false)
        }}
        scaleBarEnabled={false}
        ref={mapRef}
        centerCoordinate={[18.06863, 59.329]}        
        showUserLocation={true}
        showsMyLocationButton={true}
        logoEnabled={false}
      >
        <Camera
          ref={mapCameraRef}
          minZoomLevel={adjustZoomMin}
          maxZoomLevel={adjustZoomMax}
          zoomLevel={zoomLevel}
          maxBounds={10}
          bearing={-20}
          defaultSettings={{ centerCoordinate: [18.06863, 59.329] }}
          centerCoordinate={[currentPosition?.coords?.longitude, currentPosition?.coords?.latitude]}
          pitch={camera}
          // heading={head}
          // animationMode={'flyTo'}
          animationDuration={0}
          onUpdateUserLocation={handleUserLocationUpdate}
        />
        <ShapeSource
          id="iconSoureLayer"
          key={`iconSoureLayer${1}`}
          shape={{
            type: 'Point',
            coordinates: [position?.coords?.longitude, position?.coords?.latitude]
          }}>
          <Images images={{shape1: require('../../../../assets/icons/LocationActive.png')}} />
          <SymbolLayer
            id="iconLayer"
            style={{
              iconImage: 'shape1',
              iconSize: 0.6,
              iconAllowOverlap: true,
              iconIgnorePlacement: true
            }}
          />
        </ShapeSource>

        <ShapeSource
          id={`iconSource${2}`}
          key={`iconSource${2}`}
          shape={{
            type: 'Point',
            coordinates: [DestinationLng, DestinationLat]
          }}>
          <Images images={{shape2: require('../../../../assets/icons/annotations.png')}} />
          <SymbolLayer
            id={`iconLayer${1}`}
            style={{
              iconImage: 'shape2',
              iconSize: 0.2,
              iconOpacity: 1,
              iconAllowOverlap: true,
              iconIgnorePlacement: true,
              iconRotate: 0
            }}
          />
        </ShapeSource>
        {showHighlighted && (
          <ShapeSource
            id="myShapeSource"
            onPress={event => {
              setModalInfo({
                name: event.features[0].properties?.data.name,
                photoUrl:
                  event.features[0]?.properties?.data?.photos?.length > 0
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=${event.features[0].properties?.data.photos[0].photo_reference}&key=${MAPS_API_KEY}`
                    : require('../../../../assets/icons/club.png'),
                street: event.features[0].properties?.data?.data?.vicinity
              })

              setEventActive(true)
            }}
            shape={{
              type: 'FeatureCollection',
              features: clubs.map((item, index) => ({
                type: 'Feature',
                properties: {
                  name: 'Club Name',
                  rating: 4.5,
                  data: item ?? null
                },
                geometry: {
                  type: 'Point',
                  coordinates: item?.coordinates
                }
              }))
            }}>
            <Images images={{shape3: require('../../../../assets/icons/annotations.png')}} />
            <SymbolLayer
              id="mySymbolLayer"
              style={{
                iconImage: 'shape3', // Replace with your icon image name
                iconSize: 0.155, // Adjust the size as needed
                iconAllowOverlap: true, // Allow icons to overlap
                iconIgnorePlacement: true // Ignore icon placement
              }}
            />
          </ShapeSource>
        )}
        {!showHighlighted && (
          <ShapeSource
            id="myShapeSourceblur"
            onPress={(event) => {
              setModalInfo({
                name: event?.features[0]?.properties?.data?.name,
                photoUrl:
                  event.features[0].properties?.data?.photos?.length > 0
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=${event?.features[0]?.properties?.data?.photos[0]?.photo_reference}&key=${MAPS_API_KEY}`
                    : require('../../../../assets/icons/club.png'),
                street: event?.features[0]?.properties?.data?.data?.vicinity
              })
              setEventActive(true)
            }}

            shape={{
              type: 'FeatureCollection',
              features: clubs.map((item, index) => ({
                type: 'Feature',
                properties: {
                  name: 'Club Name',
                  rating: 4.5,
                  data: item ?? null
                },
                geometry: {
                  type: 'Point',
                  coordinates: item?.coordinates
                }
              }))
            }}>
            <Images images={{shape3: require('../../../../assets/icons/annotations.png')}} />
            <SymbolLayer
              id="mySymbolLayer"
              style={{
                iconImage: 'shape4', // Replace with your icon image name
                iconSize: 0.155, // Adjust the size as needed
                iconAllowOverlap: true, // Allow icons to overlap
                iconIgnorePlacement: true // Ignore icon placement
              }}
            />
          </ShapeSource>
        )}
        <StyleImport
          id="basemap"
          existing
          config={{
            lightPreset: lightPreset,             
            // @ts-ignore
            showPointOfInterestLabels: false,
          }}
        />
      </MapView>
      
      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        styles={{
          textInput: styles.textInput,
          powered: styles.powered,
          separator: styles.separator,
          description: styles.description,
          row: styles.row,
          textInputContainer: styles.InputContainer,
          container: styles.containerGoogle
        }}
        textInputProps={{
          placeholderTextColor: '#ffff',
          returnKeyType: 'search',
          onChangeText: setSearchValue,
          value: searchValue
        }}
        placeholder="Search"
        minLength={2}
        fetchDetails={true}
        renderLeftButton={() => (
          <Image
            resizeMode="contain"
            tintColor="#b0b0b0"
            style={styles.magnifyImage}
            source={require('../../../../assets/icons/Search.png')}
          />
        )}
        autoFocus={false}
        listEmptyComponent={() => (
          <View style={styles.flex}>
            <Text style={styles.notFound}>No results were found</Text>
          </View>
        )}
        options={{
          types: ['geocode', 'establishment']
        }}
        onPress={(data, details = null) => {
          handlePlaceSelect(data, details)
          setEventActive(false)
        }}
        query={{
          key: MAPS_API_KEY,
          language: 'en',
          components: 'country:SE'
        }}
      />

      <TouchableOpacity
        onPress={() => {
          mapCameraRef.current.flyTo([position?.coords?.longitude, position?.coords?.latitude], 6000)
          setTimeout(() => {
            mapCameraRef.current.zoomTo(16, 1000)
          }, 6100)
          setEventActive(false)
        }}
        style={styles.gotoImage}>
        <Image
          style={styles.locImageIcon}
          source={require('../../../../assets/icons/loc.png')}
        />
      </TouchableOpacity>
      <AnimatedLoader
        visible={isLoading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../../../../loader.json')}
        animationStyle={styles.lottie}
        speed={0.8}
      />
      {eventActive && (
        <TouchableOpacity activeOpacity={0.5} style={styles.moadalView}>
          <View style={styles.clubsView}>
            <Image
              resizeMode="stretch"
              style={styles.clubsImage}
              source={
                typeof modalInfo?.photoUrl === 'string'
                  ? { uri: modalInfo?.photoUrl }
                  : require('../../../../assets/icons/club.png')
              }
            />
          </View>
          <View style={styles.clubNameView}>
            <Text style={styles.singerText}>Event name</Text>
            <Text style={styles.clubTexts}>{modalInfo?.name ?? ''}</Text>
            <Text style={styles.addressText}>
              {modalInfo?.street ?? ''}
            </Text>
          </View>
        </TouchableOpacity>
      )
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    backgroundColor: '#252525'
  },
  powered: {},
  gotoImage: {
    position: 'absolute',
    bottom: 100,
    height: 60,
    right: 20
  },
  containerGoogle: {
    position: 'absolute',
    alignSelf: 'center',
    width: '90%',
    bottom: 0,
    top: Platform.OS === "ios" ? 80 : 40
  },
  description: {
    color: '#686868'
  },
  row: {
    backgroundColor: '#252525',
    padding: 13,
    height: 44,
    flexDirection: 'row'
  },
  clubsView: { height: '66%', borderRadius: 20 },
  locImageIcon: { width: 50, height: 50 },
  clubsImage: {
    width: '96%',
    height: '90%',
    alignSelf: 'center',
    marginTop: 6,
    borderRadius: 10
  },
  clubNameView: {
    flexDirection: 'column',
    alignContent: 'center',
    marginLeft: 12,
    margin: 2
  },
  clubTexts: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 5
  },
  addressText: { color: '#686868', fontSize: 13, },
  singerText: { color: '#FFCB52' },
  InputContainer: {
    backgroundColor: '#252525',
    borderRadius: 60,
    borderColor: '#fff',
    width: '100%'
  },
  magnifyImage: {
    marginTop: 15,
    marginLeft: 15,
    tintColor: '#fff',
    width: 26,
    height: 26,
    alignItems: 'center'
  },
  map: {
    flex: 1
  },
  textInput: {
    backgroundColor: '#252525',
    borderRadius: 60,
    color: 'white',
    height: 50,
    marginTop: 3,
    fontSize: 20,
    marginLeft: 3
  },
  textInputStyle: {
    color: 'yellow',
    height: 50
  },
  lottie: {
    width: 300,
    height: 300
  },
  moadalView: {
    width: '83%',
    height: 220,
    backgroundColor: '#252525',
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    top: 170,
    borderWidth: 1,
    alignSelf: 'center'
  },
  innerView: {
    borderColor: '#fff',
    flexDirection: 'row',
    margin: 2,
    marginTop: 10,
    justifyContent: 'space-around'
  },
  myLocation: { color: '#fff', fontSize: 13 },
  destination: {
    flexDirection: 'row',

    marginTop: 20,
    justifyContent: 'space-around',
    width: '100%'
  },
  sweden: {
    width: '30%',
    alignItems: 'center',
    alignContent: 'center'
  },
  innerText: { color: '#fff', textAlign: 'center', fontSize: 12 },
  w: { width: '30%' },
  wS: { width: '7%' },
  crossIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff'
  },
  callout: {
    width: 180,
    height: 120
  },
  clubText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  switchText: {
    position: 'absolute',
    top: 120,

    alignSelf: 'flex-end'
  },
  placesView: {
    position: 'absolute',
    alignSelf: 'center',
    width: '90%',
    marginTop: 20,
    bottom: 0,
    top: 40
  },
  notFound: { color: 'white', marginLeft: 10, fontSize: 20 },
  flex: { flex: 1 }
})

export default MapScreen