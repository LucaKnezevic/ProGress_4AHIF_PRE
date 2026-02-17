"use client";

import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import FormField from "@/components/FormField";
import { load, save, uid } from "@/lib/storage";
import type { TrainingEntry } from "@/types/models";
import { useEffect, useMemo, useState } from "react";

const KEY = "progress_trainings";

export default function TrainingsPage() {
  const [items, setItems] = useState<TrainingEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form state
  const [date, setDate] = useState("");
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("3");
  const [reps, setReps] = useState("10");
  const [weightKg, setWeightKg] = useState("0");

  useEffect(() => {
    setItems(load<TrainingEntry[]>(KEY, []));
  }, []);

  useEffect(() => {
    save(KEY, items);
  }, [items]);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => b.date.localeCompare(a.date));
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
    setEditId(it.id);
    setOpen(true);
  }

  function onSave() {
    if (!date || !exercise) return;

    const entry: TrainingEntry = {
      id: editId ?? uid(),
      date,
      exercise,
      sets: Number(sets),
      reps: Number(reps),
      weightKg: Number(weightKg),
    };

    setItems((prev) => {
      const exists = prev.some((p) => p.id === entry.id);
      return exists ? prev.map((p) => (p.id === entry.id ? entry : p)) : [entry, ...prev];
    });

    setOpen(false);
    resetForm();
  }

  function onDelete(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <Container>
      <div className="flex items-center justify-between gap-3">
        <SectionTitle
          title="Trainingsdaten"
          subtitle="Übungen erfassen & verwalten"
        />
        <button
          onClick={openCreate}
          className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition active:scale-95"
        >
          + Neu
        </button>
      </div>

      <div className="grid gap-3">
        {sorted.length === 0 ? (
          <Card>
            <div className="py-6 text-center">
              <p className="text-3xl mb-2">🏋️</p>
              <p className="text-sm text-white/50">Noch keine Trainingsdaten vorhanden.</p>
              <p className="text-xs text-white/30 mt-1">Tippe auf &quot;+ Neu&quot; um zu starten</p>
            </div>
          </Card>
        ) : (
          sorted.map((it) => (
            <Card key={it.id}>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="text-xs text-white/40">{it.date}</div>
                  <div className="text-base font-semibold text-white mt-0.5">{it.exercise}</div>
                  <div className="mt-1.5 flex gap-2">
                    <span className="rounded-lg bg-white/[0.06] px-2 py-0.5 text-xs text-white/70">{it.sets} Sätze</span>
                    <span className="rounded-lg bg-white/[0.06] px-2 py-0.5 text-xs text-white/70">{it.reps} Wdh</span>
                    <span className="rounded-lg bg-indigo-500/20 px-2 py-0.5 text-xs text-indigo-300 font-medium">{it.weightKg} kg</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(it)}
                    className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/70 transition active:bg-white/10"
                  >
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => onDelete(it.id)}
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400 transition active:bg-red-500/20"
                  >
                    Löschen
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
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
