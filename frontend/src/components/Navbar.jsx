import "./navbar.css";

function Navbar({ language, onLanguageChange, theme, onToggleTheme }) {
    const isLightMode = theme === "light";
    const languages = [
        { label: "English", value: "english" },
        { label: "Hindi", value: "hindi" },
        { label: "Hinglish", value: "hinglish" },
    ];
    const labels = {
        english: {
            selectLanguage: "Select language",
            switchTo: "Switch to",
            light: "Light",
            dark: "Dark",
        },
        hinglish: {
            selectLanguage: "Language select karein",
            switchTo: "Switch karein",
            light: "Light",
            dark: "Dark",
        },
        hindi: {
            selectLanguage: "Bhasha chunen",
            switchTo: "Badlein",
            light: "Light",
            dark: "Dark",
        },
    };

    const text = labels[language] || labels.english;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-logo">
                    <span className="logo-mark" aria-hidden="true">GS</span>
                    <span className="logo-text">GovtSathi</span>
                </a>

                <div className="navbar-controls">
                    <div className="language-switch" role="group" aria-label={text.selectLanguage}>
                        {languages.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                className={`lang-btn ${language === item.value ? "active" : ""}`}
                                onClick={() => onLanguageChange(item.value)}
                                aria-pressed={language === item.value}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        className={`mode-switch ${isLightMode ? "is-light" : "is-dark"}`}
                        onClick={onToggleTheme}
                        aria-label={`${text.switchTo} ${isLightMode ? text.dark.toLowerCase() : text.light.toLowerCase()} mode`}
                        aria-pressed={!isLightMode}
                    >
                        <span className="mode-track">
                            <span className="mode-thumb" />
                        </span>
                        <span className="mode-label">{isLightMode ? text.light : text.dark}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
