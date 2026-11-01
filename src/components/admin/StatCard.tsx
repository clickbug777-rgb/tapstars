import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  color?: 'default' | 'blue' | 'green' | 'amber';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'default',
}) => {
  return (
    <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{title}</span>
        <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold tracking-tight text-neutral-900">{value}</div>
        {(subtitle || trend) && (
          <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500">
            {trend && <span className="text-emerald-600 font-medium">{trend}</span>}
            {subtitle && <span>{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
