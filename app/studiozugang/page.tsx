import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";

export default function StudiozugangPage() {
  return (
    <Container>
      <SectionTitle
        title="Digitaler Studiozugang"
        subtitle="Mitgliedskarte / QR-Code Platzhalter."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="text-sm text-gray-600">Mitglied</div>
          <div className="mt-1 text-lg font-semibold">Luca Knezevic</div>
          <div className="mt-2 text-sm">Mitglieds-ID: <span className="font-medium">PG-0001</span></div>
          <div className="mt-2 text-sm">Status: <span className="font-medium">Aktiv</span></div>
        </Card>

        <Card>
          <div className="text-sm text-gray-600">QR-Code</div>
          <div className="mt-3 grid place-items-center">
            <div className="grid h-48 w-48 place-items-center rounded-2xl border bg-gray-50 text-sm text-gray-600">
              QR Platzhalter
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Später: echten QR-Code generieren (z.B. aus Mitglieds-ID).
          </p>
        </Card>
      </div>
    </Container>
  );
}
