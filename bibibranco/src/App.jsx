import './App.css'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Header from './components/Header/Header'
import HeroSection from './components/HeroSection/HeroSection'
import Timeline from './components/Timeline/Timeline'

function App() {

  return (
    <>
      <div>
        <Header></Header>
        <HeroSection></HeroSection>
        <Timeline></Timeline>
        <About></About>
        <Contact></Contact>
      </div>
    </>
  )
}

export default App
