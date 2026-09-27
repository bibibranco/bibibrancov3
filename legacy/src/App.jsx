import './App.css'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import HeroSection from './components/HeroSection/HeroSection'
import Timeline from './components/Timeline/Timeline'
import Projects from './components/Latest Projects/Project/Projects'
import ProjectSection from './components/Latest Projects/ProjectSection'
function App() {

  return (
    <>
      <div>
        <Header></Header>
        <HeroSection></HeroSection>
        <ProjectSection></ProjectSection>
        <Timeline></Timeline>
        <About></About>
        <Contact></Contact>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
