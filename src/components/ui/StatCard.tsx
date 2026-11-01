import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  accent?: 'primary' | 'success' | 'warning' | 'danger';
}

const accentMap = {
  primary: { bg: 'bg-primary-soft', fg: 'text-primary' },
  success: { bg: 'bg-success-soft', fg: 'text-success' },
  warning: { bg: 'bg-warning-soft', fg: 'text-warning' },
  danger: { bg: 'bg-danger-soft', fg: 'text-danger' },
};

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend, accent = 'primary' }) => {
  const a = accentMap[accent];
  return (
    <div className="bg-surface rounded-xl border border-border p-5 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-faint uppercase tracking-wider">{label}</p>
          <p className="text-3xl font-bold text-ink mt-2 tracking-tight">{value}</p>
          {trend && (
            <p className={`text-xs font-medium mt-1.5 ${
              trend.positive ? 'text-success' : 'text-danger'
            }`}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl ${a.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${a.fg}`} />
        </div>
      </div>
    </div>
  );
};