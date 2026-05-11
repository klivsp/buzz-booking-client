import {
  Wifi,
  Waves,
  Car,
  Wind,
  UtensilsCrossed,
  Tv,
  Bath,
  TreePine,
  type LucideIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const facilityIcons: Record<string, LucideIcon> = {
  "Free WiFi": Wifi,
  "Beachfront": Waves,
  "Free parking": Car,
  "Air conditioning": Wind,
  "Kitchen": UtensilsCrossed,
  "Flat-screen TV": Tv,
  "Private bathroom": Bath,
  "Garden": TreePine,
}

interface PropertyFacilitiesProps {
  facilities: string[]
}

export function PropertyFacilities({ facilities }: PropertyFacilitiesProps) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-2">
        <h2 className="text-xl font-bold text-foreground">Most popular facilities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {facilities.map((facility) => {
            const Icon = facilityIcons[facility] || Wifi
            return (
              <div key={facility} className="flex items-center gap-2.5">
                <Icon className="size-5 text-success" />
                <span className="text-sm text-foreground">{facility}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
