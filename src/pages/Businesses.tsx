import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Plus, Edit, Trash2, Pause, Play, Activity, Clock } from 'lucide-react';
import { useData } from '../context';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { toast } from '../components/ui/Toast';
import { EmptyState } from '../components/ui/EmptyState';
import { format } from 'date-fns';

const CATEGORIES = ['Restaurant & Cafe', 'Salon & Spa', 'Clinic & Healthcare', 'Retail', 'Professional Services'];

interface BusinessForm {
  id: string;
  name: string;
  slug: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const Businesses: React.FC = () => {
  const { businesses, cards, deleteBusiness, toggleBusinessStatus, getCardsByBusinessId, createBusiness } = useData();
  const [search, setSearch] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<BusinessForm>>({});

  const filtered = useMemo(() => {
    return businesses
      .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));
  }, [businesses, search]);

  const handleDelete = (id: string) => {
    setToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (toDelete) {
      await deleteBusiness(toDelete);
      toast.success('Business deleted');
    }
    setConfirmOpen(false);
    setToDelete(null);
  };

  const handleCreate = () => {
    const newBiz = business;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-ink">Businesses</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-ink hover:bg-ink/90 rounded-xl"
        >
          <Plus className="w-4 h-4" />
          Add Business
        </button>
      </div>

      {filtered.length === 0 && businesses.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No businesses yet"
          description="Add your first business to manage NFC cards and profiles."
          action={
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-ink hover:bg-ink/90 rounded-xl"
            >
              Add Business
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((biz) => {
            const cardCount = getCardsByBusinessId(biz.id).length;
            return (
              <div key={biz.id} className="bg-surface rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-ink mb-1">{biz.name}</h3>
                    <p className="text-xs text-ink-muted flex items-center gap-1.5">
                      {biz.category}
                      <Clock className="w-3 h-3" />
                      Updated {format(new Date(biz.updated_at), 'MMM d')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/businesses/${biz.id}/edit`}
                      className="p-2 text-ink-muted hover:text-ink hover:bg-bg-soft rounded-full"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    {biz.is_active ? (
                      <button
                        onClick={() => toggleBusinessStatus(biz.id)}
                        className="p-2 text-ink-muted hover:text-success hover:bg-bg-soft rounded-full"
                        title="Deactivate"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleBusinessStatus(biz.id)}
                        className="p-2 text-ink-muted hover:text-primary hover:bg-bg-soft rounded-full"
                        title="Activate"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(biz.id)}
                      className="p-2 text-ink-muted hover:text-danger hover:bg-bg-soft rounded-full"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Business?"
        description="This will permanently delete the business and all associated NFC cards."
        confirmLabel="Delete"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};
