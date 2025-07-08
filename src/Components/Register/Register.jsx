import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import registerlottie from "../../assets/register.json";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { baseUrl } from "../../URL/baseUrl";
const Register = () => {
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const { signInWithGoogle, setUser, signUpWithEmailPass, updateUser } =
    useContext(AuthContext);
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

  // sign up
  const handleSignUpBtn = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const pass = form.password.value;
    const photo = form.photo.value;
    const role = form.role.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(pass)) {
      setErrorText(
        "Password must be at least 6 characters long and contain both uppercase and lowercase letters."
      );
      return;
    }

    // proceed with Firebase signup
    signUpWithEmailPass(email, pass)
      .then((result) => {
        const user = result.user;
        const updatedUser = { displayName: name, photoURL: photo };
        updateUser(updatedUser).then(() => {
          const newUser = { name, email, role, photo };

          // Axios post
          axios
            .post(`${baseUrl}/users`, newUser)
            .then((res) => {
              if (res.data.insertedId) {
                setUser({ ...user, role });
                navigate("/");
              } else {
                setErrorText("User creation failed in DB");
              }
            })
            .catch((err) => {
              console.error("DB error:", err.message);
              setErrorText("Error saving user to database");
            });
        });
      })
      .catch((err) => setErrorText(err.message));
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie
            animationData={registerlottie}
            style={{ height: 200 }}
          ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold">Register now!</h1>
            <form onSubmit={handleSignUpBtn} className="fieldset">
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Name"
              />
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">PhotoURL</label>
              <input
                name="photo"
                type="text"
                className="input"
                placeholder="PhotoURL"
              />
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />

              <label className="label">Sign up as a</label>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="manager"
                    className="radio "
                    required
                  />
                  <span className="label-text  mr-4">Manager</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    className="radio "
                  />
                  <span className="label-text  mr-4">Customer</span>
                </label>
              </div>

              <div>
                <div>
                  Already have an account? Click here to{" "}
                  <Link to={"/login"} className="link link-hover">
                    login
                  </Link>
                  {errorText ? (
                    <p className="text-xs text-red-500 h-8">{errorText}</p>
                  ) : (
                    <p className="h-8"></p>
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-neutral mt-2">
                Register
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

export default Register;
