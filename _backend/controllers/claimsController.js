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
async function getAllClaimsForAdmin(idAdmin, limitClaims = 5, page = 1, queryClaims = {}) {
  console.log(queryClaims);
  if (!idAdmin) {
    throw createHttpError("idAdmin est requis", 400);
  }

  const admin = await User.findById(idAdmin);
  if (!admin) {
    throw createHttpError("Admin introuvable", 404);
  }

  if (!admin.isAdmin) {
    throw createHttpError("L'utilisateur n'est pas un admin", 403);
  }

  const limit = limitClaims;
  const skip = (page - 1) * limit;
  const query = queryClaims;

  const totalClaims = await Order.countDocuments(query);
  const totalPages = Math.ceil(totalClaims / limit);
  let claims = await Claim.find(query.status ? { status: query.status } : {})
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("order");

  if (query.email) {
    claims = claims.filter((claim) => claim.order && claim.order.email === query.email);
  }

  return {
    claims,
    pagination: {
      totalClaims,
      totalPages,
      currentPage: page,
    },
  };
}
async function getOneClaimForAdmin(idAdmin, claimId) {
  if (!idAdmin || !claimId) {
    throw createHttpError("idAdmin et claimId sont requis", 400);
  }

  const admin = await User.findById(idAdmin);
  if (!admin) {
    throw createHttpError("Admin introuvable", 404);
  }

  if (!admin.isAdmin) {
    throw createHttpError("L'utilisateur n'est pas un admin", 403);
  }

  const claim = await Claim.findById(claimId).populate("order");
  if (!claim) {
    throw createHttpError("Réclamation introuvable", 404);
  }

  return claim;
}

export { addClaim, getAllClaimsForAdmin, getOneClaimForAdmin };
