import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateLabel } from "@/hooks/labels.hooks";
import { LabeledInput } from "@/sharers/form";
import { LoadingButton } from "@/sharers/other";
import { setRequired } from "@/validation";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { LabelType } from "@/types/label.types";

interface Prop {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label: LabelType;
}

interface FormValues {
  name: string;
}

export function LabelEditDialog({ label, open, setOpen }: Prop) {
  const form = useForm<FormValues>({
    defaultValues: {
      name: label.name,
    },
  });
  const { formState, register, handleSubmit } = form;
  const { errors, isDirty, isValid } = formState;

  const { toast } = useToast();

  const updateLabelMutation = useUpdateLabel();

  const onSubmit = async (values: FormValues) => {
    //@ts-ignore
    await updateLabelMutation.mutateAsync(
      { id: label._id, values },
      {
        onSuccess: () => {
          toast({
            title: "Successfully edited a label!",
          });
          setOpen(false);
        },
        onError: (error) => {
          toast({
            //@ts-ignore
            title: error?.response?.data.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Label</DialogTitle>
          <DialogDescription>
            Make changes to your label here. Click save when you're done.
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
              loading={updateLabelMutation.isLoading}
            >
              Save
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
