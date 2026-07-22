import type { ReactNode } from 'react';

interface MetricCardProps {
  description?: string;
  icon?: ReactNode;
  title: string;
  value: number | string;
}

export function MetricCard({ description, icon, title, value }: MetricCardProps) {
  return (
    <article className="rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-lg shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-300">{title}</p>
          <p className="mt-3 text-3xl font-bold text-blue-400">{value}</p>
        </div>

        {icon ? (
          <div className="rounded-md border border-blue-400/20 bg-blue-400/10 p-2 text-blue-300">
            {icon}
          </div>
        ) : null}
      </div>

      {description ? <p className="mt-4 text-sm text-gray-400">{description}</p> : null}
    </article>
  );
}
