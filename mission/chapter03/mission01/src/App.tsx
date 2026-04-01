import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MoviesPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
