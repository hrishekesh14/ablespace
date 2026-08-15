"use client";

import { useRef, useState, type FormEvent } from "react";
import { X, Plus, Link2, Share2, Lock, MoreHorizontal } from "lucide-react";
import type { Task, Subtask } from "@/types";
import { PrioritySelect } from "@/components/tasks/PrioritySelect";
import { MemberSelect } from "@/components/tasks/MemberSelect";
import { DatePicker } from "@/components/ui/DatePicker";
import { StatusSelect } from "@/components/tasks/StatusSelect";
import { SubtaskRow } from "@/components/tasks/SubtaskRow";
import { Avatar } from "@/components/ui/Avatar";
import { IconButton } from "@/components/ui/IconButton";
import { useAuth } from "@/hooks/useAuth";
import { getUserById } from "@/lib/mock/users";
import { relativeTime } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface TaskDetailPanelProps {
  task: Task;
  onClose: () => void;
  onPatch: (patch: Partial<Task>) => void;
}

export function TaskDetailPanel({ task, onClose, onPatch }: TaskDetailPanelProps) {
  const { user } = useAuth();
  const [commentDraft, setCommentDraft] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  useOutsideClick([panelRef], onClose, true);

  function updateSubtask(id: string, patch: Partial<Subtask>) {
    onPatch({
      subtasks: task.subtasks.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  }

  function deleteSubtask(id: string) {
    onPatch({ subtasks: task.subtasks.filter((s) => s.id !== id) });
  }

  function addSubtask() {
    const subtask: Subtask = {
      id: `sub-${Date.now()}`,
      title: "New subtask",
      priority: "no-priority",
    };
    onPatch({ subtasks: [...task.subtasks, subtask] });
  }

  function submitComment(e: FormEvent) {
    e.preventDefault();
    const body = commentDraft.trim();
    if (!body || !user) return;
    onPatch({
      comments: [
        ...task.comments,
        { id: `c-${Date.now()}`, authorId: user.id, body, createdAt: new Date().toISOString() },
      ],
    });
    setCommentDraft("");
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/20">
      <div
        ref={panelRef}
        className="flex h-full w-full max-w-[820px] animate-in bg-surface shadow-panel"
      >
        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto scrollbar-thin">
          <div className="flex items-center justify-between border-b border-border-subtle px-6 py-3">
            <div className="flex items-center gap-2 text-ink-faint">
              <Lock className="h-3.5 w-3.5" />
              <span className="text-xs">1</span>
            </div>
            <div className="flex items-center gap-1">
              <IconButton aria-label="Share task" size="sm">
                <Share2 className="h-4 w-4" />
              </IconButton>
              <IconButton aria-label="More actions" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </IconButton>
              <IconButton aria-label="Close panel" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </IconButton>
            </div>
          </div>

          <div className="px-6 py-5">
            <input
              value={task.title}
              onChange={(e) => onPatch({ title: e.target.value })}
              className="w-full border-none bg-transparent text-xl font-semibold text-ink outline-none"
            />
            <textarea
              value={task.description ?? ""}
              onChange={(e) => onPatch({ description: e.target.value })}
              placeholder="Add a description..."
              rows={2}
              className="mt-2 w-full resize-none border-none bg-transparent text-sm text-ink-muted outline-none placeholder:text-ink-faint"
            />

            <div className="mt-4 space-y-2.5 text-sm">
              <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                <span className="text-ink-faint">Properties</span>
                <div className="flex flex-wrap items-center gap-2">
                  {task.role && (
                    <span className="rounded-md border border-border px-2 py-0.5 text-xs text-ink-muted">
                      {task.role}
                    </span>
                  )}
                  <DatePicker value={task.dueDate} onChange={(dueDate) => onPatch({ dueDate })} label="Due date" />
                </div>
              </div>

              <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                <span className="text-ink-faint">Labels</span>
                <div className="flex flex-wrap gap-1.5">
                  {task.labels.map((label, idx) => (
                    <span
                      key={`${label}-${idx}`}
                      className="rounded-full border border-border bg-surface-subtle px-2 py-0.5 text-xs text-ink-muted"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-[110px_1fr] items-center gap-2">
                <span className="text-ink-faint">Resources</span>
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs text-ink-faint hover:text-ink-muted"
                >
                  <Link2 className="h-3.5 w-3.5" />
                  Add document or link...
                </button>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-ink">Subtasks</p>
              <div className="rounded-md border border-border-subtle">
                <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-3 border-b border-border-subtle bg-surface-subtle px-2 py-1.5 text-xs font-medium text-ink-faint">
                  <span>Task</span>
                  <span>Priority</span>
                  <span>Members</span>
                  <span>Due Date</span>
                  <span className="w-8" />
                </div>
                <div className="px-2">
                  {task.subtasks.map((subtask) => (
                    <SubtaskRow
                      key={subtask.id}
                      subtask={subtask}
                      onPatch={(patch) => updateSubtask(subtask.id, patch)}
                      onDelete={() => deleteSubtask(subtask.id)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addSubtask}
                  className="flex w-full items-center gap-1.5 px-2 py-1.5 text-left text-xs font-medium text-ink-faint hover:bg-surface-subtle hover:text-ink-muted"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Subtasks
                </button>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-ink">Comments</p>
              <div className="space-y-3">
                {task.comments.map((comment) => {
                  const author = getUserById(comment.authorId);
                  return (
                    <div key={comment.id} className="flex items-start gap-2">
                      <Avatar user={author} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-ink">{author?.name ?? "Unknown"}</p>
                        <p className="text-sm text-ink-muted">{comment.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={submitComment} className="mt-3 flex items-center gap-2">
                <Avatar user={user ?? undefined} size="sm" />
                <input
                  value={commentDraft}
                  onChange={(e) => setCommentDraft(e.target.value)}
                  placeholder="Leave a reply..."
                  className="h-8 flex-1 rounded-md border border-border bg-surface px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </form>
            </div>
          </div>
        </div>

        {/* Details sidebar */}
        <div className="hidden w-[260px] shrink-0 flex-col border-l border-border-subtle bg-surface-subtle px-4 py-4 sm:flex overflow-y-auto scrollbar-thin">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Details</p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink-faint">Status</span>
              <StatusSelect value={task.status} onChange={(status) => onPatch({ status })} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-faint">Priority</span>
              <PrioritySelect value={task.priority} onChange={(priority) => onPatch({ priority })} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-faint">Members</span>
              <MemberSelect memberIds={task.memberIds} onChange={(memberIds) => onPatch({ memberIds })} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-faint">Latest</span>
              <DatePicker value={task.dueDate} onChange={(dueDate) => onPatch({ dueDate })} label="Latest date" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-faint">End</span>
              <DatePicker value={task.endDate} onChange={(endDate) => onPatch({ endDate })} label="End date" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-faint">Labels</span>
              <span className="text-xs text-ink-muted">
                {task.labels.length > 0 ? `${task.labels.length} labels` : "None"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-faint">Teams</span>
              <span className="text-xs text-ink-muted">{task.teams?.join(", ") || "None"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-faint">Reporter</span>
              <div className="flex items-center gap-1.5">
                <Avatar user={getUserById(task.reporterId)} size="sm" />
                <span className="text-xs text-ink-muted">
                  {getUserById(task.reporterId)?.name ?? "Unassigned"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-ink">Updates</p>
            <div className="space-y-3">
              {task.updates.map((update) => {
                const author = getUserById(update.authorId);
                return (
                  <div key={update.id} className="flex items-start gap-2 text-xs">
                    <Avatar user={author} size="xs" />
                    <p className="text-ink-muted">
                      <span className="font-medium text-ink">You</span> {update.message} ·{" "}
                      {relativeTime(update.createdAt)}
                    </p>
                  </div>
                );
              })}
              {task.updates.length === 0 && (
                <p className="text-xs text-ink-faint">No updates yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}