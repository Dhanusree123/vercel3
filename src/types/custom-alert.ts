export type ICustomAlertOptions = {
    onConfirm?: VoidFunction;
    description?: string;
    variant?: 'default' | 'delete' | 'save';
  };
  
  export type CustomAlertValueProps = {
    title: string;
  };
  
  export type CustomAlertContextProps = CustomAlertValueProps & {
    customAlert: (title: string, options?: ICustomAlertOptions) => void;
  };
  