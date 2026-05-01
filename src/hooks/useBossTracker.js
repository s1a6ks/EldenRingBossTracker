import { useState, useEffect } from "react";

const STORAGE_KEY = "elden-ring-defeated";

export function useBossTracker(initialData) {
  const [groups, setGroups] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const defeatedIds = saved ? JSON.parse(saved) : [];
      if (!defeatedIds.length) return initialData;
      return initialData.map((group) => ({
        ...group,
        bosses: group.bosses.map((boss) => ({
          ...boss,
          isDefeated: defeatedIds.includes(boss.id),
        })),
      }));
    } catch {
      return initialData;
    }
  });

  useEffect(() => {
    const defeatedIds = groups
      .flatMap((g) => g.bosses)
      .filter((b) => b.isDefeated)
      .map((b) => b.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defeatedIds));
  }, [groups]);

  const toggleBoss = (id) => {
    setGroups((prev) =>
      prev.map((group) => ({
        ...group,
        bosses: group.bosses.map((boss) =>
          boss.id === id ? { ...boss, isDefeated: !boss.isDefeated } : boss
        ),
      }))
    );
  };

  const allBosses = groups.flatMap((g) => g.bosses);
  const totalBosses = allBosses.length;
  const defeatedCount = allBosses.filter((b) => b.isDefeated).length;

  return { groups, toggleBoss, totalBosses, defeatedCount };
}