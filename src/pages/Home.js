import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react" // useEffect is used to fetch data from the database, useState is used to store the data in the state

// Components
import SmoothieCard from "../components/SmoothieCard"
const Home = () => {

  const [fetchError, setFetchError] = useState(null) // this is used to store the error message
  const [smoothies, setSmoothies] = useState(null) // this is used to store the data from the database

  useEffect(() => {

    const fetchSmoothies = async () => { // this is used to fetch the data from the database
      const { data, error} = await supabase 
        .from("smoothies")
        .select("*")

      if (error) {
        setFetchError("Could not fetch data") // this is used to store the error message
        setSmoothies(null) // this is used to store the data from the database
        console.log(error) // this is used to log the error message
      }
      if (data) {
        setSmoothies(data) // this is used to store the data from the database
        setFetchError(null) // this is used to store the error message  
      }
    }
    fetchSmoothies()
  }, [])


  return (
    <div className="page home"> {/* this is the main div that contains the home page */}

      {fetchError && <p>{fetchError}</p>} {/* this is used to display the error message */}
      {smoothies && ( 
        <div className="smoothies"> {/* this is the div that contains the data from the database */}
          {/* order-by buttons */}
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} />
            ))}
          </div>
        </div>
      )}
      <h2>Home</h2>
    </div>
  )
}

export default Home