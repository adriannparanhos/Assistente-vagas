import { useMemo } from 'react';
import { useJobStore } from '../../jobs/store/useJobStore';
import type { JobApplication } from '../../jobs/domain/types';

interface ResumeMetricAccumulator {
  interviews: number;
  total: number;
}

export interface ResumeMetric {
  conversionRate: number;
  interviews: number;
  resumeVersion: string;
  total: number;
}

export interface DashboardMetrics {
  interviewRate: number;
  offerRate: number;
  resumeMetrics: ResumeMetric[];
  totalApplications: number;
}

const interviewStatuses = new Set<JobApplication['status']>([
  'HR_INTERVIEW',
  'TECH_INTERVIEW',
  'OFFER',
]);

function calculatePercentage(value: number, total: number) {
  if (total === 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

export function useDashboardMetrics(): DashboardMetrics {
  const jobs = useJobStore((state) => state.jobs);

  return useMemo(() => {
    const totalApplications = jobs.length;
    const interviewCount = jobs.filter((job) => interviewStatuses.has(job.status)).length;
    const offerCount = jobs.filter((job) => job.status === 'OFFER').length;

    const groupedByResume = jobs.reduce<Record<string, ResumeMetricAccumulator>>((acc, job) => {
      const resumeVersion = job.resumeVersion.trim() || 'Sem versão';

      acc[resumeVersion] ??= {
        interviews: 0,
        total: 0,
      };

      acc[resumeVersion].total += 1;

      if (interviewStatuses.has(job.status)) {
        acc[resumeVersion].interviews += 1;
      }

      return acc;
    }, {});

    const resumeMetrics = Object.entries(groupedByResume)
      .map(([resumeVersion, metric]) => ({
        conversionRate: calculatePercentage(metric.interviews, metric.total),
        interviews: metric.interviews,
        resumeVersion,
        total: metric.total,
      }))
      .sort((first, second) => second.conversionRate - first.conversionRate);

    return {
      interviewRate: calculatePercentage(interviewCount, totalApplications),
      offerRate: calculatePercentage(offerCount, totalApplications),
      resumeMetrics,
      totalApplications,
    };
  }, [jobs]);
}
