import "./BossCard.css";

export function BossCard({ boss, onToggle }) {
  return (
    <div
      className={`boss-card${boss.isDefeated ? " defeated" : ""}`}
      onClick={() => onToggle(boss.id)}
    >
      <div className="boss-card__image-wrap">
        <img
          src={boss.imageUrl}
          alt={boss.name}
          className="boss-card__image"
          loading="lazy"
        />
        <div className="boss-card__overlay" />

        {boss.isDefeated && (
          <div className="boss-card__check">
            <div className="boss-card__check-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        )}

        <div className="boss-card__badges">
          {boss.isDlc && <span className="badge badge--dlc">DLC</span>}
          {boss.isOptional && <span className="badge badge--opt">opt</span>}
        </div>
      </div>

      <div className="boss-card__body">
        <p className="boss-card__name">{boss.name}</p>
        {boss.wikiUrl && (
          <a
            href={boss.wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="boss-card__wiki"
            onClick={(e) => e.stopPropagation()}
          >
            wiki ↗
          </a>
        )}
      </div>
    </div>
  );
}