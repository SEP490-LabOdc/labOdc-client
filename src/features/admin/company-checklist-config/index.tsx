import { useEffect, useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Calendar,
  Building2,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { toast } from 'sonner'

import { useGetCompanyChecklist, useUpdateCompanyChecklist } from '@/hooks/api/company-checklist-config'
import type { Checklist, ChecklistGroup, ChecklistItem } from '@/hooks/api/company-checklist-config'

const CHECKLIST_ID = '20ec46f7-c336-416c-a0ac-7820040531df'

/** ---------- Utils ---------- */
function deepClone<T>(obj: T): T {
  // structuredClone is ideal; fallback JSON for older envs
  const sc = (globalThis as any).structuredClone
  if (typeof sc === 'function') return sc(obj)
  return JSON.parse(JSON.stringify(obj))
}

function normalizeChecklist(c: Checklist): Checklist {
  return {
    ...c,
    groups: (c.groups ?? []).map((g) => ({
      ...g,
      items: (g.items ?? []).map((it) => ({
        ...it,
        required: !!it.required,
        isDeleted: !!(it as any).isDeleted, // ensure boolean
      })),
    })),
  }
}

function newId(prefix: string) {
  const cryptoAny = (globalThis as any).crypto
  if (cryptoAny?.randomUUID) return cryptoAny.randomUUID()
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function CompanyChecklistConfigPage() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<Checklist | null>(null)
  const [showDeleted, setShowDeleted] = useState(false) // ✅ toggle global

  const { data, isLoading, isError, error, refetch } = useGetCompanyChecklist(CHECKLIST_ID)
  const checklist = data?.data

  const updateMutation = useUpdateCompanyChecklist()
  const saving = (updateMutation as any).isPending ?? false

  useEffect(() => {
    if (!checklist) return
    setDraft(normalizeChecklist(deepClone(checklist)))
  }, [checklist])

  const toggleGroup = (groupId: string, open?: boolean) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      const willOpen = typeof open === 'boolean' ? open : !next.has(groupId)
      if (willOpen) next.add(groupId)
      else next.delete(groupId)
      return next
    })
  }

  const addGroup = () => {
    setDraft((d) => {
      if (!d) return d
      const id = newId('g')
      const groups = [...(d.groups ?? [])]
      const newGroup: ChecklistGroup = {
        id,
        title: 'Nhóm mới',
        displayOrder: (groups.length ?? 0) + 1,
        items: [],
      }
      const next = { ...d, groups: [...groups, newGroup] }
      // auto expand new group
      setExpandedGroups((s) => new Set(s).add(id))
      return next
    })
  }

  const addItem = (groupId: string) => {
    setDraft((d) => {
      if (!d) return d
      const groups = (d.groups ?? []).map((g) => {
        if (g.id !== groupId) return g
        const id = newId('i')
        const items = [...(g.items ?? [])]
        const newItem: ChecklistItem = {
          id,
          content: 'Mục mới',
          displayOrder: (items.length ?? 0) + 1,
          required: false,
          isDeleted: false,
        }
        return { ...g, items: [...items, newItem] }
      })
      return { ...d, groups }
    })
  }

  const updateGroupField = <K extends keyof ChecklistGroup>(
    groupId: string,
    field: K,
    value: ChecklistGroup[K]
  ) => {
    setDraft((d) => {
      if (!d) return d
      return {
        ...d,
        groups: (d.groups ?? []).map((g) =>
          g.id === groupId ? { ...g, [field]: value } : g
        ),
      }
    })
  }

  const updateItemField = <K extends keyof ChecklistItem>(
    groupId: string,
    itemId: string,
    field: K,
    value: ChecklistItem[K]
  ) => {
    setDraft((d) => {
      if (!d) return d
      return {
        ...d,
        groups: (d.groups ?? []).map((g) =>
          g.id === groupId
            ? {
                ...g,
                items: (g.items ?? []).map((it) =>
                  it.id === itemId ? { ...it, [field]: value } : it
                ),
              }
            : g
        ),
      }
    })
  }

  const cancelEdit = () => {
    if (!checklist) return
    setDraft(normalizeChecklist(deepClone(checklist)))
    setIsEditing(false)
  }

  const saveDraft = async () => {
    if (!draft || !checklist) return

    const groups = (draft.groups ?? []).map((g) => {
      const items = (g.items ?? []).map((it) => ({
        id: it.id || '',
        content: it.content || '',
        displayOrder: Number(it.displayOrder) || 0,
        required: !!it.required,
        isDeleted: !!it.isDeleted, // ✅ giữ isDeleted
      }))

      return {
        id: g.id || '',
        title: g.title || '',
        displayOrder: Number(g.displayOrder) || 0,
        items,
      }
    })

    const payload = {
      name: checklist.name, // fixed name
      description: draft.description ?? '',
      entityType: draft.entityType ?? checklist.entityType,
      groups,
    }

    try {
      const res = await updateMutation.mutateAsync({ id: CHECKLIST_ID, ...payload })
      // sync draft to server response (professional)
      setDraft(normalizeChecklist(deepClone(res.data)))
      setIsEditing(false)
      toast.success('Cập nhật checklist template thành công')
    } catch (err) {
      const errorMessage =
        (err as any)?.response?.data?.message ||
        (err as any)?.message ||
        'Lỗi cập nhật checklist'
      toast.error(errorMessage)
    }
  }

  const getEntityTypeLabel = (entityType: string) => {
    const labels: Record<string, string> = {
      COMPANY_REGISTRATION: 'Đăng ký công ty',
      PROJECT_SUBMISSION: 'Nộp dự án',
      TALENT_APPLICATION: 'Ứng tuyển tài năng',
    }
    return labels[entityType] || entityType
  }

  const getEntityTypeClass = (entityType: string) => {
    const classes: Record<string, string> = {
      COMPANY_REGISTRATION: 'bg-blue-100 text-blue-800',
      PROJECT_SUBMISSION: 'bg-green-100 text-green-800',
      TALENT_APPLICATION: 'bg-purple-100 text-purple-800',
    }
    return classes[entityType] || 'bg-gray-100 text-gray-800'
  }

  /** Source of truth for rendering: draft if exists, otherwise checklist */
  const viewModel = draft ?? checklist

  const sortedGroups = useMemo(() => {
    const groups = (viewModel?.groups ?? []).slice()
    groups.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    return groups
  }, [viewModel])

  if (isLoading) return <div className="p-6">Loading...</div>

  if (isError) {
    return (
      <div className="p-6">
        <div className="text-red-600 font-medium">Lỗi tải checklist</div>
        <div className="text-sm text-muted-foreground mt-1">
          {(error as any)?.response?.data?.message ||
            (error as any)?.message ||
            'Unknown error'}
        </div>

        <button className="mt-4 underline" onClick={() => refetch()}>
          Thử lại
        </button>
      </div>
    )
  }

  if (!checklist || !viewModel) return <div className="p-6">Không có dữ liệu checklist.</div>

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header detail */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">{checklist.name}</h1>
            <p className="text-muted-foreground">{viewModel.description}</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {/* ✅ Toggle show deleted */}
            <button
              type="button"
              className="text-sm px-3 py-1 border rounded flex items-center gap-2"
              onClick={() => setShowDeleted((v) => !v)}
              title={showDeleted ? 'Đang hiển thị mục đã xoá' : 'Đang ẩn mục đã xoá'}
            >
              {showDeleted ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="hidden sm:inline">
                {showDeleted ? 'Hiện đã xóa' : 'Ẩn đã xóa'}
              </span>
            </button>

            {!isEditing && (
              <button className="underline text-sm" onClick={() => setIsEditing(true)}>
                Chỉnh sửa
              </button>
            )}

            {isEditing && (
              <>
                <button className="text-sm px-3 py-1 border rounded" onClick={cancelEdit}>
                  Hủy
                </button>
                <button
                  className="text-sm px-3 py-1 bg-primary text-white rounded"
                  onClick={saveDraft}
                  disabled={saving}
                >
                  {saving ? 'Đang lưu...' : 'Lưu'}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Badge className={getEntityTypeClass(checklist.entityType)}>
            {getEntityTypeLabel(checklist.entityType)}
          </Badge>

          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {format(new Date(checklist.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
          </div>
        </div>
      </div>

      {/* Groups */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Building2 className="h-4 w-4" />
          Nhóm kiểm tra ({sortedGroups.length})
          {isEditing && (
            <button className="ml-4 text-sm underline" onClick={addGroup}>
              Thêm nhóm
            </button>
          )}
        </div>

        {sortedGroups.map((group) => {
          const total = group.items?.length ?? 0
          const visible = (group.items ?? []).filter((it) => showDeleted || !it.isDeleted).length

          return (
            <Collapsible
              key={group.id}
              open={expandedGroups.has(group.id)}
              onOpenChange={(open) => toggleGroup(group.id, open)}
              className="border rounded-lg"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  {expandedGroups.has(group.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}

                  {isEditing ? (
                    <input
                      value={group.title}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateGroupField(group.id, 'title', e.target.value)}
                      className="font-medium bg-white/70 px-2 py-1 rounded border text-sm"
                    />
                  ) : (
                    <span className="font-medium">{group.title}</span>
                  )}
                </div>

                {/* ✅ show visible/total */}
                <Badge variant="outline">
                  {visible}/{total} mục
                </Badge>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-4 pb-4">
                <div className="space-y-2 mt-2">
                  {(group.items ?? [])
                    .filter((it) => showDeleted || !it.isDeleted)
                    .slice()
                    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                    .map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-start gap-3 p-3 rounded bg-muted/30 ${
                          item.isDeleted ? 'opacity-70' : ''
                        }`}
                      >
                        {/* ✅ icon can toggle required while editing */}
                        <button
                          type="button"
                          className="mt-0.5"
                          disabled={!isEditing}
                          onClick={() => {
                            if (!isEditing) return
                            updateItemField(group.id, item.id, 'required', !item.required)
                          }}
                          title={isEditing ? 'Toggle bắt buộc' : undefined}
                        >
                          {item.required ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>

                        <div className="flex-1">
                          {isEditing ? (
                            <div className="flex flex-col gap-1">
                              <input
                                value={item.content}
                                onChange={(e) =>
                                  updateItemField(group.id, item.id, 'content', e.target.value)
                                }
                                className="text-sm px-2 py-1 rounded border"
                              />

                              <div className="flex flex-wrap items-center gap-3 text-xs">
                                <label className="flex items-center gap-1">
                                  <input
                                    type="checkbox"
                                    checked={!!item.required}
                                    onChange={(e) =>
                                      updateItemField(
                                        group.id,
                                        item.id,
                                        'required',
                                        e.target.checked
                                      )
                                    }
                                  />
                                  Bắt buộc
                                </label>

                                <label className="flex items-center gap-1">
                                  <input
                                    type="checkbox"
                                    checked={!!item.isDeleted}
                                    onChange={(e) =>
                                      updateItemField(
                                        group.id,
                                        item.id,
                                        'isDeleted',
                                        e.target.checked
                                      )
                                    }
                                  />
                                  Đã xoá
                                </label>

                                <input
                                  type="number"
                                  value={item.displayOrder}
                                  onChange={(e) =>
                                    updateItemField(
                                      group.id,
                                      item.id,
                                      'displayOrder',
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-20 px-1 py-0.5 rounded border"
                                  title="Thứ tự hiển thị"
                                />

                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-sm ${item.isDeleted ? 'line-through' : ''}`}
                              >
                                {item.content}
                              </span>

                              {item.required && (
                                <Badge variant="secondary" className="text-xs">
                                  Bắt buộc
                                </Badge>
                              )}

              
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                  {isEditing && (
                    <div className="px-3 pb-2">
                      <button className="text-sm underline" onClick={() => addItem(group.id)}>
                        Thêm mục
                      </button>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </div>
    </div>
  )
}
