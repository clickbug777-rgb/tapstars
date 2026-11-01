import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  QrCode,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Star,
  Smartphone,
  Phone,
  Mail,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Business } from '../../types';
import { BusinessFormModal } from '../../components/business/BusinessFormModal';
import { QrCodeModal } from '../../components/qr/QrCodeModal';
import { CONFIG } from '../../lib/config';

export const BusinessesPage: React.FC = () => {
  const { businesses, createBusiness, updateBusiness, deleteBusiness, toggleBusinessStatus } =
    useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [qrModalData, setQrModalData] = useState<{ title: string; slug: string } | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(businesses.map((b) => b.category)))];

  const filteredBusinesses = businesses.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyNfcUrl = (slug: string) => {
    const url = CONFIG.getNfcUrl(slug);
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}? This will also delete any associated NFC cards.`)) {
      await deleteBusiness(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/70">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Business Management</h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage your client profiles, permanent NFC URLs, and destination modes.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingBusiness(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Business</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, slug, phone..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-950"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Businesses Table Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        {filteredBusinesses.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Building2 className="w-10 h-10 mx-auto text-neutral-300" />
            <h3 className="text-sm font-semibold text-neutral-800">No businesses match your filter</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Try adjusting your search criteria or register a new business profile.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200/80 bg-neutral-50/70 text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-6">Business</th>
                  <th className="py-3.5 px-4">Permanent NFC URL</th>
                  <th className="py-3.5 px-4">Destination Mode</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredBusinesses.map((b) => (
                  <tr key={b.id} className="hover:bg-neutral-50/50 transition-colors">
                    {/* Business Name & Logo */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {b.logo_url ? (
                          <img
                            src={b.logo_url}
                            alt={b.name}
                            className="w-10 h-10 rounded-xl object-cover border border-neutral-200 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
                            {b.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-neutral-900 text-sm">{b.name}</div>
                          <div className="text-[11px] text-neutral-400">{b.category}</div>
                        </div>
                      </div>
                    </td>

                    {/* NFC Permanent URL */}
                    <td className="py-4 px-4 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-neutral-500 truncate max-w-[180px]">
                          /r/{b.slug}
                        </span>
                        <button
                          onClick={() => handleCopyNfcUrl(b.slug)}
                          title="Copy Full Permanent URL"
                          className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
                        >
                          {copiedSlug === b.slug ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Destination Mode */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          b.destination_mode === 'direct_review'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {b.destination_mode === 'direct_review' ? (
                          <>
                            <Star className="w-3 h-3 fill-amber-500 text-amber-600" />
                            Direct Google Review
                          </>
                        ) : (
                          <>
                            <Smartphone className="w-3 h-3 text-blue-600" />
                            Digital Profile Hub
                          </>
                        )}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleBusinessStatus(b.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
                          b.is_active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-neutral-100 text-neutral-500'
                        }`}
                      >
                        {b.is_active ? 'Active' : 'Paused'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => setQrModalData({ title: b.name, slug: b.slug })}
                          className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
                          title="Generate QR Code"
                        >
                          <QrCode className="w-4 h-4" />
                        </button>
                        <Link
                          to={`/p/${b.slug}`}
                          target="_blank"
                          className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
                          title="Open Live Profile"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setEditingBusiness(b);
                            setModalOpen(true);
                          }}
                          className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
                          title="Edit Business"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id, b.name)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete Business"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Business Form Modal */}
      <BusinessFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingBusiness(null);
        }}
        initialData={editingBusiness}
        onSave={async (data) => {
          if (editingBusiness) {
            await updateBusiness(editingBusiness.id, data);
          } else {
            await createBusiness(data);
          }
        }}
        existingSlugs={businesses.map((b) => b.slug)}
      />

      {/* QR Code Modal */}
      {qrModalData && (
        <QrCodeModal
          isOpen={Boolean(qrModalData)}
          onClose={() => setQrModalData(null)}
          title={qrModalData.title}
          slug={qrModalData.slug}
        />
      )}
    </div>
  );
};
