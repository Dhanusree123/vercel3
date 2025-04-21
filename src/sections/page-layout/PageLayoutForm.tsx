import { useEffect, useMemo } from "react";
import {
  IComponent,
  IPageLayout,
  NewPageLayoutSchema,
  UpdatePageLayoutSchema,
} from "../../types/page-layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormProvider from "../../components/FormProvider";
import { Button, Stack, Typography } from "@mui/material";
import RHFTextField from "../../components/RHFTextField";
import PageLayoutBuilder from "./PageLayoutBuilder";
import { nanoid } from "nanoid";

type Props = {
  isEdit?: boolean;
  pageLayout?: IPageLayout | null;
  onSubmit: (data: IPageLayout) => void;
};

const PageLayoutForm = (props: Props) => {
  const { isEdit = false, pageLayout, onSubmit } = props;

  const schema = isEdit ? UpdatePageLayoutSchema : NewPageLayoutSchema;

  const defaultValues = useMemo(
    () => ({
      id: pageLayout?.id ?? "",
      title: pageLayout?.title ?? "",
      path: pageLayout?.path ?? "",
      components: pageLayout?.components ?? [],
    }),
    [pageLayout]
  );

  const methods = useForm<IPageLayout>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = methods;

  const components = watch("components") || [];

  const handleComponents = (data: IComponent[]) => {
    const updated = data.map((component) => ({
      ...component,
      id: component.id || nanoid(),
    }));
    setValue("components", updated);
  };

  useEffect(() => {
    if (pageLayout) {
      setValue("id", pageLayout.id ?? "");
      setValue("title", pageLayout.title ?? "");
      setValue("path", pageLayout.path ?? "");
      setValue("components", pageLayout.components ?? []);
    }
  }, [pageLayout, setValue, isEdit]);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">
          {isEdit ? "Edit" : "Add"} Page Layout
        </Typography>
        <Stack spacing={2} sx={{ mx: "auto", mt: 2 }}>
          {isEdit && (
            <RHFTextField
              name="id"
              placeholder="Id"
              label="Id"
              helperText={errors.id && errors.id.message}
              disabled
            />
          )}
          <RHFTextField
            name="title"
            placeholder="Title"
            label="Title"
            helperText={errors.title && errors.title.message}
          />
          <RHFTextField
            name="path"
            placeholder="Path"
            label="Path"
            helperText={errors.path && errors.path.message}
            disabled={isEdit}
          />
        </Stack>

        <PageLayoutBuilder
          components={components}
          handleComponents={handleComponents}
          isEdit={isEdit}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={components.length == 0}
        >
          Submit
        </Button>
      </FormProvider>
    </>
  );
};

export default PageLayoutForm;
