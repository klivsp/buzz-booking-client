import { Card } from "@/components/ui/card"

interface StatCardProps {
  value: string
  label: string
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 gap-0.5 sm:gap-1">
      <span className="text-xl sm:text-2xl font-bold text-foreground">{value}</span>
      <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
    </Card>
  )
}

interface PropertyStatsProps {
  occupancy: number
  revenue: string
  rating: number
}

export function PropertyStats({ occupancy, revenue, rating }: PropertyStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      <StatCard value={`${occupancy}%`} label="Occupancy" />
      <StatCard value={revenue} label="Rev / Mo" />
      <StatCard value={rating.toFixed(1)} label="Rating" />
    </div>
  )
}
