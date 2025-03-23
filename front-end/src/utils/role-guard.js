import authService from '@/services/auth.service';

/**
 * Navigation guard for Vue Router to check authentication and roles
 * @param {Array} allowedRoles - Array of roles allowed to access the route
 * @returns {function} Route guard function
 */
export const roleGuard = (allowedRoles = []) => {
  return (to, from, next) => {
    // If no authentication is required for this route
    if (!to.meta.requiresAuth) {
      return next();
    }

    // Check if user is logged in
    if (!authService.isLoggedIn()) {
      return next({ 
        path: '/login', 
        query: { redirect: to.fullPath } 
      });
    }

    // If no specific roles are required or no roles were specified
    if (!to.meta.roles || allowedRoles.length === 0) {
      return next();
    }

    // Get current user
    const user = authService.getCurrentUser();
    
    // Check if user has one of the allowed roles
    if (user && allowedRoles.includes(user.chucvu)) {
      return next();
    }

    // Redirect to unauthorized page or home
    return next({ path: '/unauthorized' });
  };
};

/**
 * Route metadata factory to set auth and role requirements
 * @param {boolean} requiresAuth - Whether route requires authentication
 * @param {Array} roles - Roles allowed to access the route
 * @returns {Object} Route metadata
 */
export const routeAuth = (requiresAuth = true, roles = []) => {
  return {
    requiresAuth,
    roles
  };
};
