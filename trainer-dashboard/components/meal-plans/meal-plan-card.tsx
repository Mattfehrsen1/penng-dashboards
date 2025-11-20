'use client';

import { MealPlan } from '@/types/meal-plan';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trash2, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MealPlanCardProps {
  plan: MealPlan;
  onDelete: () => void;
}

export default function MealPlanCard({ plan, onDelete }: MealPlanCardProps) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>{plan.name}</CardTitle>
            {plan.description && (
              <CardDescription>{plan.description}</CardDescription>
            )}
          </div>
          {plan.is_template && (
            <Badge variant="secondary">Template</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Calories:</span>
            <span className="font-medium">{plan.target_calories}</span>
          </div>
          {plan.target_protein && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Protein:</span>
              <span className="font-medium">{plan.target_protein}g</span>
            </div>
          )}
          {plan.target_carbs && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Carbs:</span>
              <span className="font-medium">{plan.target_carbs}g</span>
            </div>
          )}
          {plan.target_fat && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Fat:</span>
              <span className="font-medium">{plan.target_fat}g</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {plan.duration_days} days
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => router.push(`/dashboard/meal-plans/${plan.id}/edit`)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
