import React from "react";
import Image from "next/image";

export default function Card({ product, onAddToCart }) {
  return (
    <>
      <main>
        <div className="card card-compact w-96 bg-base-100 shadow-xl border md:max-w-[100%] max-w-[18rem] border-dashed border-[rgba(225,201,77,0.5)]">
          <figure>
            <img
              src={product.thumbnail}
              className=" h-[250px] w-[350px] md:h-[100%] w-[100%] md:max-h-[10rem] max-h-[10rem]"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.title}</h2>
            <p>{product.description}</p>
            <div className="card-actions md:gap-[0.5rem] gap-1 md:justify-end">
              <button className="btn btn-active btn-ghost">
                ${product.price}
              </button>
              <button className="btn btn-primary">{product.brand}</button>{" "}
              <button className="btn btn-primary" onClick={onAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
