import "./card.css";

function Card({
    rank,
    title,
    category,
    score,
    benefits,
    onViewDetails,
    eligibilityLabel,
    viewDetailsLabel,
}) {
    const benefitItems = Array.isArray(benefits) ? benefits : [benefits];

    return (
        <article className="scheme-card-min">
            <div className="scheme-head">
                <span className="rank-badge">{rank}</span>
                <h3>{title}</h3>
            </div>

            <p className="category-pill">{category}</p>

            <div className="score-wrap">
                <div className="score-row">
                    <span>{eligibilityLabel}</span>
                    <strong>{score}%</strong>
                </div>
                <div className="score-bar">
                    <span style={{ width: `${score}%` }} />
                </div>
            </div>

            <ul className="benefit-list">
                {benefitItems.map((item, index) => (
                    <li key={`${item}-${index}`}>{item}</li>
                ))}
            </ul>

            <button
                type="button"
                className="details-btn"
                onClick={onViewDetails}
            >
                {viewDetailsLabel}
            </button>
        </article>
    );
}

export default Card;
