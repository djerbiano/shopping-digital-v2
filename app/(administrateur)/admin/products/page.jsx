"use client";
import { useState, useEffect } from "react";
import styles from "../../admin.module.css";
import productsStyles from "../../_components/ProductsComponent/productsComponent.module.css";
import { useRouter } from "next/navigation";
import UpdateBtn from "../../_components/reusable/updateBtn";
import Pagination from "../../_components/DashboardComponent/Pagination";
import AddProduct from "../../_components/ProductsComponent/AddProduct";
import toast from "react-hot-toast";

export default function Products() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [showAddProductComponent, setShowAddProductComponent] = useState(false);
  const [products, setProducts] = useState([]);
  const [limitProducts, setLimitProducts] = useState(5);
  const [page, setPage] = useState(1);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [category, setCategory] = useState({
    selectedCategory: "",
  });
  const [filtersAdvanced, setFiltersAdvanced] = useState({
    isOnSale: false,
    isTopSeller: false,
    isNewCollection: false,
    isLimitedEdition: false,
    outOfStock: false,
  });
  const filterLabels = {
    isOnSale: "En promotion",
    isTopSeller: "Top ventes",
    isNewCollection: "Nouvelle collection",
    isLimitedEdition: "Édition limitée",
    outOfStock: "En rupture de stock",
  };
  const categories = ["Homme", "Femme", "Informatique", "TvSon", "Téléphonie"];
  const fetchProducts = async () => {
    const queryProducts = {};

    if (category.selectedCategory !== "") queryProducts.category = category.selectedCategory;

    const validStatuses = ["Homme", "Femme", "Informatique", "TvSon", "Téléphonie"];
    if (category.selectedCategory !== "" && validStatuses.includes(category.selectedCategory)) {
      queryProducts.category = category.selectedCategory;
    }
    if (filtersAdvanced.isOnSale) queryProducts.isOnSale = filtersAdvanced.isOnSale;
    if (filtersAdvanced.isTopSeller) queryProducts.isTopSeller = filtersAdvanced.isTopSeller;
    if (filtersAdvanced.isNewCollection) queryProducts.isNewCollection = filtersAdvanced.isNewCollection;
    if (filtersAdvanced.isLimitedEdition) queryProducts.isLimitedEdition = filtersAdvanced.isLimitedEdition;
    if (filtersAdvanced.outOfStock) queryProducts.stock = !filtersAdvanced.outOfStock;

    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limitProducts", limitProducts);

    if (Object.keys(queryProducts).length > 0) {
      params.set("queryProducts", JSON.stringify(queryProducts));
    }

    const endpoint = `/api/admin/products?${params.toString()}`;

    try {
      setLoadingProducts(true);
      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Produits chargés");
        setProducts(data);
      } else {
        setError(data?.message);
        toast.error(data?.message || "Une erreur est survenue lors de la récupération des produits");
        console.error(data?.message || "Erreur lors de la récupération des commandes");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    setError(null);
    fetchProducts();
  }, [category, filtersAdvanced, page, limitProducts]);

  const [showFilter, setShowFilter] = useState(false);

  const handleFilterChange = (key) => {
    setFiltersAdvanced((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setShowFilter(false);
    setPage(1);
  };

  const handleProductClick = (id) => {
    router.push(`/admin/products/${id}`);
  };
  if (loadingProducts) {
    return (
      <section aria-labelledby="section-products" className={styles.adminContent}>
        <h3 id="section-products">Produits</h3>
        <p>Chargement des produits...</p>
      </section>
    );
  }

  return (
    <>
      {showAddProductComponent ? (
        <AddProduct setShowAddProductComponent={setShowAddProductComponent} categories={categories} onClose={() => {
          setShowAddProductComponent(false);
          fetchProducts();
        }} />
      ) : (
        <section aria-labelledby="section-products" className={styles.adminContent}>
          <h3 id="section-products">Produits</h3>

          <div className={productsStyles.actionsRow}>
            <div className={productsStyles.rightActions}>
              <button onClick={() => setShowAddProductComponent(true)}>Ajouter un produit</button>
            </div>
          </div>

          <div className={productsStyles.filterRow}>
            <label htmlFor="category" className={styles.srOnly}>
              Filtrer par catégorie :
            </label>
            <select
              id="category"
              name="category"
              value={category.selectedCategory}
              onChange={(e) => {
                setCategory({ selectedCategory: e.target.value });
                setPage(1);
              }}
            >
              <option value="">Toutes catégories</option>
              {categories?.map((cat) => (
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
                  {Object.keys(filtersAdvanced).map((key) => (
                    <label key={key}>
                      <input type="checkbox" checked={filtersAdvanced[key]} onChange={() => handleFilterChange(key)} />
                      {filterLabels[key]}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <label htmlFor="limitProducts" aria-hidden="true">
              Nombre de produits par page
            </label>
            <select
              name="limitProducts"
              id="limitProducts"
              value={limitProducts}
              aria-label="Nombre de commandes par page"
              className={productsStyles.productsSelect}
              onChange={(e) => {
                setPage(1);
                setLimitProducts(e.target.value);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
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
              {products?.products?.length <= 0 ? (
                <tr>
                  <td colSpan="9">Aucun produit trouvé</td>
                </tr>
              ) : (
                products?.products?.map((product) => (
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
                ))
              )}
            </tbody>
          </table>
          {error && <p>{error}</p>}
          {products?.products?.length > 0 && (
            <Pagination pagination={products?.pagination} currentPage={page} onPageChange={setPage} />
          )}
        </section>
      )}
    </>
  );
}
