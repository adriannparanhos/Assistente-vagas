import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import type { JobApplicationStatus } from '../domain/types';
import { useJobStore } from '../store/useJobStore';

interface KanbanColumnConfig {
  title: string;
  status: JobApplicationStatus;
}

const columns: KanbanColumnConfig[] = [
  { title: 'Aplicadas', status: 'APPLIED' },
  { title: 'Entrevista RH', status: 'HR_INTERVIEW' },
  { title: 'Entrevista Técnica', status: 'TECH_INTERVIEW' },
  { title: 'Oferta', status: 'OFFER' },
  { title: 'Rejeitadas', status: 'REJECTED' },
];

const columnStatuses = columns.map((column) => column.status);

function isJobApplicationStatus(value: unknown): value is JobApplicationStatus {
  return typeof value === 'string' && columnStatuses.includes(value as JobApplicationStatus);
}

export function KanbanBoard() {
  const jobs = useJobStore((state) => state.jobs);
  const updateJobStatus = useJobStore((state) => state.updateJobStatus);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeJobId = String(active.id);
    const overStatus = over.data.current?.status ?? jobs.find((job) => job.id === over.id)?.status ?? over.id;

    if (!isJobApplicationStatus(overStatus)) {
      return;
    }

    const activeJob = jobs.find((job) => job.id === activeJobId);

    if (!activeJob || activeJob.status === overStatus) {
      return;
    }

    updateJobStatus(activeJobId, overStatus);
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="grid gap-4 xl:grid-cols-5">
        {columns.map((column) => (
          <KanbanColumn
            jobs={jobs.filter((job) => job.status === column.status)}
            key={column.status}
            status={column.status}
            title={column.title}
          />
        ))}
      </div>
    </DndContext>
  );
}
