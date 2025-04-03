const SmoothieCard = ({ smoothie }) => {  // this is the component that displays the smoothie card
  return (
    <div className="smoothie-card"> {/* this is the div that contains the smoothie card */} 
      <h3>{smoothie.title}</h3> {/* this is the title of the smoothie */}
      <p>{smoothie.method}</p> {/* this is the method of the smoothie */}
      <div className="rating">{smoothie.rating}</div> {/* this is the rating of the smoothie */}
    </div>
  )
}

export default SmoothieCard