'use client';

import { WorkoutProgram } from '@/types/workout-program';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trash2, Edit, Dumbbell } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface WorkoutProgramCardProps {
  program: WorkoutProgram;
  onDelete: () => void;
}

export default function WorkoutProgramCard({ program, onDelete }: WorkoutProgramCardProps) {
  const router = useRouter();

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>{program.name}</CardTitle>
            {program.description && (
              <CardDescription>{program.description}</CardDescription>
            )}
          </div>
          <Badge className={difficultyColors[program.difficulty]}>
            {program.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {program.duration_weeks} weeks
            </span>
          </div>
          {program.goals && program.goals.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Goals:</span>
              <span className="font-medium">{program.goals.join(', ')}</span>
            </div>
          )}
          {program.equipment_needed && program.equipment_needed.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Equipment:</span>
              <span className="font-medium flex items-center">
                <Dumbbell className="mr-1 h-3 w-3" />
                {program.equipment_needed.length} items
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => router.push(`/dashboard/workout-programs/${program.id}/edit`)}
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
