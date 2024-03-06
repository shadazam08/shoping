import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { routers } from './Page/Routes/Routers';
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <RouterProvider router={routers} />
  );
}

export default App;