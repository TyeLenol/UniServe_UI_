import { Navigate, Outlet, useLocation } from 'react-router';

export default function AdminRoute() {
  const location = useLocation();

  const rawSession = localStorage.getItem('campus-auth-session');
  if (!rawSession) {
    return <Navigate to={`/auth?next=${encodeURIComponent(location.pathname)}`} replace />;
  }

  try {
    const session = JSON.parse(rawSession);
    if (session?.role === 'admin') return <Outlet />;
  } catch {
    // invalid session
  }

  return <Navigate to={`/auth?next=${encodeURIComponent(location.pathname)}`} replace />;
}
