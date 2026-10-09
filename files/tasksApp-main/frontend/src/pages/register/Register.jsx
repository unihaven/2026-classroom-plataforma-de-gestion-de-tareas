import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { validateRegister } from "../../helpers/validators/user";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import "./register.css";
import DotsLoader from "../../components/dots-loader/DotsLoader";
import { registerUser } from "@/redux/slices/user/user.async.thunks.js";

const Register = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const send = (userData) => {
    dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (user.token) {
      navigate("/projects");
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(validateRegister),
  });

  if (user.loading) return <DotsLoader />;

  return (
    <div className="flex-row--centered">
      <form className="form-login" onSubmit={handleSubmit(send)}>
        <p className="form-title">Sign up to get an account</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />
          <span className="error-message">{errors.name?.message}</span>
        </div>

        <div className="input-container">
          <input
            type="email"
            placeholder="Enter an email address"
            {...register("email")}
          />
          <span className="error-message">{errors.email?.message}</span>
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Enter a password"
            {...register("password")}
          />
          <span className="error-message">{errors.password?.message}</span>
        </div>
        <button type="submit" className="blue-button">
          Sign up
        </button>

        <p className="signup-link">
          Already have an account?
          <Link to="/logIn">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
