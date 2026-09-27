import SectionTitle from '../SectionTitle/SectionTitle'
import './ProjectSection.css'
import '../../App.css'
import tulioImage from '../../assets/tulio.jpg';
import buscaImage from '../../assets/buscaresg.jpg';
import { useNavigate } from 'react-router-dom';
import { ArrowSquareOut } from '@phosphor-icons/react';

function ProjectSection() {
  const navigate = useNavigate();

  const handleProjectClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <div className='containerProjects'>
        <SectionTitle text="latest projects" />
      </div>

      <div className='contentProjects'>
        <div 
          className='project'
          onClick={() => handleProjectClick('https://medium.com/@bibianabranco/busca-resgatados-a-digital-platform-created-amidst-a-catastrophe-3b402c184f11')}
          role="button"
          tabIndex={0}
        >
          <img src={buscaImage} alt='Project 1' />
          <div className='projectDetails'>
            <div className='projectDetails__description'>
              <h4 className='inner-card-content-container__title'>Busca Resgatados</h4>
              <p className='inner-card-content-container__paragraph'>A digital platform created amidst a catastrophe</p>
            </div>
            <p className='projectDetails__link'>Check it out <ArrowSquareOut size={24} /></p>
          </div>
        </div>

        <div 
          className='project'
          onClick={() => handleProjectClick('https://vm.tiktok.com/ZMkJ1nLMd/')}
          role="button"
          tabIndex={0}
        >
          <img src={tulioImage} alt='Project 2' />
          <div className='projectDetails'>
            <div className='projectDetails__description'>
              <h4 className='inner-card-content-container__title'>Rato Túlio</h4>
              <p className='inner-card-content-container__paragraph'>The process of 3D printing and using Arduino to build my own Halloween costume</p>
            </div>
            <p className='projectDetails__link'>Check it out <ArrowSquareOut size={24} /></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectSection
