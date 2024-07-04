"use client";

import { useForm } from "react-hook-form";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import { usePetContext } from "@/lib/hooks";

import PetFormButton from "./petFormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PET_IMG } from "@/lib/constants";
import { TPetForm, petFormSchema } from "@/lib/validation";

type PetFormProps = {
  actionType: "edit" | "add";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === "edit"
        ? {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            imageUrl: selectedPet?.imageUrl,
            age: selectedPet?.age,
            notes: selectedPet?.notes,
          }
        : {},
  });

  // const onSubmit: SubmitHandler<PetFormData> = (data: PetFormData) => {
  //   // Ensure age is handled as a number
  //   const formattedData = { ...data, age: Number(data.age) };

  //   reset();
  //   onFormSubmission();

  //   if (actionType === "add") handleAddPet(formattedData);
  //   else {
  //     handleEditPet(selectedPet!.id, formattedData);
  //   }
  // };

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;
        const newPet = getValues();
        newPet.imageUrl = newPet.imageUrl || DEFAULT_PET_IMG;
        if (actionType === "add") {
          await handleAddPet(newPet);
        } else if (actionType === "edit") {
          await handleEditPet(selectedPet!.id, newPet);
        }
        onFormSubmission();
      }}
      className="flex flex-col"
    >
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name")}

            // defaultValue={actionType === "edit" ? selectedPet?.name : ""}
          />
          {errors.name && (
            <p className="text-red-500"> {errors.name.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register("ownerName")} />
          {errors.ownerName && (
            <p className="text-red-500"> {errors.ownerName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="imageUrl" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-red-500"> {errors.imageUrl.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")} />
          {errors.age && <p className="text-red-500"> {errors.age.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            // rows={3}
            // name="notes"
            {...register("notes")}
          />
          {errors.notes && (
            <p className="text-red-500"> {errors.notes.message}</p>
          )}
        </div>
      </div>
      <PetFormButton actionType={actionType} />
    </form>
  );
}
