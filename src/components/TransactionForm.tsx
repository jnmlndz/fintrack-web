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

      // form reset
      setAmount('');
      setCategory('');
      setDescription('');
      setDate('');

      onCreated(); // tells parent component to refresh the transaction list
    } catch {
      setError('No se pudo guardar la transacción');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 30 }}>
      <div>
        <label>Monto</label><br />
        <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>

      <div>
        <label>Tipo</label><br />
        <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </select>
      </div>

      <div>
        <label>Categoría</label><br />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>

      <div>
        <label>Descripción</label><br />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label>Fecha</label><br />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Guardando...' : 'Agregar'}
      </button>

      {error && <p style={{ color: 'red', width: '100%' }}>{error}</p>}
    </form>
  );
}

export default TransactionForm;