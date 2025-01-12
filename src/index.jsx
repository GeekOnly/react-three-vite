import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import Underlay from './Underlayer';
import AboutMe from './AboutMe';
import Projects from './Projects';

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Underlay />
    <AboutMe />
    <Projects />
  </>
)
