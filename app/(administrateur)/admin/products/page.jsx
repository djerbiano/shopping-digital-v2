"use client";
import { useState } from "react";
import styles from "../../admin.module.css";
import productsStyles from "../../_components/ProductsComponent/productsComponent.module.css";
import { CiSettings } from "react-icons/ci";
import { useRouter } from "next/navigation";
import UpdateBtn from "../../_components/reusable/updateBtn";

const fakeProducts = [
  {
    description: {
      desc1: "lkjh321",
      desc2: "kjh",
      desc3: "lkjhg",
    },
    pictures: {
      pic1: "51402954491703124265602.jpg",
      pic2: "22797950221703124265603.jpg",
      pic3: "21057499111703124265603.jpg",
    },
    _id: "65839d29e1ba5c02dc66379d",
    title: "lg tv",
    regularPrice: 10,
    isOnSale: true,
    salePrice: 1000,
    isTopSeller: true,
    isNewCollection: false,
    isLimitedEdition: true,
    category: "TvSon",
    stock: false,
    colors: [
      {
        color: "black",
        sizes: [
          {
            size: "50",
            quantity: 3,
            _id: "65839d29e1ba5c02dc66379f",
          },
        ],
        _id: "65839d29e1ba5c02dc66379e",
      },
    ],
    createdAt: "2023-12-21T02:04:25.608Z",
    updatedAt: "2024-10-20T20:14:18.877Z",
    __v: 0,
  },
  {
    description: {
      desc1:
        "Ne vous imposez plus aucune limite ! S'inspirant de la découverte de l'imposant trou noir baptisé Sagittarius A, le Raider GE78 HX 13V est là pour rendre possible tout ce que vous pensiez impossible",
      desc2: "Intel Core i7 13700HX de 13th generation",
      desc3: "Nvidia RTX4070 8GB",
    },
    pictures: {
      pic1: "MSI_Raider_GE68HX1703392218893.jpg",
      pic2: "MSI_Raider_GE68HX21703392218897.jpg",
      pic3: "MSI_Raider_GE68HX31703392218909.jpg",
    },
    _id: "6587b3daf47cf256dd5b6fb9",
    title: "Ordinateur Portable Gaming MSI Raider GE68HX ",
    regularPrice: 3299,
    isOnSale: true,
    salePrice: 200,
    isTopSeller: true,
    isNewCollection: false,
    isLimitedEdition: false,
    category: "Informatique",
    stock: false,
    colors: [
      {
        color: "black",
        sizes: [
          {
            size: '15"',
            quantity: 78,
            _id: "6587b3daf47cf256dd5b6fbb",
          },
        ],
        _id: "6587b3daf47cf256dd5b6fba",
      },
    ],
    createdAt: "2023-12-24T04:30:18.946Z",
    updatedAt: "2024-12-05T04:44:50.878Z",
    __v: 0,
  },
  {
    description: {
      desc1: "Aluminium avec dos en verre Sonnerie/Silencieux",
      desc2: "Puce A15 Bionic avec GPU 5 cœurs",
      desc3: "Double appareil photo  Objectif principal 12 Mpx | Ultra grand‑angle",
    },
    pictures: {
      pic1: "iphone-14-finish-select-202209-6-1inch-blue1703392452589.jpg",
      pic2: "iphone-14-finish-select-202209-6-1inch-blue_AV1_GEO_EMEA1703392452590.jpg",
      pic3: "iphone-14-finish-select-202209-6-1inch-blue_AV21703392452591.jpg",
    },
    _id: "6587b4c4f47cf256dd5b6fef",
    title: "Apple iPhone 14128 Go",
    regularPrice: 699,
    isOnSale: false,
    salePrice: null,
    isTopSeller: false,
    isNewCollection: false,
    isLimitedEdition: true,
    category: "Téléphonie",
    stock: true,
    colors: [
      {
        color: "Bleu",
        sizes: [
          {
            size: '7"',
            quantity: 978,
            _id: "6587b4c4f47cf256dd5b6ff1",
          },
        ],
        _id: "6587b4c4f47cf256dd5b6ff0",
      },
    ],
    createdAt: "2023-12-24T04:34:12.648Z",
    updatedAt: "2024-12-05T04:44:51.069Z",
    __v: 0,
  },
  {
    description: {
      desc1:
        "Notre puce la plus puissante jamais embarquée sur Apple Watch. Une nouvelle façon d’interagir avec votre Apple Watch comme par magie, sans toucher l’écran",
      desc2:
        "La puce Apple sur mesure de l’Apple Watch Series 9 lui donne des ailes en termes de performances, d’intuitivité et de rapidité",
      desc3: "Les gestes facilitent l’utilisation de l’Apple Watch, en particulier lorsque vous avez les mains prises",
    },
    pictures: {
      pic1: "Apple-Watch-Series-9-GPS31703392765383.jpg",
      pic2: "Apple-Watch-Series-9-GPS21703392765383.jpg",
      pic3: "Apple-Watch-Series-9-GPS1703392765383.jpg",
    },
    _id: "6587b5fdf47cf256dd5b7002",
    title: "Montre connectée Apple watch Serie 9",
    regularPrice: 599,
    isOnSale: true,
    salePrice: 450,
    isTopSeller: true,
    isNewCollection: true,
    isLimitedEdition: true,
    category: "ObjetsConnectés",
    stock: true,
    colors: [
      {
        color: "Black",
        sizes: [
          {
            size: '3"',
            quantity: 874,
            _id: "6587b5fdf47cf256dd5b7004",
          },
        ],
        _id: "6587b5fdf47cf256dd5b7003",
      },
    ],
    createdAt: "2023-12-24T04:39:25.397Z",
    updatedAt: "2025-04-28T14:31:09.891Z",
    __v: 0,
  },
  {
    description: {
      desc1: "Composition: 100% polyester",
      desc2: "Col: Col doublé",
      desc3: "Motif / Couleur: Couleur unie",
    },
    pictures: {
      pic1: "3eda46ff106e4e29b31e4f5dcc2b63d61703393155732.jpg",
      pic2: "68b0e7a14eb441cd8ad5ea44fc0ffea21703393155744.jpg",
      pic3: "d7eb0552b62449c9b2df4f426cb158651703393155763.jpg",
    },
    _id: "6587b783f47cf256dd5b7019",
    title: "Doudoune HIGH PILE NUPTSE",
    regularPrice: 350,
    isOnSale: true,
    salePrice: 279,
    isTopSeller: true,
    isNewCollection: true,
    isLimitedEdition: true,
    category: "Homme",
    stock: true,
    colors: [
      {
        color: "Bleu sarcelle",
        sizes: [
          {
            size: "L",
            quantity: 997,
            _id: "6587b783f47cf256dd5b701b",
          },
        ],
        _id: "6587b783f47cf256dd5b701a",
      },
    ],
    createdAt: "2023-12-24T04:45:55.800Z",
    updatedAt: "2024-12-05T04:44:51.259Z",
    __v: 0,
  },
  {
    description: {
      desc1: "Un design élégant et de la mode vous rendre plus attractive",
      desc2: "Matériel Décontracté: Motif fausse fourrure",
      desc3: "fausse fourrure à capuchon Automne Hiver chaud Pardessus Gris",
    },
    pictures: {
      pic1: "femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.jpg",
      pic2: "femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu_(1)1703393484710.jpg",
      pic3: "femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu_(2)1703393484745.jpg",
    },
    _id: "6587b8ccf47cf256dd5b7072",
    title: "Manteau en fausse fourrure à capuchon",
    regularPrice: 150,
    isOnSale: true,
    salePrice: 100,
    isTopSeller: true,
    isNewCollection: false,
    isLimitedEdition: true,
    category: "Femme",
    stock: true,
    colors: [
      {
        color: "Gris",
        sizes: [
          {
            size: "S",
            quantity: 994,
            _id: "6587b8ccf47cf256dd5b7074",
          },
        ],
        _id: "6587b8ccf47cf256dd5b7073",
      },
    ],
    createdAt: "2023-12-24T04:51:24.765Z",
    updatedAt: "2024-10-21T13:28:25.749Z",
    __v: 0,
  },
  {
    description: {
      desc1: "Louis Vuitton by Nicolas Ghesquière, Robe Droite en Coton à Manches Ballon",
      desc2: "Robe droite en coton blanc imprimé",
      desc3: "Encolure bateau et ceinture amovible en cuir à nouer",
    },
    pictures: {
      pic1: "5b888fe3fe83065167bf0400d2001703393847545.jpg",
      pic2: "8e3ca5dab3bd29d0e2d4708b81391703393847557.jpg",
      pic3: "38ff00d80fbe8f98a3d882a20f311703393847565.jpg",
    },
    _id: "6587ba37f47cf256dd5b7099",
    title: "Robe Droite en Coton Imprimé",
    regularPrice: 527,
    isOnSale: false,
    salePrice: null,
    isTopSeller: true,
    isNewCollection: true,
    isLimitedEdition: true,
    category: "Femme",
    stock: true,
    colors: [
      {
        color: "Blanc",
        sizes: [
          {
            size: "M",
            quantity: 995,
            _id: "6587ba37f47cf256dd5b709b",
          },
        ],
        _id: "6587ba37f47cf256dd5b709a",
      },
    ],
    createdAt: "2023-12-24T04:57:27.584Z",
    updatedAt: "2024-10-11T23:42:25.863Z",
    __v: 0,
  },
  {
    description: {
      desc1: "This bag comes with ReSee authenticity certificate, box, dustbag, lock, clochette and keys",
      desc2: "Beautiful Calke Togo leather",
      desc3: "Hermès Birkin 25",
    },
    pictures: {
      pic1: "78010db50193f5e7c51e603edb321703394145314.jpg",
      pic2: "9320aaec30cc3c24b7c419fd49621703394145331.jpg",
      pic3: "22cf3e0331951edced806b7f5a661703394145344.jpg",
    },
    _id: "6587bb61f47cf256dd5b70e2",
    title: "Hermès sac",
    regularPrice: 2360,
    isOnSale: true,
    salePrice: 2800,
    isTopSeller: false,
    isNewCollection: false,
    isLimitedEdition: false,
    category: "Femme",
    stock: true,
    colors: [
      {
        color: "Blanc",
        sizes: [
          {
            size: "50 cm",
            quantity: 995,
            _id: "6587bb61f47cf256dd5b70e4",
          },
        ],
        _id: "6587bb61f47cf256dd5b70e3",
      },
    ],
    createdAt: "2023-12-24T05:02:25.381Z",
    updatedAt: "2024-10-11T23:42:25.866Z",
    __v: 0,
  },
  {
    description: {
      desc1: "d",
      desc2: "de",
      desc3: "des",
    },
    pictures: {
      pic1: "ss1728339248365.jpg",
      pic2: "ss1728339248365.jpg",
      pic3: "ss1728339248365.jpg",
    },
    _id: "67045d309f133996976ba0bb",
    title: "chemise",
    regularPrice: 10,
    isOnSale: true,
    salePrice: 5,
    isTopSeller: true,
    isNewCollection: true,
    isLimitedEdition: true,
    category: "Homme",
    stock: true,
    colors: [
      {
        color: "bleu",
        sizes: [
          {
            size: "4XL",
            quantity: 10,
            _id: "67045d309f133996976ba0bd",
          },
        ],
        _id: "67045d309f133996976ba0bc",
      },
    ],
    createdAt: "2024-10-07T22:14:08.373Z",
    updatedAt: "2024-10-14T02:41:13.277Z",
    __v: 0,
  },
];

