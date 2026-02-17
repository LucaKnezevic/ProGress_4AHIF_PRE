import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";

export default function KalorienPage() {
  return (
    <Container>
      <SectionTitle
        title="Kalorien"
        subtitle="Tageskalorien erfassen & anzeigen"
      />
      <Card>
        <div className="py-6 text-center">
          <p className="text-3xl mb-2">🔥</p>
          <p className="text-sm text-white/50">
            Noch keine Kalorieneinträge vorhanden.
          </p>
          <p className="text-xs text-white/30 mt-1">
            Formular + Liste + Auswertung pro Tag/Woche.
          </p>
        </div>
      </Card>
    </Container>
  );
}
