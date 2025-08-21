import { User } from "../models/Users";
import Order from "../models/Order";
import Claim from "../models/Claims";
import { createHttpError, validateObjectId } from "../utils/helpers";

async function addClaim(claim) {
  const { email, claimInformation, claimMessage } = claim;
  if (!email || !claimInformation || !claimMessage) {
    throw createHttpError("Veuillez remplir tous les champs", 400);
  }

  validateObjectId(claimInformation);

  const existingClaim = await Claim.findOne({ order: claimInformation });
  if (existingClaim) throw createHttpError("Une réclamation existe déja pour cette commande", 400);

  const user = await User.findOne({ email });
  if (!user) throw createHttpError("Utilisateur introuvable", 404);

  if (email !== user.email) throw createHttpError("Vous devez vous connecter pour faire une réclamation", 400);

  const order = await Order.findById(claimInformation);
  if (!order) throw createHttpError("Commande introuvable", 404);

  if (order.email !== email) throw createHttpError("Vous devez être l'auteur de la commande", 400);

  const newClaim = new Claim({
    order: claimInformation,
    messages: [{ userId: user._id, message: claimMessage }],
  });
  const result = await newClaim.save();

  if (!result) throw createHttpError("Une erreur est survenue lors de l'enregistrement de la réclamation", 500);

  return result;
}

export { addClaim };
