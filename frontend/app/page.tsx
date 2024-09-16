import { GoogleMapArea } from "@/components/GoogleMapArea";
import { fetchLatestShizuyaPosition } from "./actions/fetchLatestShizuyaPosition";
import { LatestShizuyaPosition } from "@/types/latestShizuyasPosition";
import { TopNavigation } from "@/components/TopNavigation";
import { DeliveryStartButton } from "@/components/DeliveryStartButton";
import { TimeAndRouterModal } from "@/components/TimeAndRouteModal";
import { OrderModal } from "@/components/OrderModal";

export default async function Home() {
  const latestShizuyaPosition: LatestShizuyaPosition = await fetchLatestShizuyaPosition();

  return (
    <div className="h-screen w-full fixed inset-0">
      <TopNavigation />
      <GoogleMapArea latestShizuyaPosition={latestShizuyaPosition} />
      <DeliveryStartButton />
      <TimeAndRouterModal latestShizuyaPosition={latestShizuyaPosition} />
      <OrderModal />
    </div>
  );
}
