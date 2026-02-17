import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";

export default function StudiozugangPage() {
  return (
    <Container>
      <SectionTitle
        title="Studiozugang"
        subtitle="Digitale Mitgliedskarte"
      />

      <div className="grid gap-3">
        <Card>
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/15 text-xl">
              ✅
            </div>
            <div>
              <p className="text-xs text-white/40">Mitglied</p>
              <p className="font-semibold text-white">Luca Knezevic</p>
              <div className="mt-1 flex gap-2">
                <span className="rounded-lg bg-white/[0.06] px-2 py-0.5 text-xs text-white/60">PG-0001</span>
                <span className="rounded-lg bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400 font-medium">Aktiv</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-center py-4">
            <p className="text-xs text-white/40 mb-3">QR-Code</p>
            <div className="mx-auto grid h-48 w-48 place-items-center rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="text-center">
                <p className="text-4xl mb-2">📱</p>
                <p className="text-xs text-white/40">QR Platzhalter</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-white/30">
              Echten QR-Code aus Mitglieds-ID generieren.
            </p>
          </div>
        </Card>
      </div>
    </Container>
  );
}
