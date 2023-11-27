/* eslint-disable react/prop-types */
import './SectionTitle.css' 

function SectionTitle(props) {
  let titleClass = 'default-title';
  
  if (props.type === 'primary') {
    titleClass = 'primary-title';
  } else if (props.type === 'secondary') {
    titleClass = 'secondary-title';
  }


  return (
    <>
      <h3 className={titleClass}>
      {props.text}
      </h3>
    </>
  )
}

export default SectionTitle
