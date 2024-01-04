"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  const handleUsername = (event) => {
    let value = event.target.value;
    setUsername(value);
  };
  const handlePassword = (event) => {
    let value = event.target.value;
    setPassword(value);
  };
  const onLogin = async (event) => {
    event.preventDefault();
    console.log("click");
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const response = await res.json();
      if (res.ok) {
        localStorage.setItem("token", response.token);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
        <div className="hero max-w-[100vw] min-h-screen ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                For Full Access Login Now! This is a Dummy Site made Using
                dummyApi as per task by interviewer Default username =
                &quot;kminchelle&quot;, password = &quot;0lelplR&quot;
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="username"
                    className="input input-bordered"
                    value={username}
                    onChange={handleUsername}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    value={password}
                    onChange={handlePassword}
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" onClick={onLogin}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Page;
