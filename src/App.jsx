import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Element } from 'react-scroll';
import Navigation from './NavigationMenu';
import Header from './Header';
import AboutMe from './AboutMe';
import Projects from './Projects';
import BlogList from './components/BlogList';
import BookmarkList from './components/Bookmark';
import Footer from './components/Footer';
import VehicleScene from './GAME/TopDownVehicle';
import CreditPage from './CreditPage';
import SceneContainer from './ModelViewer';

// Routes
import BookmarkPages from './pages/Bookmark';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <Navigation className="navigation" />

        {/* Main Routes */}
        <Routes>

          {/* Static Content */}
          <Route
            path="/"
            element={
              <>
                {/* Home Section */}
                <Element name="home" className="element">
                  <div id="home">
                    <SceneContainer />
                  </div>
                </Element>

                {/* About Me Section */}
                <Element name="about" className="element" style={{ paddingTop: '50px' }}>
                  <div id="about">
                    <Header
                      name="About Me"
                      url="https://sanphetsomjit.wixsite.com/xsgamestudio/about-9"
                    />
                    <AboutMe />
                  </div>
                </Element>

                {/* Projects Section */}
                <Element name="projects" className="element" style={{ paddingTop: '50px' }}>
                  <div id="projects">
                    <Header
                      name="Projects"
                      url="https://past-ferryboat-19b.notion.site/Projects-Database-and-Planning-17b77707c2078075a7faf1d52935d2b6?pvs=4"
                    />
                    <Projects />
                  </div>
                </Element>

                {/* Blog Section */}
                <Element name="blog" className="element" style={{ paddingTop: '50px' }}>
                  <div id="blog">
                    <Header
                      name="POSTS"
                      url="https://past-ferryboat-19b.notion.site/POST-Database-17e77707c20780efa590d8e88dac96a0?pvs=4"
                    />
                    <BlogList />
                  </div>
                </Element>

                {/* Bookmarks Section */}
                <Element name="bookmark" className="element" style={{ paddingTop: '50px' }}>
                  <div id="bookmark">
                    <Header
                      name="BOOKMARKS"
                      url="https://past-ferryboat-19b.notion.site/Bookmarks-17777707c2078017a01ef9d64a1d1141?pvs=74"
                    />
                    <BookmarkList />
                  </div>
                </Element>

                {/* Credit Section */}
                <Element name="credit" className="element" style={{ paddingTop: '50px' }}>
                  <div id="credit">
                    <Header name="Credit" />
                    <CreditPage />
                  </div>
                </Element>

                {/* Footer */}
                <div className="relative">
                  <Footer />
                  <VehicleScene />
                </div>
              </>
            }
          />
          {/* Bookmark Pages Route */}
          <Route path="/bookmark" element={<BookmarkPages />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
