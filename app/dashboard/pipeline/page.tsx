/**
 * MissionPilot — Kanban pipeline page
 * Copyright © 2026 Riadh MNASRI. All rights reserved.
 */
import KanbanBoard from "@/components/dashboard/KanbanBoard";

export default function PipelinePage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Pipeline</h1>
        <p className="text-sm text-slate-500 mt-0.5">Track your missions from first contact to signature</p>
      </div>
      <KanbanBoard />
    </div>
  );
}
