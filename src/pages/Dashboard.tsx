import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getBalance, getExpensesByCategory, getMonthlySummary } from '../api/transactions.api';
import type { Balance, CategorySummary, MonthlySummary } from '../types/transaction.types';
import TransactionForm from '../components/TransactionForm';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFE', '#FF6699'];

function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [balance, setBalance] = useState<Balance | null>(null);
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [monthly, setMonthly] = useState<MonthlySummary[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!token) return;
    try {
      const [balanceData, categoryData, monthlyData] = await Promise.all([
        getBalance(token),
        getExpensesByCategory(token),
        getMonthlySummary(token),
      ]);
      setBalance(balanceData);
      setCategories(categoryData);
      setMonthly(monthlyData);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  if (loading) return <p style={{ padding: 40 }}>Cargando...</p>;

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Hola, {user?.name} 👋</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <TransactionForm onCreated={loadData} />

      <div style={{ display: 'flex', gap: 20, margin: '20px 0' }}>
        <Card label="Ingresos" value={balance?.totalIncome} color="#00C49F" />
        <Card label="Gastos" value={balance?.totalExpense} color="#FF8042" />
        <Card label="Balance" value={balance?.balance} color="#0088FE" />
      </div>

      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ width: 400, height: 300 }}>
          <h3>Gastos por categoría</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categories} dataKey="total" nameKey="category" cx="50%" cy="50%" outerRadius={90} label>
                {categories.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: 500, height: 300 }}>
          <h3>Ingresos vs Gastos por mes</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#00C49F" name="Ingresos" />
              <Bar dataKey="expense" fill="#FF8042" name="Gastos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Card({ label, value, color }: { label: string; value?: number; color: string }) {
  return (
    <div style={{ border: `2px solid ${color}`, borderRadius: 8, padding: 16, minWidth: 150 }}>
      <p style={{ margin: 0, color: '#666' }}>{label}</p>
      <h2 style={{ margin: 0, color }}>${value?.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</h2>
    </div>
  );
}

export default Dashboard;