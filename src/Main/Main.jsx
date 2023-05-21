import { useEffect, useState } from "react";
import AllProducts from "./AllProducts";
import CatergoryProducts from "./CatergoryProducts";
import FilterTray from "./FilterTray";

import { getAllProductForCat, addCart } from "../utils";
import FilterProducts from "./FilterProducts";

import { toast } from "react-toastify";

export default function Main({ selectedCatergory }) {
  const [productsOnCatergories, setproductsOnCatergories] = useState([]);
  const [productsOnFilters, setProductsOnFilters] = useState([]);

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

  const addCartCall = () => {
    addCart().then((response) => {
      toast("user created cart with id " + response.id);
    });
  };

  return (
    <>
      <FilterTray setProductsOnFilters={setProductsOnFilters}></FilterTray>
      {productsOnCatergories.length ? (
        <CatergoryProducts
          addCartCall={addCartCall}
          productsOnCatergories={productsOnCatergories}
        ></CatergoryProducts>
      ) : productsOnFilters.length ? (
        <FilterProducts
          addCartCall={addCartCall}
          productsOnFilters={productsOnFilters}
        ></FilterProducts>
      ) : (
        <AllProducts addCartCall={addCartCall}></AllProducts>
      )}
    </>
  );
}
