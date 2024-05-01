import { Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input, InputProps } from '../ui/input';
import { Textarea, TextareaProps } from '../ui/textarea';

export type FormTextAreaProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
} & Omit<TextareaProps, 'name'>;

const FormTextArea = <TFormValues extends FieldValues>(props: FormTextAreaProps<TFormValues>) => {
  const { name, control } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel />
          <FormControl>
            <Textarea {...props} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextArea;
