import { NextResponse } from "next/server";
import { handleError } from "../../../../_backend/utils/helpers";
import { createHttpError } from "../../../../_backend/utils/helpers";
import sendMailContact from "../../../../_backend/mails/contactPage";

export async function POST(request) {
  try {
    const data = await request.json();

    const contactData = {
      name: data?.name,
      email: data?.email,
      message: data?.message.trim(),
    };
    if (!contactData.name || !contactData.email || !contactData.message) {
      throw createHttpError("Veuillez remplir tous les champs", 400);
    }
    const result = await sendMailContact(contactData);

    if (!result) {
      return NextResponse.json({ message: "Une erreur est survenue lors de l'envoi du mail" }, { status: 500 });
    }

    const response = NextResponse.json({ message: "Nous vous remercions de votre message" }, { status: 200 });

    return response;
  } catch (error) {
    return handleError(error);
  }
}
