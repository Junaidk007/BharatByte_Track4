import { useMemo, useState } from "react";
import "./form.css";

function Form({ onSearch }) {
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
        () => new Intl.NumberFormat("en-IN").format(Number(formData.annualIncome)),
        [formData.annualIncome]
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

        // Default fallback until parent integration is wired.
        console.log("Form submitted:", payload);
    };

    return ( 
        <form className="scheme-form" action="" onSubmit={handleSubmit}>
            <div className="scheme-grid">
                <div className="form-item">
                    <label htmlFor="age">Age</label>
                    <div className="input-shell">
                        <span className="input-icon" aria-hidden="true">🗂</span>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            min="0"
                            max="120"
                            className="field-input"
                            placeholder="Enter Age"
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-item">
                    <label htmlFor="occupation">Occupation</label>
                    <div className="input-shell select-shell">
                        <span className="input-icon" aria-hidden="true">🧑</span>
                        <select
                            id="occupation"
                            name="occupation"
                            className="field-select"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            required
                        >
                            {occupationOptions.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-item side-col">
                    <label>Own Agricultural Land</label>
                    <div className="toggle-row">
                        <button
                            type="button"
                            className={`toggle-btn ${formData.hasAgriculturalLand === 1 ? "active" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, hasAgriculturalLand: 1 }))}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className={`toggle-btn ${formData.hasAgriculturalLand === 0 ? "active" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, hasAgriculturalLand: 0 }))}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="form-item">
                    <label htmlFor="income">Annual Income (₹)</label>
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
                        <span className="income-pill">Up to {formattedIncome}</span>
                    </div>
                </div>

                <div className="form-item">
                    <label htmlFor="category">Category</label>
                    <div className="input-shell select-shell">
                        <span className="input-icon" aria-hidden="true">👥</span>
                        <select
                            id="category"
                            name="category"
                            className="field-select"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            {categoryOptions.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-item">
                    <label htmlFor="state">State</label>
                    <div className="input-shell select-shell">
                        <span className="input-icon" aria-hidden="true">📍</span>
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
                    <label>Have Business</label>
                    <div className="toggle-row neutral">
                        <button
                            type="button"
                            className={`toggle-btn ${formData.hasBusiness === 1 ? "active" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, hasBusiness: 1 }))}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className={`toggle-btn ${formData.hasBusiness === 0 ? "active" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, hasBusiness: 0 }))}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="form-item side-col">
                    <label>Have Home Loan</label>
                    <div className="toggle-row neutral">
                        <button
                            type="button"
                            className={`toggle-btn ${formData.hasHomeLoan === 1 ? "active" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, hasHomeLoan: 1 }))}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className={`toggle-btn ${formData.hasHomeLoan === 0 ? "active" : ""}`}
                            onClick={() => setFormData((prev) => ({ ...prev, hasHomeLoan: 0 }))}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>

            <button type="submit" className="find-btn">
                <span aria-hidden="true"></span>
                <span>Find My Schemes</span>
            </button>
        </form>
    );
}
export default Form;

