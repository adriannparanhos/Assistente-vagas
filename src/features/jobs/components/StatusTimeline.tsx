import type { StatusHistoryEvent } from '../domain/types';

interface StatusTimelineProps {
  history: StatusHistoryEvent[];
}

export function StatusTimeline({ history }: StatusTimelineProps) {
  const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-100">Histórico de Movimentações</h2>
      <div className="ml-3 border-l-2 border-gray-700">
        {history.map((event, index) => {
          // Exibe o último evento sem margem inferior extra se for o último
          const isLast = index === history.length - 1;
          return (
            <div key={`${event.status}-${event.date}`} className={`relative pl-6 ${isLast ? '' : 'pb-6'}`}>
              <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-cyan-500 ring-4 ring-gray-900" />
              <div>
                <p className="text-sm font-medium text-gray-100">{event.status}</p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {dateFormatter.format(new Date(event.date))}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
