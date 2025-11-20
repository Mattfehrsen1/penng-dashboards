'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useClient, useClientOnboarding, useUpdateClientStatus } from '@/hooks/use-clients';
import { ArrowLeft, Mail, Calendar, User, Activity, Target, Dumbbell, Apple } from 'lucide-react';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
    active: 'default',
    paused: 'secondary',
    cancelled: 'destructive',
  };

  return (
    <Badge variant={variants[status] || 'default'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const { data: client, isLoading: isLoadingClient } = useClient(clientId);
  const { data: onboarding, isLoading: isLoadingOnboarding } = useClientOnboarding(
    client?.user_id || ''
  );
  const updateStatus = useUpdateClientStatus();

  const isLoading = isLoadingClient;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Not Found</h1>
          <p className="text-muted-foreground">The client you are looking for does not exist.</p>
        </div>
        <Button onClick={() => router.push('/clients')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>
      </div>
    );
  }

  const fullName = client.user
    ? `${client.user.first_name} ${client.user.last_name}`
    : 'Unknown Client';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push('/clients')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{fullName}</h1>
            <p className="text-muted-foreground">Client Details</p>
          </div>
        </div>
        <StatusBadge status={client.status} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Basic client information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-muted-foreground">{fullName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{client.user?.email || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Client Since</p>
                <p className="text-sm text-muted-foreground">{formatDate(client.assigned_at)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Management</CardTitle>
            <CardDescription>Update client relationship status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Current Status:</span>
              <StatusBadge status={client.status} />
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              {client.status !== 'active' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateStatus.mutate({ clientId: client.id, status: 'active' })}
                  disabled={updateStatus.isPending}
                >
                  Mark as Active
                </Button>
              )}
              {client.status !== 'paused' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateStatus.mutate({ clientId: client.id, status: 'paused' })}
                  disabled={updateStatus.isPending}
                >
                  Pause Client
                </Button>
              )}
              {client.status !== 'cancelled' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateStatus.mutate({ clientId: client.id, status: 'cancelled' })}
                  disabled={updateStatus.isPending}
                >
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {onboarding && !isLoadingOnboarding && (
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Information</CardTitle>
            <CardDescription>Client goals, preferences, and health data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                    <Activity className="h-4 w-4" />
                    Physical Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    {onboarding.age && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Age:</span>
                        <span>{onboarding.age} years</span>
                      </div>
                    )}
                    {onboarding.gender && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gender:</span>
                        <span className="capitalize">{onboarding.gender}</span>
                      </div>
                    )}
                    {onboarding.height_cm && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Height:</span>
                        <span>{onboarding.height_cm} cm</span>
                      </div>
                    )}
                    {onboarding.weight_kg && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Weight:</span>
                        <span>{onboarding.weight_kg} kg</span>
                      </div>
                    )}
                    {onboarding.goal_weight_kg && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Goal Weight:</span>
                        <span>{onboarding.goal_weight_kg} kg</span>
                      </div>
                    )}
                    {onboarding.activity_level && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Activity Level:</span>
                        <span className="capitalize">{onboarding.activity_level.replace('_', ' ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                    <Target className="h-4 w-4" />
                    Goals
                  </h3>
                  {onboarding.primary_goal && (
                    <p className="text-sm capitalize">
                      {onboarding.primary_goal.replace('_', ' ')}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                    <Apple className="h-4 w-4" />
                    Dietary Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    {onboarding.dietary_restrictions && onboarding.dietary_restrictions.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">Dietary Restrictions:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {onboarding.dietary_restrictions.map((restriction) => (
                            <Badge key={restriction} variant="outline">
                              {restriction}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {onboarding.food_allergies && onboarding.food_allergies.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">Food Allergies:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {onboarding.food_allergies.map((allergy) => (
                            <Badge key={allergy} variant="destructive">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                    <Dumbbell className="h-4 w-4" />
                    Workout Preferences
                  </h3>
                  {onboarding.equipment_access && onboarding.equipment_access.length > 0 && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Available Equipment:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {onboarding.equipment_access.map((equipment) => (
                          <Badge key={equipment} variant="outline">
                            {equipment}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Assigned Programs</CardTitle>
            <CardDescription>Meal plans and workout programs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Meal Plans</h4>
                <p className="text-sm text-muted-foreground">No meal plans assigned yet</p>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-2">Workout Programs</h4>
                <p className="text-sm text-muted-foreground">No workout programs assigned yet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Client engagement and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Activity tracking coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
