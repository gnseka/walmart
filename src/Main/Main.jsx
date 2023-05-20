import { useEffect, useState } from "react";
import AllProducts from "./AllProducts";
import CatergoryProducts from "./CatergoryProducts";
import FilterTray from "./FilterTray";

import { getAllProductForCat } from "../utils";
import FilterProducts from "./FilterProducts";

export default function Main({ selectedCatergory }) {
  const [productsOnCatergories, setproductsOnCatergories] = useState([]);
  const [productsOnFilters, setProductsOnFilters] = useState([]);

  console.log(productsOnFilters, "productsOnFilters");

  useEffect(() => {
    if (productsOnFilters.length) {
      setproductsOnCatergories([]);
    }
  }, [productsOnFilters]);

  useEffect(() => {
    if (selectedCatergory) {
      getAllProductForCat(selectedCatergory)
        .then((res) => setproductsOnCatergories(res))
        .catch((err) => console.log(err));
    }
  }, [selectedCatergory]);

  return (
    <>
      <FilterTray setProductsOnFilters={setProductsOnFilters}></FilterTray>
      {productsOnCatergories.length ? (
        <CatergoryProducts
          productsOnCatergories={productsOnCatergories}
        ></CatergoryProducts>
      ) : productsOnFilters.length ? (
        <FilterProducts productsOnFilters={productsOnFilters}></FilterProducts>
      ) : (
        <AllProducts></AllProducts>
      )}
    </>
  );
}
