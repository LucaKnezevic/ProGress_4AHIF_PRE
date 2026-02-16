import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";

export default function KalorienPage() {
  return (
    <Container>
      <SectionTitle
        title="Kalorien"
        subtitle="Tageskalorien erfassen und anzeigen."
      />
      <Card>
        <p className="text-sm text-gray-600">
          Nächster Schritt: Formular + Liste + (optional) einfache Auswertung pro Tag/Woche.
        </p>
      </Card>
    </Container>
  );
}
