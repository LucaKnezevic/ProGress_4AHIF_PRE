import Container from "@/components/Container";
import Card from "@/components/Card";
import Link from "next/link";

const tiles = [
  {
    href: "/trainings",
    title: "Trainingsdaten",
    desc: "Übungen, Sätze, Wiederholungen",
    emoji: "🏋️",
    gradient: "from-indigo-500/20 to-purple-500/20",
    border: "border-indigo-500/20",
  },
  {
    href: "/koerperwerte",
    title: "Körperwerte",
    desc: "Gewicht, KFA, Umfänge",
    emoji: "📊",
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/20",
  },
  {
    href: "/kalorien",
    title: "Kalorien",
    desc: "Tageskalorien & Notizen",
    emoji: "🔥",
    gradient: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/20",
  },
  {
    href: "/studiozugang",
    title: "Studiozugang",
    desc: "Mitgliedskarte / QR-Code",
    emoji: "🎫",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20",
  },
];

export default function Page() {
  return (
    <Container>
      {/* Greeting */}
      <div className="mb-6 pt-2">
        <p className="text-sm text-white/50">Willkommen zurück</p>
        <h1 className="mt-1 text-2xl font-bold text-white">Hallo, Luca 👋</h1>
      </div>

      {/* Quick Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-indigo-500/15 bg-indigo-500/[0.08] p-3.5">
          <p className="text-xs text-white/50">Diese Woche</p>
          <p className="mt-1 text-xl font-bold text-white">3 <span className="text-sm font-normal text-white/50">Trainings</span></p>
        </div>
        <div className="rounded-2xl border border-cyan-500/15 bg-cyan-500/[0.08] p-3.5">
          <p className="text-xs text-white/50">Streak</p>
          <p className="mt-1 text-xl font-bold text-white">🔥 5 <span className="text-sm font-normal text-white/50">Tage</span></p>
        </div>
      </div>

      {/* Navigation Tiles */}
      <p className="mb-3 text-sm font-medium text-white/40 uppercase tracking-wider">Bereiche</p>
      <div className="grid gap-3">
        {tiles.map((t) => (
          <Link key={t.href} href={t.href} className="block">
            <Card className={`bg-gradient-to-r ${t.gradient} ${t.border}`}>
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-2xl">
                  {t.emoji}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{t.title}</div>
                  <p className="mt-0.5 text-sm text-white/50">{t.desc}</p>
                </div>
                <span className="text-white/30">›</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
