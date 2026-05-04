import { useBossTracker } from "../hooks/useBossTracker";
import { BossGroup } from "./BossGroup";
import bossesData from "../data/bosses.json";
import "./BossTracker.css";

export function BossTracker() {
  const { groups, toggleBoss, totalBosses, defeatedCount } = useBossTracker(bossesData);
  const pct = totalBosses > 0 ? Math.round((defeatedCount / totalBosses) * 100) : 0;

  return (
    <div className="tracker">
      <header className="tracker__header">
        <div className="tracker__top">
          <div className="tracker__branding">
            <h1 className="tracker__title">Elden Ring</h1>
            <span className="tracker__sub">Boss Tracker</span>
          </div>

          <div className="tracker__stats">
            <Stat value={defeatedCount} label="переможено" />
            <div className="tracker__divider" />
            <Stat value={totalBosses - defeatedCount} label="залишилось" />
            <div className="tracker__divider" />
            <Stat value={`${pct}%`} label="прогрес" />
          </div>
        </div>

        <div className="tracker__bar">
          <div className="tracker__bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </header>

      <main className="tracker__main">
        {groups.map((group, i) => (
          <BossGroup key={i} group={group} onToggle={toggleBoss} />
        ))}
      </main>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="tracker__stat">
      <span className="tracker__stat-value">{value}</span>
      <span className="tracker__stat-label">{label}</span>
    </div>
  );
}
