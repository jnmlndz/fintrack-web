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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <p className="text-neutral-900">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">
          Hola, {user?.name} 👋
        </h1>
        <button
          onClick={handleLogout}
          className="bg-white border border-neutral-200 text-neutral-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-neutral-50 transition"
        >
          Cerrar sesión
        </button>
      </div>

      <TransactionForm onCreated={loadData} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card label="Ingresos" value={balance?.totalIncome} color="secondary" />
        <Card label="Gastos" value={balance?.totalExpense} color="danger" />
        <Card label="Balance" value={balance?.balance} color="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-4">
            Gastos por categoría
          </h3>
          <div className="h-72">
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
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-base font-semibold text-neutral-900 mb-4">
            Ingresos vs Gastos por mes
          </h3>
          <div className="h-72">
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
    </div>
  );
}

function Card({
  label,
  value,
  color,
}: {
  label: string;
  value?: number;
  color: 'primary' | 'secondary' | 'danger';
}) {
  const colorClasses = {
    primary: 'border-primary text-primary',
    secondary: 'border-secondary text-secondary',
    danger: 'border-danger text-danger',
  };

  return (
    <div className={`bg-white border-2 rounded-xl p-5 ${colorClasses[color]}`}>
      <p className="text-sm text-neutral-900">{label}</p>
      <h2 className="text-2xl font-bold mt-1">
        ${value?.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
      </h2>
    </div>
  );
}

export default Dashboard;