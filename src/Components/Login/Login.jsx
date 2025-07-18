import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import loginlottie from "../../assets/login.json";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { baseUrl } from "../../URL/baseUrl";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const navigate = useNavigate();
  const { signInWithEmailPass, setUser, signInWithGoogle } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  //   login btn handler
  const handleLoginBtn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;

    signInWithEmailPass(email, pass)
      .then((result) => {
        const user = result.user;
        form.reset();
        axios.get(`${baseUrl}/users?email=${email}`).then((res) => {
          // console.log(res);
          const role = res.data.user.role;
          setUser({ ...user, role });
          // console.log(user);
          navigate(`${location.state ? location.state : "/"}`);
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  //   google btn handler
  const handleGoogleBtn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        const email = user.email;
        const name = user.displayName;
        const photo = user.photoURL;

        // 1. Check if user exists in DB
        try {
       
          const res = await axios.get(`${baseUrl}/users?email=${email}`);
          const dbUser = res.data.user;
      
          // 2. If user exists, setUser with role
          if (res.data.exists) {
            setUser({ ...user, role: dbUser.role });
            navigate("/");
          } else {
            // 3. If user does not exist, assign default role (or redirect to role picker page)
            const newUser = {
              name,
              email,
              photo,
              role: "customer",
            };

            const postRes = await axios.post(`${baseUrl}/users`, newUser);
          
            if (postRes.data.insertedId) {
              setUser({ ...user, role: newUser.role });
              navigate("/");
            }
          }
        } catch (error) {
          console.error("Google login error:", error);
          alert("Something went wrong during Google sign in");
        }
      })
      .catch((error) => {
        console.log("Google sign-in error:", error);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie animationData={loginlottie} style={{ height: 250 }}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold">Login now!</h1>
            <form onSubmit={handleLoginBtn} className="fieldset">
              <div className="w-full">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                />
              </div>
              <div className="relative">
                <label className="label">Password</label>
                <input
                  name="pass"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pr-10"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute right-3 bottom-3 text-xl text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div>
                <p>
                  Don't have an account? Click here to{" "}
                  <Link
                    to={"/register"}
                    className="link link-hover text-primary"
                  >
                    register
                  </Link>
                </p>
              </div>
              <button type="submit" className="btn btn-neutral mt-2">
                Login
              </button>
            </form>
            <button
              onClick={handleGoogleBtn}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
