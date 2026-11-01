import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-16 h-16 rounded-2xl bg-bg-soft flex items-center justify-center mb-5">
        <Icon className="w-8 h-8 text-ink-faint" />
      </div>
      <h3 className="text-lg font-semibold text-ink mb-1.5">{title}</h3>
      <p className="text-sm text-ink-muted max-w-md mb-6 leading-relaxed">{description}</p>
      {action}
    </div>
  );
};