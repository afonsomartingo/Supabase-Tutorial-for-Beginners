import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const SmoothieCard = ({ smoothie, onDelete }) => {  // this is the component that displays the smoothie card

  const handleDelete = async () => {
    const { error } = await supabase
      .from('smoothies')
      .delete()
      .eq('id', smoothie.id)
      .select()

    if (error) {
      console.log(error)
      alert('Error deleting the smoothie')
    } else {
      onDelete(smoothie.id)
    }
  }
  return (
    <div className="smoothie-card"> {/* this is the div that contains the smoothie card */} 
      <h3>{smoothie.title}</h3> {/* this is the title of the smoothie */}
      <p>{smoothie.method}</p> {/* this is the method of the smoothie */}
      <div className="rating">{smoothie.rating}</div> {/* this is the rating of the smoothie */}
      <div className="buttons">
        <Link to={"/" + smoothie.id}> {/* this is the link to the update page */}
          <i className="material-icons">edit</i> {/* this is the edit icon */}
        </Link>
        <i className="material-icons" onClick={handleDelete}>delete</i> {/* this is the delete icon */}
      </div>
    </div>
  )
}

export default SmoothieCard