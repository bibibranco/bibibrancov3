import './Experience.css' 

function Experience(props) {

  return (
    <>
    
  <div className='wrap'>
    <div className='title'>
      <h3>
      {props.text1}
      </h3>
      <h4>
      {props.text2}
      </h4>
    </div>
    <div className='description'>
      <h5>{props.text3}</h5>
    </div>
  </div>
    </>

  )
}

export default Experience
