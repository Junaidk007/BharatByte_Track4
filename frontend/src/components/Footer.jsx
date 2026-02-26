function Footer({ language }) {
    const labels = {
        english: "2026 Govt_Sathi. All rights reserved.",
        hinglish: "2026 Govt_Sathi. Sabhi adhikar surakshit.",
        hindi: "2026 Govt_Sathi. Sarvadhikar surakshit.",
    };

    const text = labels[language] || labels.english;

    return (
        <footer className="bg-dark text-white text-center py-3">
            <p>{text}</p>
        </footer>
    )
}

export default Footer;
