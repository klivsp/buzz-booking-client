"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface ReviewCategory {
  name: string
  score: number
}

interface Review {
  id: string
  author: string
  avatar?: string
  date: string
  rating: number
  comment: string
}

interface PropertyReviewsProps {
  overallRating: number
  totalReviews: number
  categories: ReviewCategory[]
  reviews: Review[]
}

export function PropertyReviews({ 
  overallRating, 
  totalReviews, 
  categories, 
  reviews 
}: PropertyReviewsProps) {
  const getRatingLabel = (rating: number) => {
    if (rating >= 9) return "Excellent"
    if (rating >= 8) return "Very Good"
    if (rating >= 7) return "Good"
    if (rating >= 6) return "Pleasant"
    return "Review Score"
  }

  return (
    <Card>
      <CardContent className="space-y-6 pt-2">
        {/* Rating Overview */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-primary-foreground">
              {overallRating.toFixed(1)}
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{getRatingLabel(overallRating)}</p>
              <p className="text-sm text-muted-foreground">{totalReviews} reviews</p>
            </div>
          </div>

          {/* Category Scores */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {categories.map((category) => (
              <div key={category.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{category.name}</span>
                  <span className="font-semibold text-foreground">{category.score.toFixed(1)}</span>
                </div>
                <Progress value={category.score * 10} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>

        <Button variant="secondary" className="w-full sm:w-auto rounded-lg">
          Read all reviews
        </Button>

        {/* Individual Reviews */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="border-border/50">
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage src={review.avatar} alt={review.author} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {review.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center rounded-lg border border-border px-2 py-1">
                    <span className="text-sm font-semibold text-foreground">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
