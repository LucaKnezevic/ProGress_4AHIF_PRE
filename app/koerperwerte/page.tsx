import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";

export default function KoerperwertePage() {
  return (
    <Container>
      <SectionTitle
        title="Körperwerte"
        subtitle="Hier kommen Eingabe & Anzeige von Gewicht, KFA, Umfängen rein."
      />
      <Card>
        <p className="text-sm text-gray-600">
          Nächster Schritt: CRUD wie bei Trainingsdaten (localStorage → später REST API).
        </p>
      </Card>
    </Container>
  );
}
