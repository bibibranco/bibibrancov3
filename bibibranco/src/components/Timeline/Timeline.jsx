/* eslint-disable react/prop-types */
import SectionTitle from '../SectionTitle/SectionTitle'
import './Timeline.css' 
import starIcon from '../../assets/star.svg'
import TimelineCard from './TimelineCard/TimelineCard'
import { Link } from 'react-router-dom';

function Timeline() {

  return (
    <>
    <div className='container-timeline-wrapper'>
      <div className="container-timeline-wrapper__text">
        <SectionTitle  text="count me in for"></SectionTitle>
      </div>
      <div className='container-inner-timeline'>
        <Link to="/project/1">
          <TimelineCard imgUrl="/img01.jpg" title="product design" description="lorem ipsum dolor sit amer" type="right" />
        </Link>
        <Link to="/project/2">
          <TimelineCard imgUrl="/img01.jpg" title="crafting" description="lorem ipsum dolor sit amet" type="left" />
        </Link>
        <TimelineCard imgUrl="/img01.jpg" title="interface" description="lorem ipsum dolor sit amet" type="right" />
        <TimelineCard imgUrl="/img01.jpg" title="interface" description="lorem ipsum dolor sit amet" type="left" />
      </div>
      <div className='container-timeline-wrapper__icon_wrapper'>
        <img className='container-timeline-wrapper__icon-timeline' src={starIcon} alt="Star icon" />
        <span className='container-timeline-wrapper__icon_wrapper__txt'>and hoping this list grows bigger everyday</span>
      </div>
    </div>

    </>
  )
}

export default Timeline
