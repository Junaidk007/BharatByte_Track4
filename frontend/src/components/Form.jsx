import { useMemo, useState } from "react";
import "./form.css";

function Form({ onSearch, language }) {
    const occupationOptions = ["Farmer", "Student", "Self Employed", "Worker", "Salaried"];
    const categoryOptions = ["General", "OBC", "SC", "ST", "EWS"];
    const stateOptions = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
    ];

    const occupationCodeMap = {
        Farmer: 0,
        Student: 1,
        "Self Employed": 2,
        Worker: 3,
        Salaried: 4,
    };

    const categoryCodeMap = {
        General: 0,
        OBC: 1,
        SC: 2,
        ST: 3,
        EWS: 4,
    };

    const labels = {
        english: {
            age: "Age",
            agePlaceholder: "Enter age",
            occupation: "Occupation",
            ownLand: "Own Agricultural Land",
            annualIncome: "Annual Income (Rs.)",
            upTo: "Up to",
            category: "Category",
            state: "State",
            haveBusiness: "Have Business",
            haveHomeLoan: "Have Home Loan",
            yes: "Yes",
            no: "No",
            submit: "Find My Schemes",
        },
        hinglish: {
            age: "Age",
            agePlaceholder: "Age enter karein",
            occupation: "Occupation",
            ownLand: "Krishi zameen hai",
            annualIncome: "Annual Income (Rs.)",
            upTo: "Up to",
            category: "Category",
            state: "State",
            haveBusiness: "Business hai",
            haveHomeLoan: "Home loan hai",
            yes: "Haan",
            no: "Nahi",
            submit: "Meri Schemes Dhoondho",
        },
        hindi: {
            age: "आयु",
            agePlaceholder: "आयु दर्ज करें",
            occupation: "पेशा",
            ownLand: "कृषि भूमि है",
            annualIncome: "वार्षिक आय (Rs.)",
            upTo: "तक",
            category: "श्रेणी",
            state: "राज्य",
            haveBusiness: "व्यवसाय है",
            haveHomeLoan: "गृह ऋण है",
            yes: "हाँ",
            no: "नहीं",
            submit: "मेरी योजनाएँ खोजें",
        },
    };

    const occupationLabels = {
        english: {
            Farmer: "Farmer",
            Student: "Student",
            "Self Employed": "Self Employed",
            Worker: "Worker",
            Salaried: "Salaried",
        },
        hinglish: {
            Farmer: "Farmer",
            Student: "Student",
            "Self Employed": "Self Employed",
            Worker: "Worker",
            Salaried: "Salaried",
        },
        hindi: {
            Farmer: "किसान",
            Student: "विद्यार्थी",
            "Self Employed": "स्वयं रोजगार",
            Worker: "मज़दूर",
            Salaried: "नौकरीपेशा",
        },
    };

    const categoryLabels = {
        english: {
            General: "General",
            OBC: "OBC",
            SC: "SC",
            ST: "ST",
            EWS: "EWS",
        },
        hinglish: {
            General: "General",
            OBC: "OBC",
            SC: "SC",
            ST: "ST",
            EWS: "EWS",
        },
        hindi: {
            General: "General",
            OBC: "OBC",
            SC: "SC",
            ST: "ST",
            EWS: "EWS",
        },
    };

    const text = labels[language] || labels.english;

    const [formData, setFormData] = useState({
        age: 25,
        annualIncome: 450000,
        occupation: "Farmer",
        category: "OBC",
        state: "Uttar Pradesh",
        hasHomeLoan: 0,
        hasAgriculturalLand: 1,
        hasBusiness: 0,
    });

    const formattedIncome = useMemo(
        () =>
            new Intl.NumberFormat(language === "hindi" ? "hi-IN" : "en-IN").format(
                Number(formData.annualIncome)
            ),
        [formData.annualIncome, language]
    );

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            age: Number(formData.age || 0),
            annualIncome: Number(formData.annualIncome),
            occupation: formData.occupation,
            occupation_code: occupationCodeMap[formData.occupation] ?? -1,
            category: formData.category,
            category_code: categoryCodeMap[formData.category] ?? -1,
            state: formData.state,
            hasHomeLoan: Number(formData.hasHomeLoan),
            hasAgriculturalLand: Number(formData.hasAgriculturalLand),
            hasBusiness: Number(formData.hasBusiness),
        };

        if (onSearch) {
            onSearch(payload);
            return;
        }

        console.log("Form submitted:", payload);
    };

    return (
        <form className="scheme-form" action="" onSubmit={handleSubmit}>
            <div className="scheme-grid">
                <div className="form-item">
                    <label htmlFor="age">{text.age}</label>
                    <div className="input-shell">
                        <span className="input-icon" aria-hidden="true">ID</span>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            min="0"
                            max="120"
                            className="field-input"
                            placeholder={text.agePlaceholder}
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-item">
                    <label htmlFor="occupation">{text.occupation}</label>
                    <div className="input-shell select-shell">
                        <span className="input-icon" aria-hidden="true">OC</span>
                        <select
                            id="occupation"
                            name="occupation"
                            className="field-select"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            required
                        >
                            {occupationOptions.map((item) => (
                                <option key={item} value={item}>
                                    {(occupationLabels[language] || occupationLabels.english)[item] || item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-item side-col">
                    <label>{text.ownLand}</label>
                    <div className="toggle-row">
                        <button
                            type="button"
                            className={`toggle-btn ${formData.hasAgriculturalLand === 1 ? "active" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, hasAgriculturalLand: 1 }))}
                        >
                            {text.yes}
                        </button>
                        <button
                            type="button"
                            className={`toggle-btn ${formData.hasAgriculturalLand === 0 ? "active" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, hasAgriculturalLand: 0 }))}
                        >
                            {text.no}
                        </button>
                    </div>
                </div>

                <div className="form-item">
                    <label htmlFor="income">{text.annualIncome}</label>
                    <div className="income-shell">
                        <input
                            id="income"
                            name="annualIncome"
                            type="range"
                            min="0"
                            max="1000000"
                            step="10000"
                            value={formData.annualIncome}
                            onChange={handleInputChange}
                        />
                        <span className="income-pill">{text.upTo} {formattedIncome}</span>
                    </div>
                </div>

                <div className="form-item">
                    <label htmlFor="category">{text.category}</label>
                    <div className="input-shell select-shell">
                        <span className="input-icon" aria-hidden="true">CT</span>
                        <select
                            id="category"
                            name="category"
                            className="field-select"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            {categoryOptions.map((item) => (
                                <option key={item} value={item}>
                                    {(categoryLabels[language] || categoryLabels.english)[item] || item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-item">
                    <label htmlFor="state">{text.state}</label>
                    <div className="input-shell select-shell">
                        <span className="input-icon" aria-hidden="true">ST</span>
                        <select
                            id="state"
                            name="state"
                            className="field-select"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                        >
                            {stateOptions.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-item side-col">
                    <label>{text.haveBusiness}</label>
                    <div className="toggle-row neutral">
                        <button
                            type="button"
                            className={`toggle-btn ${formData.hasBusiness === 1 ? "active" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, hasBusiness: 1 }))}
                        >
                            {text.yes}
                        </button>
                        <button
                            type="button"
                            className={`toggle-btn ${formData.hasBusiness === 0 ? "active" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, hasBusiness: 0 }))}
                        >
                            {text.no}
                        </button>
                    </div>
                </div>

                <div className="form-item side-col">
                    <label>{text.haveHomeLoan}</label>
                    <div className="toggle-row neutral">
                        <button
                            type="button"
                            className={`toggle-btn ${formData.hasHomeLoan === 1 ? "active" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, hasHomeLoan: 1 }))}
                        >
                            {text.yes}
                        </button>
                        <button
                            type="button"
                            className={`toggle-btn ${formData.hasHomeLoan === 0 ? "active" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, hasHomeLoan: 0 }))}
                        >
                            {text.no}
                        </button>
                    </div>
                </div>
            </div>

            <button type="submit" className="find-btn">
                <span aria-hidden="true"></span>
                <span>{text.submit}</span>
            </button>
        </form>
    );
}

export default Form;
