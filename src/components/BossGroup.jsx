import { useState } from "react";
import { BossCard } from "./BossCard";
import "./BossGroup.css";

export function BossGroup({ group, onToggle }) {
  const [collapsed, setCollapsed] = useState(false);
  const defeated = group.bosses.filter((b) => b.isDefeated).length;
  const total = group.bosses.length;
  const pct = Math.round((defeated / total) * 100);

  return (
    <section className="boss-group">
      <header
        className="boss-group__header"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="boss-group__meta">
          <h2 className="boss-group__title">{group.location}</h2>
          <span className="boss-group__counter">{defeated}/{total}</span>
        </div>

        <div className="boss-group__right">
          <span className="boss-group__pct">{pct}%</span>
          <svg
            className={`boss-group__chevron${collapsed ? " collapsed" : ""}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </header>

      <div className="boss-group__bar">
        <div className="boss-group__bar-fill" style={{ width: `${pct}%` }} />
      </div>

      {!collapsed && (
        <div className="boss-group__grid">
          {group.bosses.map((boss) => (
            <BossCard key={boss.id} boss={boss} onToggle={onToggle} />
          ))}
        </div>
      )}
    </section>
  );
}