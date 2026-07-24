import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Hola, {user?.name} 👋</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <p>Aquí va tu dashboard financiero.</p>
    </div>
  );
}

export default Dashboard;