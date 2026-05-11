import { Card, CardContent } from "@/components/ui/card"

interface PropertyAboutProps {
  title?: string
  description: string
}

export function PropertyAbout({ title = "About this property", description }: PropertyAboutProps) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-2">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
