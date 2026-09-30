import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateTransaction, deleteTransaction } from '../api/transactions.api';
import type { Transaction } from '../types/transaction.types';

function TransactionList({
  transactions,
  onChanged,
}: {
  transactions: Transaction[];
  onChanged: () => void;
}) {
  const { token } = useAuth();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [error, setError] = useState('');

  function startEdit(tx: Transaction) {
    setEditingId(tx.id);
    setEditAmount(tx.amount);
    setEditCategory(tx.category);
    setError('');
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit(id: number) {
    if (!token) return;
    try {
      await updateTransaction(token, id, {
        amount: Number(editAmount),
        category: editCategory,
      });
      setEditingId(null);
      onChanged();
    } catch {
      setError('No se pudo actualizar');
    }
  }

  async function handleDelete(id: number) {
    if (!token) return;
    const confirmed = window.confirm('¿Seguro que quieres eliminar esta transacción?');
    if (!confirmed) return;

    try {
      await deleteTransaction(token, id);
      onChanged();
    } catch {
      setError('No se pudo eliminar');
    }
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center text-neutral-900 text-sm">
        Aún no tienes transacciones registradas.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 overflow-x-auto">
      <h3 className="text-base font-semibold text-neutral-900 mb-4">Historial</h3>

      {error && <p className="text-danger text-sm mb-3">{error}</p>}

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-900 border-b border-neutral-200">
            <th className="py-2 pr-4">Fecha</th>
            <th className="py-2 pr-4">Tipo</th>
            <th className="py-2 pr-4">Categoría</th>
            <th className="py-2 pr-4">Descripción</th>
            <th className="py-2 pr-4">Monto</th>
            <th className="py-2 pr-4"></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b border-neutral-100 last:border-0">
              <td className="py-2 pr-4">{tx.date}</td>
              <td className="py-2 pr-4">
                <span
                  className={
                    tx.type === 'income'
                      ? 'text-secondary font-medium'
                      : 'text-danger font-medium'
                  }
                >
                  {tx.type === 'income' ? 'Ingreso' : 'Gasto'}
                </span>
              </td>

              {editingId === tx.id ? (
                <>
                  <td className="py-2 pr-4">
                    <input
                      type="text"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-28 px-2 py-1 border border-neutral-200 rounded"
                    />
                  </td>
                  <td className="py-2 pr-4 text-neutral-900">{tx.description || '—'}</td>
                  <td className="py-2 pr-4">
                    <input
                      type="number"
                      step="0.01"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="w-24 px-2 py-1 border border-neutral-200 rounded"
                    />
                  </td>
                  <td className="py-2 pr-4 space-x-2">
                    <button
                      onClick={() => saveEdit(tx.id)}
                      className="text-primary font-medium hover:underline"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-neutral-900 hover:underline"
                    >
                      Cancelar
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 pr-4">{tx.category}</td>
                  <td className="py-2 pr-4 text-neutral-900">{tx.description || '—'}</td>
                  <td className="py-2 pr-4 font-medium">
                    ${Number(tx.amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-2 pr-4 space-x-2">
                    <button
                      onClick={() => startEdit(tx)}
                      className="text-primary hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(tx.id)}
                      className="text-danger hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;