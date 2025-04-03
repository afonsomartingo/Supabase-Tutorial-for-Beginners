import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react" // useEffect is used to fetch data from the database, useState is used to store the data in the state

// Components
import SmoothieCard from "../components/SmoothieCard"
const Home = () => {

  const [fetchError, setFetchError] = useState(null) // this is used to store the error message
  const [smoothies, setSmoothies] = useState(null) // this is used to store the data from the database
  const [orderBy, setOrderBy] = useState('created_at')


  const handleDelete = (id) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => { // this is used to fetch the data from the database
      const { data, error } = await supabase 
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: true })

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
  }, [orderBy]) // Add orderBy to dependency array to refetch when order changes


  return (
    <div className="page home"> {/* this is the main div that contains the home page */}

      {fetchError && <p>{fetchError}</p>} {/* this is used to display the error message */}
      {smoothies && ( 
        <div className="smoothies"> {/* this is the div that contains the data from the database */}
          <div className="order-by">
            <p>Order by:</p>
            <button 
              onClick={() => setOrderBy('created_at')}
              className={orderBy === 'created_at' ? 'active' : ''}
            >
              Time Created
            </button>
            <button 
              onClick={() => setOrderBy('title')}
              className={orderBy === 'title' ? 'active' : ''}
            >
              Title
            </button>
            <button 
              onClick={() => setOrderBy('rating')}
              className={orderBy === 'rating' ? 'active' : ''}
            >
              Rating
            </button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard 
              key={smoothie.id} 
              smoothie={smoothie} 
              onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
      <h2>Home</h2>
    </div>
  )
}

export default Home