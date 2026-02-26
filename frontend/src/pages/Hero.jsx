import Form from "../components/Form";
import "./hero.css";

function Hero({ onSearch }) {
    return ( 
        <section className="hero-section">
            <div className="hero-content">
                <h1>Find Government Schemes</h1>
                <p>For Rural Development &amp; Welfare</p>
                <span className="hero-accent" aria-hidden="true" />
            </div>
            <Form onSearch={onSearch} />
        </section>
     );
}

export default Hero;
