import { useState } from "react";
import Card from "../components/Card";
import "./content.css";

function Content({ schemes, isLoading, error, language }) {
    const [selectedScheme, setSelectedScheme] = useState(null);

    const closeModal = () => {
        setSelectedScheme(null);
    };

    const labels = {
        english: {
            heading: "Your Recommended Schemes",
            loading: "Loading schemes...",
            empty: 'Fill the form and click "Find My Schemes" to see results.',
            eligibilityScore: "Eligibility Score",
            viewDetails: "View Details",
            schemeDetails: "Scheme Details",
            sector: "Sector",
            description: "Description",
            benefits: "Benefits",
            eligibility: "Eligibility",
            application: "Application",
            openSite: "Open official website",
            documents: "Documents Required",
            notAvailable: "Not available",
            general: "General",
            unnamed: "Unnamed Scheme",
            closeDetails: "Close details",
        },
        hinglish: {
            heading: "Aapke Recommended Schemes",
            loading: "Schemes load ho rahe hain...",
            empty: 'Form bhariye aur "Find My Schemes" par click karke results dekhiye.',
            eligibilityScore: "Eligibility Score",
            viewDetails: "Details Dekhein",
            schemeDetails: "Scheme Details",
            sector: "Sector",
            description: "Description",
            benefits: "Benefits",
            eligibility: "Eligibility",
            application: "Application",
            openSite: "Official website kholein",
            documents: "Required Documents",
            notAvailable: "Available nahi hai",
            general: "General",
            unnamed: "Unnamed Scheme",
            closeDetails: "Details band karein",
        },
        hindi: {
            heading: "Aapke liye sujhaayi gayi yojanayein",
            loading: "Yojanayein load ho rahi hain...",
            empty: '"Find My Schemes" par click karke parinam dekhein.',
            eligibilityScore: "Patrata score",
            viewDetails: "Vivaran dekhein",
            schemeDetails: "Yojana vivaran",
            sector: "Kshetra",
            description: "Vivaran",
            benefits: "Labh",
            eligibility: "Patrata",
            application: "Aavedan prakriya",
            openSite: "Adhikarik website kholein",
            documents: "Aavashyak dastavez",
            notAvailable: "Upalabdh nahi hai",
            general: "Samanya",
            unnamed: "Yojana naam upalabdh nahi",
            closeDetails: "Vivaran band karein",
        },
    };

    const activeLanguage = labels[language] ? language : "english";
    const text = labels[activeLanguage];

    const getLocalizedValue = (field) => {
        if (!field) return text.notAvailable;
        if (typeof field === "string") return field;
        return field[activeLanguage] || field.english || text.notAvailable;
    };

    const getLocalizedList = (field) => {
        if (!field) return [];
        if (Array.isArray(field)) return field;
        const value = field[activeLanguage] || field.english || [];
        return Array.isArray(value) ? value : [value];
    };

    return (
        <section className="content-section">
            <div className="content-inner">
                <h2>{text.heading}</h2>
                {isLoading && <p>{text.loading}</p>}
                {!isLoading && error && <p>{error}</p>}
                {!isLoading && !error && schemes.length === 0 && (
                    <p>{text.empty}</p>
                )}
                <div className="card-container">
                    {!isLoading && !error && schemes.map((scheme, index) => (
                        <Card
                            key={scheme.id || index}
                            rank={index + 1}
                            title={getLocalizedValue(scheme.name) || text.unnamed}
                            category={scheme.sector || text.general}
                            score={Number(scheme.eligibilityScore) || 0}
                            benefits={getLocalizedValue(scheme.benefits)}
                            onViewDetails={() => setSelectedScheme(scheme)}
                            eligibilityLabel={text.eligibilityScore}
                            viewDetailsLabel={text.viewDetails}
                        />
                    ))}
                </div>
            </div>

            {selectedScheme && (
                <div className="scheme-modal-overlay" onClick={closeModal}>
                    <div
                        className="scheme-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="scheme-modal-close"
                            onClick={closeModal}
                            aria-label={text.closeDetails}
                        >
                            x
                        </button>

                        <h3>{getLocalizedValue(selectedScheme.name) || text.schemeDetails}</h3>
                        <p>
                            <strong>{text.sector}:</strong> {selectedScheme.sector || text.general}
                        </p>
                        <p>
                            <strong>{text.eligibilityScore}:</strong>{" "}
                            {Number(selectedScheme.eligibilityScore) || 0}%
                        </p>
                        <p>
                            <strong>{text.description}:</strong>{" "}
                            {getLocalizedValue(selectedScheme.description)}
                        </p>
                        <p>
                            <strong>{text.benefits}:</strong>{" "}
                            {getLocalizedValue(selectedScheme.benefits)}
                        </p>
                        <p>
                            <strong>{text.eligibility}:</strong>{" "}
                            {getLocalizedValue(selectedScheme.eligibility)}
                        </p>

                        <p>
                            <strong>{text.application}:</strong>{" "}
                            {getLocalizedValue(selectedScheme.applicationProcess)}
                        </p>

                        {selectedScheme.applicationProcess?.Link && (
                            <p>
                                <a
                                    href={selectedScheme.applicationProcess.Link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {text.openSite}
                                </a>
                            </p>
                        )}

                        <div>
                            <strong>{text.documents}:</strong>
                            <ul>
                                {getLocalizedList(selectedScheme.documentsRequired).map((doc) => (
                                    <li key={doc}>{doc}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Content;
