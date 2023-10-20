import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateLabel } from "@/hooks/labels.hooks";
import { LabeledInput } from "@/sharers/form";
import { LoadingButton } from "@/sharers/other";
import { setRequired } from "@/validation";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValues {
  name: string;
}

export function LabelCreateDialog({ open, setOpen }: Prop) {
  const form = useForm<FormValues>();
  const { formState, register, handleSubmit, reset } = form;
  const { errors, isDirty, isValid } = formState;

  const { toast } = useToast();

  const createLabelMutation = useCreateLabel();

  const onSubmit = async (values: FormValues) => {
    //@ts-ignore
    await createLabelMutation.mutateAsync(values, {
      onSuccess: () => {
        toast({
          title: "Successfully create a contact!",
        });
        reset();
        setOpen(false);
      },
      onError: (error) => {
        toast({
          //@ts-ignore
          title: error?.response?.data.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Label</DialogTitle>
          <DialogDescription>
            Create your label here. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <LabeledInput
            id="name"
            type="name"
            placeholder="example name"
            label="Name"
            isError={errors.name}
            error={errors.name?.message}
            {...register("name", {
              required: setRequired("Name is required"),
            })}
          />
          <DialogFooter className="space-x-[100px] justify-start">
            <LoadingButton
              type="submit"
              disabled={isDirty && !isValid}
              loading={createLabelMutation.isLoading}
            >
              Create
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
