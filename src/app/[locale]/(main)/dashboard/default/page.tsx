import { ProductTour } from "../_components/tour/product-tour";
import { MetricCards } from "./_components/metric-cards";
import { PerformanceOverview } from "./_components/performance-overview";
import { SubscriberOverview } from "./_components/subscriber-overview";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <ProductTour />
      <MetricCards />
      <PerformanceOverview />
      <SubscriberOverview />
    </div>
  );
}
