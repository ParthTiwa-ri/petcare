"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Pet, Prisma } from "@prisma/client";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validation";
import { auth, signIn, signOut } from "@/lib/auth-no-edge";
import bcryt from "bcryptjs";
import { redirect } from "next/navigation";

import { checkAuth } from "@/lib/server-utils";
import { AuthError } from "next-auth";

//---user actions---
export async function signUp(formData: unknown) {
  if (!(formData instanceof FormData)) return { message: "Invalid form data" };
  const formDataEntries = Object.fromEntries(formData.entries());
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success)
    return { message: validatedFormData.error.errors[0].message };
  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcryt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    await signIn("credentials", formData);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { message: "Email already exists" };
    }
    throw error; //for next-js redirect to work
  }
}

export async function logIn(formData: unknown) {
  if (!(formData instanceof FormData)) return { message: "Invalid form data " };
  const authData = Object.fromEntries(formData.entries()); //we can also pass normal form data also
  try {
    await signIn("credentials", authData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials" };
        default:
          return { message: "Something went wrong" };
      }
    }
    throw error; // for next-auth redirect to work
  }
}
export async function logOut() {
  await signOut({ redirectTo: "/" });
}

//--- pet actions ---
export async function addPet(newPet: unknown) {
  //authentication check
  const session = await checkAuth();
  //validation check
  const validatedPet = petFormSchema.safeParse(newPet);
  if (!validatedPet.success) {
    return {
      message: "Invalid data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return { message: "could not find pet" };
  }
}

export async function editPet(petId: unknown, newPetData: unknown) {
  //authentication check
  const session = await auth();
  if (!session?.user) return redirect("/login");
  //validation check
  const validatedPetID = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPetID.success || !validatedPet.success) {
    return {
      message: "Invalid data",
    };
  }
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetID.data,
    },
  });
  if (!pet || pet.userId !== session.user.id) {
    return {
      message: "Not authorized to delete this pet.",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetID.data,
      },
      data: validatedPet.data,
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    return {
      message: `Could not edit pet.`,
    };
  }
}

export async function deletePet(petId: Pet["id"]) {
  //authentication check
  const session = await auth();
  if (!session?.user) return redirect("/login");

  //validaiton check
  const validatedPetID = petIdSchema.safeParse(petId);
  if (!validatedPetID.success) {
    return {
      message: "Invalid data",
    };
  }

  //authorization check
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetID.data,
    },
  });
  if (!pet || pet.userId !== session.user.id) {
    return {
      message: "Not authorized to delete this pet.",
    };
  }
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetID.data,
      },
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return { message: "could not delete pet" };
  }
}
