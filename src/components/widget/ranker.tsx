"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"

interface SortableItemProps {
  id: string
  label: string
  rank: number
}

function SortableItem({ id, label, rank }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    transition: { duration: 200, easing: "cubic-bezier(0.25, 1, 0.5, 1)" },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center h-12 px-3 mb-1.5 rounded-lg border transition-colors duration-100 ${
        isDragging
          ? "border-zinc-700 bg-zinc-900 scale-[1.01]"
          : "border-zinc-900 bg-zinc-950 hover:border-zinc-800"
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 -ml-1 mr-2 text-zinc-700 hover:text-zinc-500 transition-colors"
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      <span className="flex-1 text-[13px] font-medium text-zinc-200 truncate">
        {label}
      </span>
      <span className="font-mono text-sm font-semibold text-zinc-300 ml-3 tabular-nums">
        {rank}
      </span>
    </div>
  )
}

export interface RankerProps {
  question: string
  items: string[]
  onSubmit: (rankedItems: string[]) => void
}

export function Ranker({ question, items: initialItems, onSubmit }: RankerProps) {
  const [items, setItems] = React.useState(initialItems)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string)
      const newIndex = items.indexOf(over.id as string)
      const newItems = arrayMove(items, oldIndex, newIndex)
      setItems(newItems)
      if (typeof window !== "undefined" && window.pendo) {
        window.pendo.track("ranker_items_reordered", {
          movedItem: active.id as string,
          fromPosition: oldIndex + 1,
          toPosition: newIndex + 1,
          totalItems: items.length,
          currentOrder: newItems.join(","),
        })
      }
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => onSubmit(items), 400)
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-medium text-zinc-200 leading-snug">{question}</p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item, index) => (
            <SortableItem key={item} id={item} label={item} rank={index + 1} />
          ))}
        </SortableContext>
      </DndContext>

      <Button
        variant="outline"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full text-xs"
      >
        {isSubmitting ? "Saving…" : "Submit Priority"}
      </Button>
    </div>
  )
}
