import {createContext, useContext, useEffect, useState } from 'react';
import { useJsApiLoader } from "@react-google-maps/api";

// const API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY;
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Define libraries as a constant outside of the component
const libraries = ["places"];

const GoogleMapsContext = createContext();



function GoogleMapsContextProvider({children}) {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries: libraries,
    });

    if (loadError) {
        console.error(loadError);
    }
    
    const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(isLoaded);
    const [placesDetails, setPlacesDetails] = useState({});
    const [map, setMap] = useState(null);
    const [itineraryPlacesDetails, setItineraryPlacesDetails] = useState({});

    useEffect(() => {
        // Update isGoogleMapsLoaded when isLoaded changes
        setIsGoogleMapsLoaded(isLoaded);
    }, [isLoaded]);
    
    const contextValue = {
        isGoogleMapsLoaded,
        setIsGoogleMapsLoaded,
        placesDetails,
        setPlacesDetails,
        itineraryPlacesDetails,
        setItineraryPlacesDetails,
        map,
        setMap,
    };

    return (
        <GoogleMapsContext.Provider value={contextValue}>
            {children}
        </GoogleMapsContext.Provider>
    )
}

function useGoogleMaps() {
    const context = useContext(GoogleMapsContext);
    if (context === undefined) {
        throw new Error('useLogin must be used within a LoginContextProvider');
    }
    return context;
}

export { GoogleMapsContextProvider, useGoogleMaps };