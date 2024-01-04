"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Navbar({ cartVal, cartItems }) {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/Login?callbackUrl=/");
  };

  return (
    <>
      <nav className="flex-0 stciky top-0 md:m-4 m-2 max-w-[100vw] ">
        <div className="navbar bg-zinc-600 md:rounded-xl rounded-lg ">
          <div className="flex-1">
            <Link
              href="/"
              className="btn btn-ghost md:text-4xl text-md tracking-wide font-thin font-mono"
            >
              Tushar Gautam
            </Link>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {cartItems}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">{cartItems} Items</span>
                  <span className="text-info">Subtotal: ${cartVal}</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>{" "}
              </div>
            </div>{" "}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image alt="" height={10} width={10} src="/img.jpg" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
