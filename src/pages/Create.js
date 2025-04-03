import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('') // this is used to store the title of the smoothie
  const [method, setMethod] = useState('') // this is used to store the method of the smoothie
  const [rating, setRating] = useState('') // this is used to store the rating of the smoothie
  const [formError, setFormError] = useState(null) // this is used to store the form error

  const handleSubmit = async (e) => {
    e.preventDefault()
    // check if all fields are filled
    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    // add a new smoothie recipe to the database
    const { data, error } = await supabase
      .from('recipes')
      .insert([{ title, method, rating }])

    // if there is an error, log it
    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
    // if there is no error, log the data
    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}> 
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create