import {
  useMemo,
  useState,
  useContext,
  useCallback,
  createContext,
} from "react";
import {
  CustomAlertContextProps,
  ICustomAlertOptions,
} from "../types/custom-alert";
import CustomAlert from "../components/custom-alert/CustomAlert";

// import CustomAlert from '@/components/custom-alert';

// import type { ICustomAlertOptions, CustomAlertContextProps } from '@/types/custom-alert';

export const CustomAlertContext = createContext({} as CustomAlertContextProps);

export const useCustomAlert = () => {
  const context = useContext(CustomAlertContext);

  if (!context) {
    throw new Error("useCustomAlert must be used within a CustomAlertProvider");
  }

  return context;
};

export const CustomAlertProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<ICustomAlertOptions>({});

  const handleOpen = useCallback(
    (titleText: string, alertOptions?: ICustomAlertOptions) => {
      setTitle(titleText);
      setOpen(true);
      if (alertOptions) {
        setOptions(alertOptions);
      }
    },
    []
  );

  const handleClose = () => {
    setOpen(false);
  };

  const memoizedValue = useMemo(
    () => ({ title, customAlert: handleOpen }),
    [title, handleOpen]
  );

  return (
    <CustomAlertContext.Provider value={memoizedValue}>
      {children}
      {open && (
        <CustomAlert
          open={open}
          title={title}
          onClose={handleClose}
          {...options}
        />
      )}
    </CustomAlertContext.Provider>
  );
};
