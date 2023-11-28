/* eslint-disable react/prop-types */
import './TimelineCard.css' 
import starIcon from '../../../assets/star.svg'
import InnerCardContent from './InnerCardContent/InnerCardContent'

function TimelineCard(props) {

  let sideClassTimeline;
  let sideClassTimeline2;

  if (props.type === 'right') {
    sideClassTimeline = 'sideClassTimeline_1 toggle_visibility';
  } else if (props.type === 'left') {
    sideClassTimeline = 'sideClassTimeline_2 toggle_visibility';
    sideClassTimeline2 = 'sideClassTimeline_1';
  }


  return (
    <>
    <div className='outer-container-timeline'>
      <div className={sideClassTimeline}>
        <InnerCardContent imgUrl={props.imgUrl} title={props.title} description={props.description} type={props.type} />
      </div>
      <div className='container-timeline'>
        <img className='icon-timeline' src={starIcon} alt="Star icon" />
        <div className='stroke-timeline'>
        </div>
      </div>
      <div className={sideClassTimeline2}>
        <InnerCardContent imgUrl={props.imgUrl} title={props.title} description={props.description} type={props.type} />
      </div>
    </div>
    </>
  )
}

export default TimelineCard
