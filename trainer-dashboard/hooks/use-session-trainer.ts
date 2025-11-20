'use client';

/**
 * Hook to get the demo trainer ID.
 * Auth disabled for demo purposes.
 *
 * @returns {Object} Object with trainerId and isLoading state
 */
export function useTrainerId() {
  return {
    trainerId: 'demo-trainer-123',
    isLoading: false,
  };
}

/**
 * Hook to get demo session data.
 * Auth disabled for demo purposes.
 *
 * @returns {Object} Object with session, user, trainerId, isAuthenticated, and isLoading
 */
export function useAuthSession() {
  return {
    session: {
      user: {
        name: 'Demo Trainer',
        email: 'demo@penng.ai',
        trainerId: 'demo-trainer-123',
        role: 'trainer',
      }
    },
    user: {
      name: 'Demo Trainer',
      email: 'demo@penng.ai',
      trainerId: 'demo-trainer-123',
      role: 'trainer',
    },
    trainerId: 'demo-trainer-123',
    isAuthenticated: true,
    isLoading: false,
  };
}
