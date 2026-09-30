import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createTransaction } from '../api/transactions.api';

function TransactionForm({ onCreated }: { onCreated: () => void }) {
  const { token } = useAuth();
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!token) return;

    setSubmitting(true);
    try {
      await createTransaction(token, {
        amount: Number(amount),
        type,
        category,
        description: description || undefined,
        date,
      });

      setAmount('');
      setCategory('');
      setDescription('');
      setDate('');

      onCreated();
    } catch {
      setError('No se pudo guardar la transacción');
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    'w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm';
  const labelClass = 'block text-xs font-medium text-neutral-900 mb-1';

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h3 className="text-base font-semibold text-neutral-900 mb-4">Nueva transacción</h3>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
        <div className="w-28">
          <label className={labelClass}>Monto</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="w-32">
          <label className={labelClass}>Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'income' | 'expense')}
            className={inputClass}
          >
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
          </select>
        </div>

        <div className="w-36">
          <label className={labelClass}>Categoría</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="flex-1 min-w-40">
          <label className={labelClass}>Descripción</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="w-40">
          <label className={labelClass}>Fecha</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-primary text-white text-sm font-medium px-5 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition h-fit"
        >
          {submitting ? 'Guardando...' : 'Agregar'}
        </button>

        {error && <p className="text-danger text-sm w-full">{error}</p>}
      </form>
    </div>
  );
}

export default TransactionForm;