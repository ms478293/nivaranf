import { CarouselCard } from "@/components/usa/hero/CarasoulCard";
import { InfoGraphicContainer } from "@/components/usa/hero/InfoGraphicContainer";

export default function UsaPage() {
  return (
    <div className="flex flex-col gap-6">
      <CarouselCard></CarouselCard>
      <InfoGraphicContainer></InfoGraphicContainer>
    </div>
  );
}
