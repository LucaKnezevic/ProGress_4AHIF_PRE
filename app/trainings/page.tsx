"use client";

import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import FormField from "@/components/FormField";
import type { TrainingEntry } from "@/types/models";
import { useEffect, useMemo, useState, useCallback } from "react";

const API = "/api/trainings";

type Filter = "heute" | "woche" | "monat" | "gesamt";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "heute", label: "Heute" },
  { key: "woche", label: "Woche" },
  { key: "monat", label: "Monat" },
  { key: "gesamt", label: "Gesamt" },
];

function startOfWeek(d: Date): Date {
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const mon = new Date(d);
  mon.setDate(d.getDate() + diff);
  mon.setHours(0, 0, 0, 0);
  return mon;
}

function filterByRange(items: TrainingEntry[], filter: Filter): TrainingEntry[] {
  if (filter === "gesamt") return items;
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  if (filter === "heute") return items.filter((i) => i.date === todayStr);
  if (filter === "woche") {
    const ws = startOfWeek(now).toISOString().slice(0, 10);
    return items.filter((i) => i.date >= ws && i.date <= todayStr);
  }
  const ms = todayStr.slice(0, 7) + "-01";
  return items.filter((i) => i.date >= ms && i.date <= todayStr);
}

export default function TrainingsPage() {
  const [allItems, setAllItems] = useState<TrainingEntry[]>([]);
  const [filter, setFilter] = useState<Filter>("gesamt");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Form state
  const [date, setDate] = useState("");
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("3");
  const [reps, setReps] = useState("10");
  const [weightKg, setWeightKg] = useState("0");

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch(API);
      if (res.ok) setAllItems(await res.json());
    } catch { /* backend not reachable */ }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // filtered items
  const items = useMemo(
    () => filterByRange(allItems, filter),
    [allItems, filter]
  );

  // totals
  const totals = useMemo(() => {
    return items.reduce(
      (acc, it) => ({
        exercises: acc.exercises + 1,
        sets: acc.sets + it.sets,
        reps: acc.reps + it.reps,
        volume: acc.volume + it.sets * it.reps * it.weightKg,
      }),
      { exercises: 0, sets: 0, reps: 0, volume: 0 }
    );
  }, [items]);

  function resetForm() {
    setDate("");
    setExercise("");
    setSets("3");
    setReps("10");
    setWeightKg("0");
    setEditId(null);
  }

  function openCreate() {
    resetForm();
    setOpen(true);
  }

  function openEdit(it: TrainingEntry) {
    setDate(it.date);
    setExercise(it.exercise);
    setSets(String(it.sets));
    setReps(String(it.reps));
    setWeightKg(String(it.weightKg));
    setEditId(it.id ?? null);
    setOpen(true);
  }

  async function onSave() {
    if (!date || !exercise) return;

    const body = { date, exercise, sets: Number(sets), reps: Number(reps), weightKg: Number(weightKg) };

    try {
      if (editId != null) {
        await fetch(`${API}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      await fetchItems();
    } catch { /* backend not reachable */ }

    setOpen(false);
    resetForm();
  }

  async function onDelete(id: number | undefined) {
    if (id == null) return;
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      await fetchItems();
    } catch { /* backend not reachable */ }
  }

  return (
    <Container>
      <div className="grid gap-5">
        <SectionTitle title="Trainingsdaten" subtitle="Übungen erfassen & verwalten" />

        {/* Filter Navbar */}
        <div className="flex gap-2 rounded-xl bg-white/[0.04] p-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-1 rounded-lg px-2 py-2 text-xs font-medium transition ${
                filter === f.key
                  ? "bg-indigo-500 text-white shadow"
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Daily summary */}
        <Card>
          <div className="text-center py-2">
            <div className="text-3xl font-bold text-white">{totals.exercises}</div>
            <div className="text-xs text-white/40 mt-0.5">Übungen Gesamt</div>
            <div className="flex justify-center gap-4 mt-3">
              <div className="text-center">
                <div className="text-sm font-semibold text-indigo-300">{totals.sets}</div>
                <div className="text-[10px] text-white/40">Sätze</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-emerald-300">{totals.reps}</div>
                <div className="text-[10px] text-white/40">Wdh</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-amber-300">{Math.round(totals.volume)}</div>
                <div className="text-[10px] text-white/40">Volumen (kg)</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Exercises card */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏋️</span>
              <div>
                <div className="text-sm font-semibold text-white">Übungen</div>
                {items.length > 0 && (
                  <div className="text-xs text-white/40">{items.length} Einträge</div>
                )}
              </div>
            </div>
            <button
              onClick={openCreate}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.06] flex items-center justify-center text-white/60 text-2xl transition active:bg-white/10"
            >
              +
            </button>
          </div>

          {items.length > 0 ? (
            <div className="mt-3 border-t border-white/[0.06] pt-2 grid gap-1.5">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center justify-between py-1.5 group cursor-pointer"
                  onClick={() => openEdit(it)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">{it.exercise}</div>
                    <div className="text-[10px] text-white/30">
                      {it.sets} Sätze · {it.reps} Wdh · {it.weightKg} kg
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <span className="text-xs text-indigo-300 font-medium">{Math.round(it.sets * it.reps * it.weightKg)} kg</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(it.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-red-400/60 text-xs transition"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 border-t border-white/[0.06] pt-4 pb-2 text-center">
              <p className="text-sm text-white/50">Noch keine Übungen für diesen Tag.</p>
              <p className="text-xs text-white/30 mt-1">Tippe auf + um zu starten</p>
            </div>
          )}
        </Card>
      </div>

      <Modal
        open={open}
        title={editId ? "Training bearbeiten" : "Neues Training"}
        onClose={() => setOpen(false)}
      >
        <div className="grid gap-3">
          <FormField label="Datum" value={date} onChange={setDate} type="date" />
          <FormField label="Übung" value={exercise} onChange={setExercise} placeholder="z.B. Bankdrücken" />
          <div className="grid grid-cols-3 gap-3">
            <FormField label="Sätze" value={sets} onChange={setSets} type="number" />
            <FormField label="Wdh" value={reps} onChange={setReps} type="number" />
            <FormField label="kg" value={weightKg} onChange={setWeightKg} type="number" />
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
              Speichern
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
