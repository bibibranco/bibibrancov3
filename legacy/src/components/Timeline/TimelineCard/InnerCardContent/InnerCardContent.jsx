
/* eslint-disable react/prop-types */
import './InnerCardContent.css' 


function InnerCardContent(props) {
  let titleClass = 'inner-card-content-container';
  
  if (props.type === 'right') {
    titleClass = 'inner-card-content-container';
  } else if (props.type === 'left') {
    titleClass = 'inner-card-content-container__secondary';
  }

  return (
    <>
    <div className={titleClass}>
      <h4 className='inner-card-content-container__title'> {props.title}</h4>
      <p className='inner-card-content-container__paragraph'>{props.description}</p>
      <div style={{ backgroundImage: `url(${props.imgUrl})` }} className='inner-card-content-container__img'></div>
    </div>

    </>
  )
}

export default InnerCardContent
