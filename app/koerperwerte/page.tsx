import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";

export default function KoerperwertePage() {
  return (
    <Container>
      <SectionTitle
        title="Körperwerte"
        subtitle="Gewicht, KFA & Umfänge tracken"
      />
      <Card>
        <div className="py-6 text-center">
          <p className="text-3xl mb-2">📊</p>
          <p className="text-sm text-white/50">
            Noch keine Körperwerte vorhanden.
          </p>
          <p className="text-xs text-white/30 mt-1">
            CRUD kommt als nächstes (localStorage → REST API).
          </p>
        </div>
      </Card>
    </Container>
  );
}
