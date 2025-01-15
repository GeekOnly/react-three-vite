import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
import Underlay from './Underlayer';
import AboutMe from './AboutMe';
import Projects from './Projects';
import BlogList from './components/BlogList';
import BookmarkList from './components/Bookmark';
import Footer from './components/Footer';
import Navigation from './NavigationMenu';
import { Element } from 'react-scroll'; // นำเข้า Element
import VehicleScene from "./GAME/TopDownVehicle";
import Header from './Header';

createRoot(document.getElementById('root')).render(
  <div>
    
    {/* Header added here */}
    <Navigation />

    
    {/* Home section */}
    <Element name="home" className="element" >
      <div id="home">
       <App />
      </div>
    </Element>

    {/* About Me section */}
    <Element name="about" className="element" style={{ paddingTop: '50px' }}>
      <div id="about">
      <Header name={"About Me"}/>
        <AboutMe />
      </div>
    </Element>

    {/* Projects section */}
    <Element name="projects" className="element" style={{ paddingTop: '50px' }}>
      <div id="projects">
        <Header name={"Projects"}/>
        <Projects />
      </div>
    </Element>

    {/* Blog section */}
    <Element name="blog" className="element" style={{ paddingTop: '50px' }}>
      <div id="blog">
        <Header name={"POSTS"}/>
        <BlogList />
      </div>
    </Element>

    {/* Bookmarks section */}
    <Element name="bookmark" className="element" style={{ paddingTop: '50px' }}>
      <div id="bookmark">
        <Header name={"BOOKMARKS"}/>
        <BookmarkList />
      </div>
    </Element>
    <VehicleScene />
    

    {/* Footer */}
    <Footer />
  </div>
);
