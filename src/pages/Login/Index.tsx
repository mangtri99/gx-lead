import Logo from "../../assets/logo.svg";
import Login from "../../assets/login.png";
import "./Login.style.scss";
import useLoginFormState from "./_hooks/useLoginFormState";
import TextInput from "../../components/TextInput";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Index() {
  const [tooglePassword, setTooglePassword] = useState(false);
  const { form, onSubmit } = useLoginFormState();

  return (
    <div className="bg-white p-4 h-screen overflow-hidden">
      <div className="row h-full">
        <div className="col-lg-5 col-12 d-flex flex-column justify-content-center align-items-center h-full position-relative">
          {/* Form */}
          <div className="card-login">
            <div className="logo">
              <img src={Logo} alt="logo" />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center w-100 h-full">
              <form className="w-100" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <h1 className="title">
                    Welcome to{" "}
                    <span className="fw-bold text-black">GX APP</span>
                  </h1>
                  <h2 className="subtitle">Sign in to your account below</h2>
                </div>
                <div className="mb-3">
                  <TextInput
                    {...form.register("email")}
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="e.g. arbi@globalxtreme.net"
                    error={form.formState.errors.email ? true : false}
                    message={form.formState.errors.email?.message}
                  />
                </div>
                <div className="mb-3">
                  <div className="position-relative">
                    <TextInput
                      {...form.register("password")}
                      id="password"
                      type={tooglePassword ? "text" : "password"}
                      label="Password"
                      placeholder="*********"
                      error={form.formState.errors.password ? true : false}
                      message={form.formState.errors.password?.message}
                    />

                    <button
                      onClick={() => setTooglePassword(!tooglePassword)}
                      type="button"
                      className="position-absolute"
                      style={{
                        right: "10px",
                        top: "30px",
                      }}
                    >
                      {tooglePassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
                <div className="form-check mb-5">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="1"
                    id="remember"
                  />
                  <label htmlFor="remember" className="form-check-label fs-12">
                    Keep Me Signed In
                  </label>
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-warning w-100">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="copyright w-100 px-lg-4 px-0">
            <div className="border-top w-100 d-block d-lg-flex justify-content-between align-items-center pb-lg-4 pt-4 pb-0">
              <p>
                © 2023 <span className="fw-medium">GX ONE</span> - Committed to
                better quality
              </p>
              <p>Design & Development By GlobalXtreme</p>
            </div>
          </div>
        </div>
        <div className="col-lg-7 d-none d-lg-flex flex-column h-full">
          <img
            className="object-cover w-100 h-full rounded-4"
            src={Login}
            alt="login"
          />
        </div>
      </div>
    </div>
  );
}
