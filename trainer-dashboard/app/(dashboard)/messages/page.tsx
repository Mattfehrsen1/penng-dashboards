'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/liquid-glass/glass-card';
import { MetricCard } from '@/components/liquid-glass/metric-card';
import { MessageCircle, Clock, AlertCircle, CheckCircle, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import mock data
import messagesData from '@/data/mock/messages.json';

export default function MessagesPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'high-priority'>('all');

  const filteredMessages = messagesData.recentMessages.filter((msg) => {
    if (selectedFilter === 'unread') return !msg.isRead;
    if (selectedFilter === 'high-priority') return msg.priority === 'high';
    return true;
  });

  const unreadCount = messagesData.recentMessages.filter((m) => !m.isRead).length;
  const highPriorityCount = messagesData.recentMessages.filter((m) => m.priority === 'high').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-bold tracking-tight dark:text-white text-neutral-900">
          Messages & Check-ins
        </h1>
        <p className="dark:text-neutral-400 text-neutral-600 mt-2">
          Manage client communications and scheduled check-ins
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <MetricCard
          title="Unread Messages"
          value={unreadCount}
          icon={MessageCircle}
          accentColor="cobalt"
          description="Pending responses"
        />

        <MetricCard
          title="High Priority"
          value={highPriorityCount}
          icon={AlertCircle}
          accentColor="amber"
          description="Urgent attention needed"
        />

        <MetricCard
          title="Upcoming Check-ins"
          value={messagesData.upcomingCheckIns.length}
          icon={Calendar}
          accentColor="purple"
          description="Scheduled this week"
        />

        <MetricCard
          title="Response Time"
          value="< 2h"
          icon={Clock}
          accentColor="green"
          description="Average response time"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Messages List - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filter Bar */}
          <GlassCard className="p-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 dark:text-neutral-400 text-neutral-600" />
              <span className="text-sm font-medium dark:text-neutral-400 text-neutral-600">Filter:</span>
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedFilter('all')}
                  className={selectedFilter === 'all' ? 'bg-penng-cobalt text-white' : ''}
                >
                  All ({messagesData.recentMessages.length})
                </Button>
                <Button
                  variant={selectedFilter === 'unread' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedFilter('unread')}
                  className={selectedFilter === 'unread' ? 'bg-penng-cobalt text-white' : ''}
                >
                  Unread ({unreadCount})
                </Button>
                <Button
                  variant={selectedFilter === 'high-priority' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedFilter('high-priority')}
                  className={selectedFilter === 'high-priority' ? 'bg-penng-cobalt text-white' : ''}
                >
                  High Priority ({highPriorityCount})
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Messages */}
          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {filteredMessages.map((msg) => (
              <GlassCard
                key={msg.id}
                className={`p-5 cursor-pointer transition-all ${
                  !msg.isRead
                    ? 'border-l-4 border-l-penng-cobalt dark:bg-penng-cobalt/5 bg-penng-cobalt/10'
                    : 'hover:dark:bg-white/5 hover:bg-white/80'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold dark:text-white text-neutral-900">{msg.clientName}</h3>
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-penng-cobalt text-white">
                          New
                        </span>
                      )}
                      {msg.priority === 'high' && (
                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium dark:text-neutral-300 text-neutral-700 mb-2">
                      {msg.subject}
                    </p>
                    <p className="text-sm dark:text-neutral-400 text-neutral-600 line-clamp-2">
                      {msg.preview}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs dark:text-neutral-500 text-neutral-500">
                        {new Date(msg.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                      {msg.isRead && (
                        <span className="text-xs dark:text-neutral-500 text-neutral-500 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Read
                        </span>
                      )}
                    </div>
                  </div>
                  <MessageCircle
                    className={`w-5 h-5 ${
                      !msg.isRead ? 'text-penng-cobalt' : 'dark:text-neutral-500 text-neutral-400'
                    }`}
                  />
                </div>
              </GlassCard>
            ))}

            {filteredMessages.length === 0 && (
              <GlassCard className="p-12 text-center">
                <MessageCircle className="w-12 h-12 dark:text-neutral-600 text-neutral-400 mx-auto mb-3" />
                <p className="dark:text-neutral-400 text-neutral-600">No messages found</p>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Upcoming Check-ins */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-penng-cobalt" />
              <h3 className="text-lg font-bold dark:text-white text-neutral-900">Upcoming Check-ins</h3>
            </div>
            <div className="space-y-3">
              {messagesData.upcomingCheckIns.map((checkin) => (
                <div
                  key={checkin.id}
                  className="p-4 rounded-lg dark:bg-white/5 bg-white/60 border-l-2 border-l-penng-cobalt"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium dark:text-white text-neutral-900 text-sm">
                      {checkin.clientName}
                    </p>
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        checkin.type === 'urgent'
                          ? 'bg-red-500 text-white'
                          : checkin.type === 'weekly'
                          ? 'bg-penng-cobalt text-white'
                          : 'bg-neutral-500 text-white'
                      }`}
                    >
                      {checkin.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 dark:text-neutral-400 text-neutral-600" />
                    <p className="text-xs dark:text-neutral-400 text-neutral-600">
                      {new Date(checkin.scheduledTime).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {checkin.notes && (
                    <p className="text-xs dark:text-neutral-500 text-neutral-600 italic mt-2">
                      {checkin.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick Stats */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-bold dark:text-white text-neutral-900 mb-4">Message Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm dark:text-neutral-400 text-neutral-600">Total Messages</span>
                <span className="font-bold dark:text-white text-neutral-900">
                  {messagesData.recentMessages.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm dark:text-neutral-400 text-neutral-600">Unread</span>
                <span className="font-bold text-penng-cobalt">{unreadCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm dark:text-neutral-400 text-neutral-600">High Priority</span>
                <span className="font-bold text-amber-500">{highPriorityCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm dark:text-neutral-400 text-neutral-600">Read</span>
                <span className="font-bold text-green-500">
                  {messagesData.recentMessages.length - unreadCount}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Priority Clients */}
          <GlassCard className="p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold dark:text-white text-neutral-900">Needs Response</h3>
            </div>
            <div className="space-y-3">
              {messagesData.recentMessages
                .filter((m) => !m.isRead)
                .slice(0, 3)
                .map((msg) => (
                  <div key={msg.id} className="p-3 rounded-lg dark:bg-white/5 bg-white/60">
                    <p className="font-medium dark:text-white text-neutral-900 text-sm mb-1">
                      {msg.clientName}
                    </p>
                    <p className="text-xs dark:text-neutral-400 text-neutral-600 line-clamp-1">
                      {msg.subject}
                    </p>
                  </div>
                ))}
              {unreadCount === 0 && (
                <div className="text-center py-4">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm dark:text-neutral-400 text-neutral-600">All caught up!</p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
