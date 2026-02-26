import Form from "../components/Form";
import "./hero.css";

function Hero({ onSearch, language, isFullHeight }) {
    const labels = {
        english: {
            heading: "AI-Powered Government Scheme Recommendation",
            subheading: "Find the best schemes for yourself",
        },
        hinglish: {
            heading: "AI-Powered Government Scheme Recommendation",
            subheading: "Apne liye best schemes dhoondhiye",
        },
        hindi: {
            heading: "एआई-संचालित सरकारी योजना अनुशंसा",
            subheading: "अपने लिए सबसे बेहतर योजनाएँ खोजें",
        },
    };

    const text = labels[language] || labels.english;

    return ( 
        <section className={`hero-section ${isFullHeight ? "hero-full-height" : ""}`}>
            <div className="hero-content">
                <h1>{text.heading}</h1>
                <p>{text.subheading}</p>
                <span className="hero-accent" aria-hidden="true" />
            </div>
            <Form onSearch={onSearch} language={language} />
        </section>
     );
}

export default Hero;