export default function Products() {
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    isOnSale: false,
    isTopSeller: false,
    isNewCollection: false,
    isLimitedEdition: false,
    isOutOfStock: false,
  });
  const filterLabels = {
    isOnSale: "En promotion",
    isTopSeller: "Top ventes",
    isNewCollection: "Nouvelle collection",
    isLimitedEdition: "Édition limitée",
    isOutOfStock: "En rupture de stock",
  };
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = fakeProducts.filter(
    (p) =>
      (!filters.isOnSale || p.isOnSale) &&
      (!filters.isTopSeller || p.isTopSeller) &&
      (!filters.isNewCollection || p.isNewCollection) &&
      (!filters.isLimitedEdition || p.isLimitedEdition) &&
      (!filters.isOutOfStock || !p.stock) &&
      (!selectedCategory || p.category === selectedCategory)
  );

  const handleFilterChange = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleProductClick = (id) => {
    router.push(`/admin/products/${id}`);
  };
  return (
    <section aria-labelledby="section-products" className={styles.adminContent}>
      <h3 id="section-products">Produits</h3>

      <div className={productsStyles.actionsRow}>
        <div className={productsStyles.rightActions}>
          <button>Ajouter un produit</button>
        </div>
      </div>

      <div className={productsStyles.filterRow}>
        <label htmlFor="categoryFilter" className={styles.srOnly}>
          Filtrer par catégorie :
        </label>
        <select
          id="categoryFilter"
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Toutes catégories</option>
          {[...new Set(fakeProducts.map((p) => p.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className={productsStyles.filterDropdown}>
          <button onClick={() => setShowFilter(!showFilter)} className={productsStyles.filterButton}>
            Filtres avancés
          </button>
          {showFilter && (
            <div className={productsStyles.checkboxFilters}>
              {Object.keys(filters).map((key) => (
                <label key={key}>
                  <input type="checkbox" checked={filters[key]} onChange={() => handleFilterChange(key)} />
                  {filterLabels[key]}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <table className={productsStyles.productsTable}>
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Promo</th>
            <th>Prix promo</th>
            <th>Top vente</th>
            <th>Nouvelle collection</th>
            <th>Édition limitée</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td data-label="Catégorie">{product.category}</td>
              <td data-label="Nom">{product.title}</td>
              <td data-label="Prix">{product.regularPrice} €</td>
              <td data-label="Promo">{product.isOnSale ? "✅" : "❌"}</td>
              <td data-label="Prix promo">{product.salePrice ? `${product.salePrice} €` : "-"}</td>
              <td data-label="Top vente">{product.isTopSeller ? "✅" : "❌"}</td>
              <td data-label="Nouvelle collection">{product.isNewCollection ? "✅" : "❌"}</td>
              <td data-label="Édition limitée">{product.isLimitedEdition ? "✅" : "❌"}</td>
              <td data-label="Modifier">
                <UpdateBtn action={() => handleProductClick(product._id)} text="Modifier le produit" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
