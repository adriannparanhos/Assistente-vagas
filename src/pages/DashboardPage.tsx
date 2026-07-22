import { BarChart3, BriefcaseBusiness, FileText, Trophy } from 'lucide-react';
import { useDashboardMetrics } from '../features/analytics/hooks/useDashboardMetrics';
import { MetricCard } from '../shared/ui/MetricCard';

export function DashboardPage() {
  const { interviewRate, offerRate, resumeMetrics, totalApplications } = useDashboardMetrics();
  const bestResumeConversionRate = Math.max(...resumeMetrics.map((metric) => metric.conversionRate), 0);

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold text-gray-100">Métricas de Conversão</h2>
        <p className="max-w-2xl text-base text-gray-300">
          Acompanhe taxas de resposta, entrevistas e ofertas por versão de currículo.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          description="Candidaturas registradas no pipeline."
          icon={<BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />}
          title="Total de Aplicações"
          value={totalApplications}
        />
        <MetricCard
          description="Candidaturas que chegaram em entrevista."
          icon={<BarChart3 className="h-5 w-5" aria-hidden="true" />}
          title="Taxa de Entrevistas"
          value={`${interviewRate}%`}
        />
        <MetricCard
          description="Candidaturas que resultaram em oferta."
          icon={<Trophy className="h-5 w-5" aria-hidden="true" />}
          title="Taxa de Ofertas"
          value={`${offerRate}%`}
        />
        <MetricCard
          description="Versões de currículo testadas nas aplicações."
          icon={<FileText className="h-5 w-5" aria-hidden="true" />}
          title="Currículos Testados"
          value={resumeMetrics.length}
        />
      </div>

      <section className="rounded-lg border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-5 py-4">
          <h3 className="text-lg font-semibold text-gray-100">Teste A/B de Currículos</h3>
          <p className="mt-1 text-sm text-gray-400">
            Compare quais versões geram mais entrevistas a partir das candidaturas cadastradas.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[42rem] text-left">
            <thead className="bg-gray-950/70 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Versão</th>
                <th className="px-5 py-3 font-semibold">Usos</th>
                <th className="px-5 py-3 font-semibold">Entrevistas</th>
                <th className="px-5 py-3 font-semibold">Conversão</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {resumeMetrics.map((metric) => {
                const isWinner =
                  metric.total > 0 &&
                  metric.conversionRate === bestResumeConversionRate &&
                  bestResumeConversionRate > 0;

                return (
                  <tr
                    className={isWinner ? 'bg-blue-400/5' : 'bg-transparent'}
                    key={metric.resumeVersion}
                  >
                    <td className="px-5 py-4">
                      <span className="font-medium text-gray-100">{metric.resumeVersion}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-300">{metric.total}</td>
                    <td className="px-5 py-4 text-sm text-gray-300">{metric.interviews}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-gray-800">
                          <div
                            className="h-full rounded-full bg-blue-400"
                            style={{ width: `${metric.conversionRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-blue-300">
                          {metric.conversionRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {isWinner ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-200">
                          <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                          Vencedor atual
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">Em teste</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
