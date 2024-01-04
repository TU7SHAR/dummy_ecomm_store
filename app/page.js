"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "./(components)/Card";
import Navbar from "./(components)/Navbar";

export default function Home() {
  const router = useRouter();
  let [products, setProducts] = useState([]);
  let [product1, setProduct1] = useState([]);
  let [cartItems, setCartItems] = useState(0);
  let [cartVal, setCartVal] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const cartItems = localStorage.getItem("cartItems");
    const cartProducts = localStorage.getItem("cartProducts");
    const cartVal = localStorage.getItem("cartVal");
    if (!token) {
      router.push("/Login?callbackUrl=/");
    } else {
      const fetchProducts = async () => {
        try {
          await fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((data) => {
              setProducts(data.products);
              setProduct1(data.products);
              console.log(data);
            });
        } catch (error) {
          console.log(error);
        }
      };
      fetchProducts();
    }

    if (cartItems) {
      setCartItems(parseInt(cartItems, 10));
    }
    if (cartVal) {
      setCartVal(parseInt(cartVal, 10));
    }
    if (cartProducts) {
      setProducts(JSON.parse(cartProducts));
    }
  }, [router]);

  const onAddToCart = async (ProductId) => {
    console.log("called");
    const checkProduct = await products.find(
      (product) => product.id === ProductId
    );
    if (checkProduct) {
      await setCartItems((cartItems) => cartItems + 1);
      await setCartVal((cartVal) => cartVal + checkProduct.price);
      await setCartProducts((cartProducts) => [...cartProducts, checkProduct]);
      await localStorage.setItem("cartItems", cartItems.toString());
      await localStorage.setItem("cartVal", cartVal.toString());
      await localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  };

  let sortProducts = (sortBy) => {
    let sortedProducts;
    switch (sortBy) {
      case "lth":
        sortedProducts = [...products].sort((a, b) => a.price - b.price);
        break;
      case "htl":
        sortedProducts = [...products].sort((a, b) => b.price - a.price);
        break;
      case "def":
        sortedProducts = [...product1];
        break;
      default:
        sortedProducts = [...products];
    }
    setProducts(sortedProducts);
  };

  const onSearch = (search) => {
    if (search !== "") {
      console.log("inside search");
      const updateProducts = product1.filter((product) => {
        return (
          product.title.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search)
        );
      });
      setProducts(updateProducts);
    } else {
      setProducts(product1);
    }
  };

  const handleSearch = (event) => {
    let value = event.target.value;
    setSearch(value);
    onSearch(search);
  };

  return (
    <>
      <Navbar cartVal={cartVal} cartItems={cartItems} />
      <div className="form-control flex md:flex-row  space-x-2 md:items-center ">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered max-w-[90vw] md:ml-[4rem] ml-[1rem] my-2  md:w-auto border border-dashed border-[#b5b20a] focus:outline-none focus:border-[#b5b20a] focus:border-dashed"
          value={search}
          onChange={handleSearch}
        />
        <button
          className="btn btn-active btn-ghost md:mb-0 md:mt-0 mt-4 mb-2"
          onClick={() => sortProducts("lth")}
        >
          Low to High
        </button>
        <button
          className="btn btn-active btn-ghost md:mb-0 mb-2"
          onClick={() => sortProducts("def")}
        >
          Default
        </button>
        <button
          className="btn btn-active btn-ghost md:mb-0 mb-2"
          onClick={() => sortProducts("htl")}
        >
          High to Low
        </button>
      </div>
      <div className="flex space-y-5 space-x-4 max-w-[100vw] justify-evenly items-center flex-wrap">
        {Array.isArray(products) &&
          products.map((product) => (
            <Card
              key={product.id}
              product={product}
              onAddToCart={() => onAddToCart(product.id)}
            />
          ))}
      </div>
    </>
  );
}
