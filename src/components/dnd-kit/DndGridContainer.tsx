import { Stack, Button, useTheme } from "@mui/material";
import { CommonSlideProps } from "../../types/global";
import { useCustomAlert } from "../../context/custom-alert-context";
import DndGridItem from "./DndGridItem";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Iconify from "../../iconify";

type Props<T> = {
  items: T[];
  handleItems: (slide: T[]) => void;
  toggleDialog: (item?: T) => void;
  overFlow?: boolean;
  handleOnClick?: (item: T) => void;
};

const DndGridContainer = <T extends CommonSlideProps>(props: Props<T>) => {
  const {
    items,
    handleItems,
    toggleDialog,
    overFlow = false,
    handleOnClick,
  } = props;

  const theme = useTheme();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { customAlert } = useCustomAlert();

  const handleDelete = (item: string) => {
    const newItems = items.filter((i) => i.uniqueId !== item);
    handleItems(newItems);
  };

  const getSlideIndex = (id: string) =>
    items.findIndex((item) => item.uniqueId === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const originalPos = getSlideIndex(active.id as string);
      const newPos = getSlideIndex(over?.id as string);
      const newItems = arrayMove(items, originalPos, newPos);
      handleItems(newItems);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <Stack
        direction="row"
        sx={{
          flexWrap: overFlow ? "nowrap" : "wrap",
          overflowX: "auto",
        }}
      >
        <SortableContext
          items={items.map((data) => ({ id: data.uniqueId ?? "" }))}
          strategy={rectSortingStrategy}
        >
          {items.map((item) => {
            const id = item.uniqueId;
            return (
              <DndGridItem
                thumbnail={item.thumbnailUrl ?? ""}
                key={id}
                id={id ?? ""}
                handleDelete={(itemId) => {
                  customAlert("Confirm Deletion", {
                    description: "Are you sure you want to delete this slide?",
                    variant: "delete",
                    onConfirm: () => {
                      handleDelete(itemId);
                    },
                  });
                }}
                handleEditItem={() => toggleDialog(item)}
                handleClick={() => handleOnClick?.(item)}
              />
            );
          })}
        </SortableContext>
        <Stack justifyContent="center" m={1}>
          <Button
            sx={{
              width: 125,
              height: 125,
              bgcolor: theme.palette.background.default,
              color: theme.palette.text.primary,
              borderRadius: 1,
              border: `2px dashed ${theme.palette.grey[500]}`,
            }}
            onClick={() => toggleDialog()}
            startIcon={<Iconify icon="mingcute:add-fill" width={16} />}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </DndContext>
  );
};

export default DndGridContainer;
