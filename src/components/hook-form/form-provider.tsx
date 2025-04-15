/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormReturn } from "react-hook-form";
import { FormProvider as Form } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
};

const FormProvider = ({ children, onSubmit, methods }: Props) => (
  <Form {...methods}>
    <form onSubmit={onSubmit}>{children}</form>
  </Form>
);

export default FormProvider;
