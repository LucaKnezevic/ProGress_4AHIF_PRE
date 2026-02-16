export type TrainingEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  exercise: string;
  sets: number;
  reps: number;
  weightKg: number;
};

export type BodyEntry = {
  id: string;
  date: string;
  weightKg: number;
  bodyFatPercent?: number;
  waistCm?: number;
};

export type CalorieEntry = {
  id: string;
  date: string;
  calories: number;
  note?: string;
};
