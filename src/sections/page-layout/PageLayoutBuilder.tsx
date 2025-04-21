import { useState } from "react";
import { IComponent } from "../../types/page-layout";
import { Button, Stack } from "@mui/material";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import PageLayoutComponent from "./PageLayoutComponent";
import { Add } from "@mui/icons-material";
import AddComponentDialogForm from "./AddComponentDialogForm";

type Props = {
  components: IComponent[];
  isEdit?: boolean;
  handleComponents: (slide: IComponent[]) => void;
};

const PageLayoutBuilder = (props: Props) => {
  const { components, isEdit = false, handleComponents } = props;

  const [open, setOpen] = useState(false);

  const [selectedComponent, setSelectedComponent] = useState<IComponent | null>(
    null
  );

  const openAddDialog = () => {
    setSelectedComponent(null);
    setOpen(true);
  };

  const openEditDialog = (item: IComponent) => {
    setSelectedComponent(item);
    setOpen(true);
  };

  const handleComponentSubmit = (component: IComponent) => {
    const updated = selectedComponent
      ? components.map((c) => (c.id === component.id ? component : c))
      : [...components, component];

    handleComponents(updated);
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    const newComponents = components.filter((item) => item.id !== id);
    handleComponents(newComponents);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = components.findIndex((item) => item.id === active.id);
      const newIndex = components.findIndex((item) => item.id === over?.id);
      handleComponents(arrayMove(components, oldIndex, newIndex));
    }
  };

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          p: 2,
          border: "1px dashed black",
          borderRadius: 1,
          mt: 2,
        }}
      >
        <Button
          onClick={openAddDialog}
          sx={{ border: "1px dashed black", p: 1.5 }}
        >
          <Add />
          Add Component
        </Button>
        {components.length > 0 && (
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext
              items={components.map((data) => ({ id: data.id || "" }))}
              strategy={verticalListSortingStrategy}
            >
              <Stack spacing={2}>
                {components.map((item) => (
                  <PageLayoutComponent
                    isEdit={isEdit}
                    key={item.id}
                    item={item}
                    onDelete={(id) => handleDelete(id)}
                    onEdit={openEditDialog}
                  />
                ))}
              </Stack>
            </SortableContext>
          </DndContext>
        )}
      </Stack>

      <AddComponentDialogForm
        handleComponent={handleComponentSubmit}
        isEdit={!!selectedComponent}
        componentData={selectedComponent}
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedComponent(null);
        }}
      />
    </>
  );
};

export default PageLayoutBuilder;
