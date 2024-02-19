import Logo from "../../assets/images/logo.svg";
import Login from "../../assets/images/login.png";
import "./Login.style.scss";
import useLoginFormState from "./_hooks/useLoginFormState";
import TextInput from "../../components/Input/TextInput";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../composables/useAuth";
import ButtonActionIcon from "../../components/Button/ButtonActionIcon";
import CheckboxInput from "../../components/Input/CheckboxInput";
import Button from "../../components/Button/Button";
import { Helmet } from "react-helmet-async";

export default function Index() {
  const [tooglePassword, setTooglePassword] = useState(false);
  const { form, onSubmit } = useLoginFormState();
  const { user } = useAuth();
  const imgCarousel = [
    {
      id: 1,
      img: Login,
      title: "- Gordon B. Hinckley",
      quote: `"Without hard work, noting grows but weeds."`,
    },
    {
      id: 2,
      img: Login,
      title: "- Gordon B. Hinckley",
      quote: `"Without hard work, noting grows but weeds."`,
    },
    {
      id: 3,
      img: Login,
      title: "- Gordon B. Hinckley",
      quote: `"Without hard work, noting grows but weeds."`,
    },
  ];

  // if already login, redirect to home
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-white p-4 h-screen overflow-hidden">
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="row h-100">
        <div className="col-lg-5 col-12 d-flex flex-column justify-content-center align-items-center h-100 position-relative">
          {/* Form */}
          <div className="card-login">
            <div className="logo">
              <img src={Logo} alt="logo" />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
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
                      message={form.formState.errors.password?.message}
                    />

                    <ButtonActionIcon
                      className="position-absolute"
                      onClick={() => setTooglePassword(!tooglePassword)}
                      style={{
                        right: "10px",
                        top: "27px",
                      }}
                    >
                      {tooglePassword ? <FaEye /> : <FaEyeSlash />}
                    </ButtonActionIcon>
                  </div>
                </div>
                <div className="mb-5">
                  <CheckboxInput value="1" id="remember" label="Keep Me Signed In"/>
                </div>
                <div className="mb-3">
                  <Button type="submit" className="w-100">Sign In</Button>
                </div>
              </form>
            </div>
          </div>
          <div className="copyright w-100 px-lg-4 px-0">
            <div className="border-top w-100 d-block d-md-flex justify-content-between align-items-center pb-lg-4 pt-4 pb-0">
              <p>
                © 2023 <span className="fw-medium">GX ONE</span> - Committed to
                better quality
              </p>
              <p>Design & Development By GlobalXtreme</p>
            </div>
          </div>
        </div>
        <div className="col-lg-7 d-none d-lg-flex flex-column h-100 position-relative">
          <div
            id="carouselExampleIndicators"
            className="carousel slide h-100 rounded-4"
          >
            <div className="carousel-indicators">
              {imgCarousel.map((_item, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  className={`${index === 0 ? "active" : ""} mx-0`}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner h-100 rounded-4">
              {imgCarousel.map((item, index) => (
                <div
                  key={index}
                  className={`carousel-item rounded-4 h-100 position-relative ${
                    index === 0 ? "active" : ""
                  }`}
                >
                  <img
                    className="image-quote rounded-4"
                    src={item.img}
                    alt="image"
                  />
                  <div className="quote-wrapper">
                    <p className="text-white mb-2">{item.title}</p>
                    <blockquote className="quote">{item.quote}</blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
