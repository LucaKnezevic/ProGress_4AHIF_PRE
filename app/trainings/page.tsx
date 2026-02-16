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
      <div className="flex items-start justify-between gap-3">
        <SectionTitle
          title="Trainingsdaten"
          subtitle="Erfasse Übungen und verwalte sie (Create/Read/Update/Delete)."
        />
        <button
          onClick={openCreate}
          className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
        >
          + Neu
        </button>
      </div>

      <div className="grid gap-3">
        {sorted.length === 0 ? (
          <Card>
            <p className="text-sm text-gray-600">Noch keine Trainingsdaten vorhanden.</p>
          </Card>
        ) : (
          sorted.map((it) => (
            <Card key={it.id}>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm text-gray-600">{it.date}</div>
                  <div className="text-lg font-semibold">{it.exercise}</div>
                  <div className="mt-1 text-sm">
                    {it.sets} Sätze × {it.reps} Wdh — <span className="font-medium">{it.weightKg} kg</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(it)}
                    className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => onDelete(it.id)}
                    className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-100"
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
          <div className="grid gap-3 md:grid-cols-3">
            <FormField label="Sätze" value={sets} onChange={setSets} type="number" />
            <FormField label="Wdh" value={reps} onChange={setReps} type="number" />
            <FormField label="Gewicht (kg)" value={weightKg} onChange={setWeightKg} type="number" />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-100"
            >
              Abbrechen
            </button>
            <button
              onClick={onSave}
              className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
            >
              Speichern
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
