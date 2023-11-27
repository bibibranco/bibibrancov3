import './App.css'
import Contact from './components/Contact/Contact'
import Header from './components/Header/Header'
import HeroSection from './components/HeroSection/HeroSection'
import SectionTitle from './components/SectionTitle/SectionTitle'

function App() {

  return (
    <>
      <div>
        <Header></Header>
        <HeroSection></HeroSection>
        <SectionTitle type="primary" text="count me in for">
        </SectionTitle>
        <Contact></Contact>
      </div>
    </>
  )
}

export default App
