// import { FormProvider, useForm } from "react-hook-form";
// import { IForm, TaskFormSchema } from "../types/task";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Box, Button, Typography } from "@mui/material";
// import CustomTextField from "../components/text-field-comp";
// import Grid from "@mui/material/Grid2";

import { useState } from "react";

// const TaskForm = () => {
//   const FIELDS = [
//     {
//       name: "firstName",
//       label: "First Name",
//     },
//     {
//       name: "lastName",
//       label: "Last Name",
//     },
//     {
//       name: "email",
//       label: "Email",
//     },
//     {
//       name: "address",
//       label: "Address",
//       isAddress: true,
//     },
//     {
//       name: "phoneNumber",
//       label: "Phone Number",
//     },
//   ];
//   const methods = useForm<IForm>({
//     resolver: zodResolver(TaskFormSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       address: "",
//       phoneNumber: "",
//     },
//   });

//   const {
//     handleSubmit,
//     // formState: { errors },
//   } = methods;

//   const onSubmit = (data: IForm) => {
//     console.log(data);
//   };

//   //   console.log(errors);
//   return (
//     <>
//       <FormProvider {...methods}>
//         <Grid sx={{ ml: 10, mr: 10 }}>
//           <Typography variant="h5" textAlign="center">
//             LOGIN FORM
//           </Typography>
//           <Box
//             component="form"
//             autoComplete="off"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             {FIELDS.map((m, i) => (
//               <CustomTextField
//                 key={i}
//                 name={m.name}
//                 label={m.label}
//                 isAddress={m.isAddress}
//               />
//             ))}

//             <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//               <Button variant="contained" type="submit">
//                 SUBMIT
//               </Button>
//             </Box>
//           </Box>
//         </Grid>
//       </FormProvider>
//     </>
//   );
// };

// export default TaskForm;

const TaskForm = () => {
  const [value, setValue] = useState("");
  const FIELDS = [
    {
      name: "firstName",
      label: "First Name",
    },
    {
      name: "lastName",
      label: "Last Name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "address",
      label: "Address",
      isAddress: true,
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
    },
  ];

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
  };
  return (
    <div>
      <h1>Login Form</h1>
      {FIELDS.map((m, i) => (
        <input
          key={i}
          type="text"
          value={value}
          onChange={handleValueChange}
          name={m.name}
          id={m.label}
        />
      ))}
      <button>submit</button>
    </div>
  );
};

export default TaskForm;
