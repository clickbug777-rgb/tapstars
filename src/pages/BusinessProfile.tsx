import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Smartphone, ExternalLink, MessageCircle, Star } from 'lucide-react';
import { useData } from '../context';
import { useAuth } from '../context/AuthContext';
import { formatWhatsAppUrl, downloadVCard, isValidUrl } from '../lib/utils';

export const BusinessProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { businesses, getBusinessBySlug } = useData();

  const business = getBusinessBySlug(slug || '');
  const demoBusiness = businesses.find((b) => b.slug === 'abc-cafe');
  const displayBusiness = business || demoBusiness;

  if (!displayBusiness) {
    return (
      <div className="min-h-screen flex flex-col bg-bg">
        <main className="flex-1 flex items-center justify-center text-center">
          <h1 className="text-xl font-bold text-ink">Business Not Found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink mb-2">{displayBusiness.name}</h1>
          <p className="text-sm text-ink-muted">{displayBusiness.category}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {isValidUrl(displayBusiness.whatsapp) && (
            <a
              href={formatWhatsAppUrl(displayBusiness.whatsapp, displayBusiness.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-3 bg-surface rounded-xl border border-border hover:shadow"
            >
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-ink">WhatsApp</span>
            </a>
          )}
          {isValidUrl(displayBusiness.website) && (
            <a
              href={displayBusiness.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-3 bg-surface rounded-xl border border-border hover:shadow"
            >
              <ExternalLink className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-ink">Website</span>
            </a>
          )}
        </div>

        {displayBusiness.google_review_url && (
          <div className="text-center mb-8">
            <a
              href={displayBusiness.google_review_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-success text-white rounded-xl font-medium hover:bg-success/90"
            >
              <Star className="w-5 h-5" />
              Leave a Google Review
            </a>
          </div>
        )}

        <button
          onClick={() => downloadVCard(displayBusiness)}
          className="mx-auto block text-sm text-ink hover:text-ink font-medium"
        >
          Save contact info (vCard)
        </button>
      </main>
    </div>
  );
};
