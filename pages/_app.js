import { Provider, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import store from '../store';
import { initAuth } from '../store/slices/authSlice';
import '../styles/globals.css';

const PUBLIC_ROUTES = ['/login', '/register'];

function AuthGuard({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  useEffect(() => {
    const isPublic = PUBLIC_ROUTES.includes(router.pathname);
    if (!isAuthenticated && !isPublic) {
      router.replace('/login');
    }
    if (isAuthenticated && isPublic) {
      router.replace('/');
    }
  }, [isAuthenticated, router.pathname]);

  const isPublic = PUBLIC_ROUTES.includes(router.pathname);
  if (!isAuthenticated && !isPublic) return null;

  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </Provider>
  );
}
