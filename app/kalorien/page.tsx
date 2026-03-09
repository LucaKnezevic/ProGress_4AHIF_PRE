"use client";

import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import FormField from "@/components/FormField";
import { useEffect, useState, useCallback, useMemo } from "react";

const API = "/api/meals";

type MealEntry = {
  id?: number;
  date: string;
  meal: string;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

type MealType = "fruehstueck" | "mittagessen" | "abendessen" | "snacks";

const MEALS: { key: MealType; label: string; emoji: string }[] = [
  { key: "fruehstueck", label: "Frühstück", emoji: "🥐" },
  { key: "mittagessen", label: "Mittagessen", emoji: "🍝" },
  { key: "abendessen", label: "Abendessen", emoji: "🥗" },
  { key: "snacks", label: "Snacks", emoji: "🍎" },
];

export default function KalorienPage() {
  const [items, setItems] = useState<MealEntry[]>([]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [open, setOpen] = useState(false);
  const [activeMeal, setActiveMeal] = useState<MealType>("fruehstueck");

  // form
  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("0");
  const [carbs, setCarbs] = useState("0");
  const [fat, setFat] = useState("0");

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch(`${API}?date=${date}`);
      if (res.ok) setItems(await res.json());
    } catch { /* backend not reachable */ }
  }, [date]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // group by meal type
  const grouped = useMemo(() => {
    const map: Record<string, MealEntry[]> = {};
    for (const m of MEALS) map[m.key] = [];
    for (const it of items) {
      if (map[it.meal]) map[it.meal].push(it);
    }
    return map;
  }, [items]);

  // daily totals
  const totals = useMemo(() => {
    return items.reduce(
      (acc, it) => ({
        kcal: acc.kcal + it.kcal,
        protein: acc.protein + it.protein,
        carbs: acc.carbs + it.carbs,
        fat: acc.fat + it.fat,
      }),
      { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [items]);

  function mealTotal(key: string) {
    return (grouped[key] || []).reduce((s, it) => s + it.kcal, 0);
  }

  function openAdd(meal: MealType) {
    setActiveMeal(meal);
    setName("");
    setKcal("");
    setProtein("0");
    setCarbs("0");
    setFat("0");
    setOpen(true);
  }

  async function onSave() {
    if (!name || !kcal) return;
    try {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          meal: activeMeal,
          name,
          kcal: Number(kcal),
          protein: Number(protein),
          carbs: Number(carbs),
          fat: Number(fat),
        }),
      });
      await fetchItems();
    } catch { /* backend not reachable */ }
    setOpen(false);
  }

  async function onDelete(id: number | undefined) {
    if (id == null) return;
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      await fetchItems();
    } catch { /* backend not reachable */ }
  }

  // navigate days
  function goBack() {
    const d = new Date(date + "T00:00:00");
    d.setDate(d.getDate() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    setDate(`${y}-${m}-${day}`);
  }

  function goForward() {
    const d = new Date(date + "T00:00:00");
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    setDate(`${y}-${m}-${day}`);
  }

  const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const dayLabel = WEEKDAYS[new Date(date + "T00:00:00").getDay()];

  return (
    <Container>
      <div className="grid gap-5">
      <SectionTitle title="Kalorien" subtitle="Tagesernährung erfassen" />

      {/* Date navigation */}
      <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-3">
        <button type="button" onClick={goBack} className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/70 text-xl font-bold active:bg-white/10 transition">←</button>
        <div className="text-center">
          <div className="text-base font-medium text-white">{dayLabel}, {date}</div>
        </div>
        <button type="button" onClick={goForward} className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/70 text-xl font-bold active:bg-white/10 transition">→</button>
      </div>

      {/* Daily summary */}
      <Card>
        <div className="text-center py-2">
          <div className="text-3xl font-bold text-white">{Math.round(totals.kcal)}</div>
          <div className="text-xs text-white/40 mt-0.5">kcal Gesamt</div>
          <div className="flex justify-center gap-4 mt-3">
            <div className="text-center">
              <div className="text-sm font-semibold text-indigo-300">{Math.round(totals.protein)}g</div>
              <div className="text-[10px] text-white/40">Eiweiß</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-emerald-300">{Math.round(totals.carbs)}g</div>
              <div className="text-[10px] text-white/40">Kohlenhydrate</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-amber-300">{Math.round(totals.fat)}g</div>
              <div className="text-[10px] text-white/40">Fett</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Meal sections */}
      <div className="grid gap-4">
        {MEALS.map((m) => {
          const entries = grouped[m.key] || [];
          const total = mealTotal(m.key);
          return (
            <Card key={m.key}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.emoji}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{m.label}</div>
                    {total > 0 && (
                      <div className="text-xs text-white/40">{Math.round(total)} kcal</div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => openAdd(m.key)}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.06] flex items-center justify-center text-white/60 text-2xl transition active:bg-white/10"
                >
                  +
                </button>
              </div>

              {entries.length > 0 && (
                <div className="mt-3 border-t border-white/[0.06] pt-2 grid gap-1.5">
                  {entries.map((it) => (
                    <div key={it.id} className="flex items-center justify-between py-1.5 group">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white truncate">{it.name}</div>
                        <div className="text-[10px] text-white/30">
                          E {Math.round(it.protein)}g · K {Math.round(it.carbs)}g · F {Math.round(it.fat)}g
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <span className="text-xs text-white/50">{Math.round(it.kcal)} kcal</span>
                        <button
                          onClick={() => onDelete(it.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-400/60 text-xs transition"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Add food modal */}
      <Modal
        open={open}
        title={MEALS.find((m) => m.key === activeMeal)?.label ?? "Essen hinzufügen"}
        onClose={() => setOpen(false)}
      >
        <div className="grid gap-3">
          <FormField label="Lebensmittel" value={name} onChange={setName} placeholder="z.B. Hühnerbrust" />
          <FormField label="Kalorien (kcal)" value={kcal} onChange={setKcal} type="number" placeholder="z.B. 250" />
          <div className="grid grid-cols-3 gap-3">
            <FormField label="Eiweiß (g)" value={protein} onChange={setProtein} type="number" />
            <FormField label="Kohlenh. (g)" value={carbs} onChange={setCarbs} type="number" />
            <FormField label="Fett (g)" value={fat} onChange={setFat} type="number" />
          </div>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/70 transition active:bg-white/10"
            >
              Abbrechen
            </button>
            <button
              onClick={onSave}
              className="flex-1 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition active:scale-95"
            >
              Hinzufügen
            </button>
          </div>
        </div>
      </Modal>
      </div>
    </Container>
  );
}
