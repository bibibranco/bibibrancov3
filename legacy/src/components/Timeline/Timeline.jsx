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
          <TimelineCard imgUrl="/img01.jpg" title="product design" description="I've been working on end-to-end UI/UX projects for the last 5 years" type="right" />
        </Link>
        <Link to="/project/2">
          <TimelineCard imgUrl="/woodworking2.jpg" title="crafting" description="playing around with woodworking, glass cutting and circuits since I was a child" type="left" />
        </Link>
        <Link to="/project/3">
          <TimelineCard imgUrl="/1D6A3859.jpg" title="data viz" description="creating spreadsheets and turning the collected data into visual assets is one of my passions" type="right" />
        </Link>
        <TimelineCard imgUrl="/habla.jpg" title="sharing knowledge" description="talking about my passions and curiosities with other people keeps me moving" type="left" />
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
