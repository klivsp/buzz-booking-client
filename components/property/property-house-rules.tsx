import { Clock, Info, Users, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface HouseRule {
  icon: "clock" | "info" | "users"
  title: string
  description: string
}

interface PropertyHouseRulesProps {
  rules: HouseRule[]
  importantInfo?: string
}

const iconMap = {
  clock: Clock,
  info: Info,
  users: Users,
}

export function PropertyHouseRules({ rules, importantInfo }: PropertyHouseRulesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-foreground">House Rules</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {rules.map((rule, index) => {
          const Icon = iconMap[rule.icon]
          return (
            <div key={index} className="flex items-start gap-2 sm:gap-3">
              <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
                <Icon className="size-4 sm:size-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">{rule.title}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{rule.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {importantInfo && (
        <Card className="border-warning/50 bg-warning/10">
          <CardContent className="flex gap-3 p-3 sm:py-4">
            <AlertCircle className="size-4 sm:size-5 shrink-0 text-warning-foreground mt-0.5" />
            <div>
              <p className="font-semibold text-warning-foreground text-sm sm:text-base">Important information</p>
              <p className="text-xs sm:text-sm text-warning-foreground/80 mt-1">{importantInfo}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
