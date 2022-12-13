import About from "./Landing/About";
import Community from "./Landing/Community";
import Header from "./Landing/Header";
import Training from "./Landing/Training";
import Footer from '../components/UI/Footer';


function Landing () {
    return (
        <>
       <Header />
       <About />
       <Community />
       <Training />
       <Footer />
       </>
    );
};

export default Landing;