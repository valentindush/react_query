import React, { useEffect , useState} from "react";
import { getCurrent, search } from "../api/api";
import { WeatherCard } from "../components/wheatherCard";

export const Search = () => {

  const [currentLocation, setCurrentLocation] = useState(null);

  const [items, setItems] = useState([]);

  const [searchTxt, setSearchTxt] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentItem, setCurrentItem] = useState(null)

  const getWheatherForCurrentLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition( async(position) => {
        const { latitude, longitude } = position.coords;
        const response = await search(`${latitude},${longitude}`);

        if(response.data.length === 0) {
          console.log('No data found');
          return false;
        }

        setCurrentLocation(response.data[0])

        const response2 = await getCurrent(response.data[0].url);
        const item = {
          location: {
            name: response2.data.location.name,
            region: response2.data.location.region,
            country: response2.data.location.country,
          },
          weather: {
            condition: response2.data.current.condition.text,
            icon: response2.data.current.condition.icon,
            temperature: response2.data.current.temp_c,
            humidity: response2.data.current.humidity,

          }
        }
        setCurrentItem(item)
      });
    } else {
      return false;
    }
  };


  const handleSearch = async(e)=>{
    const searchQuery = `${e.target.value}`;
    const response = await search(searchQuery);
    setSearchResults(response.data);
    console.log(response.data)
  }

  const handleSetActiveLocation = async (item)=>{
    setCurrentLocation(item)
    setSearchResults([])
    setSearchTxt('')

    const response = await getCurrent(currentLocation.url);
    console.log(response.data)
  }

  useEffect(() => {
    getWheatherForCurrentLocation();
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-900 p-12 overflow-y-scroll">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl text-blue-500 font-bold">Wheather Me</h2>

        <div className="">
          <p className="text-white font-medium text-lg">
            Current location :{" "}
            {currentLocation && <span className="font-semibold text-xl">{currentLocation.name}, {currentLocation.region}, {currentLocation.country}</span>}
          </p>
        </div>
      </div>

      <div className="mt-12 relative">
        <input
          onChange={(e)=>handleSearch(e)}
          type="text"
          placeholder="Search city/country or latitude,longitude"
          className="bg-gray-800 p-3 w-[40%] min-w-[300px] border-none outline-none focus:outline-blue-500 rounded-md text-white"
        />

        {searchResults.length !== 0 &&
        <div className="absolute bg-gray-800 shadow-lg p-3 rounded-md">
          {searchResults.map((item,index)=>{
            return(
              <div onClick={()=>handleSetActiveLocation(item)} className="p-2 hover:bg-gray-900 cursor-pointer bg-opacity-25 rounded-md">
                <p className="text-gray-300">{`${item.name}, ${item.region}, ${item.country}`}</p>
              </div>
            )
          })}
        </div>}

      </div>

      <div className="mt-4">
        <h2 className="text-gray-300 text-xl">Wheather information</h2>
      </div>
      
      <div className="mt-4">
        {currentItem && <WeatherCard item={currentItem} />}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {items.length != 0 && items.map((item,index)=>{
          return <WeatherCard key={index} item={item} />
        })}
      </div>

    </div>
  );
};
