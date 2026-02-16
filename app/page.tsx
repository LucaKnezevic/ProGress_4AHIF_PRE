import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";
import Link from "next/link";

const tiles = [
  {
    href: "/trainings",
    title: "Trainingsdaten",
    desc: "Übungen, Sätze, Wiederholungen, Gewicht",
    tag: "CRUD",
  },
  {
    href: "/koerperwerte",
    title: "Körperwerte",
    desc: "Gewicht, KFA, Umfänge",
    tag: "Tracking",
  },
  {
    href: "/kalorien",
    title: "Kalorien",
    desc: "Tageskalorien + Notizen",
    tag: "Ernährung",
  },
  {
    href: "/studiozugang",
    title: "Studiozugang",
    desc: "Mitgliedskarte / QR-Code",
    tag: "Access",
  },
];

export default function Page() {
  return (
    <Container>
      <SectionTitle
        title="Dashboard"
        subtitle="Wähle einen Bereich: Training, Körperwerte, Kalorien oder Studiozugang."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {tiles.map((t) => (
          <Link key={t.href} href={t.href} className="block">
            <Card className="h-full">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-white">{t.title}</div>
                  <p className="mt-1 text-sm text-white/70">{t.desc}</p>
                </div>
                <span className="rounded-xl border border-white/15 bg-white/5 px-2 py-1 text-xs text-white/70">
                  {t.tag}
                </span>
              </div>

              <div className="mt-4 text-sm font-medium text-white/80">
                Öffnen <span className="ml-1">→</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
