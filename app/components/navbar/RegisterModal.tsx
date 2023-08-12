import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import axios from "axios";
import React, { useState } from "react";

interface RegisterModalProps {
  registerStateFunc: (newState: boolean) => void;
  registerState: boolean;
}

interface FormData {
  email_address: string;
  user_name: string;
  password: string;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  registerState,
  registerStateFunc,
}) => {
  const [formData, setFormData] = useState({
    email_address: "",
    user_name: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    SubmitHandler(formData);
  };

  const SubmitHandler = (data: FormData) => {
    console.log("data!!!", data);
    axios
      .post("/api/register", data)
      .then(() => {
        registerStateFunc(!registerState);
        console.log("Successfully imported", data.user_name);
      })
      .catch((err) => {
        console.log("ERROR!!!", err);
        registerStateFunc(!registerState);
      });
  };

  return (
    <div>
      <div className="overflow-y-auto outline-none  flex justify-center items-center inset-x-px inset-y-px fixed overflow-x-hidden overflow-y-hidden z-20 bg-opacity-25 bg-black">
        <div className="p-4 lg:rounded-lg md:rounded-lg bg-white relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 h-full md:h-auto md:h-auto mx-auto my-6">
          <div className="flex flex-col gap-4 lg:mx-6 md:mx-5 mx-5">
            <div className="text-2xl text-center font-bold border-b-2 py-6">
              <div className="cursor-pointer">
                <IoMdClose onClick={() => registerStateFunc(!registerState)} />
              </div>
              Register
            </div>
            <div className="text-2xl font-bold ">Welcome to Airbnb</div>
            <div className="text-neutral-400">Create an account!</div>
            <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
              <input
                name="email_address"
                type="email"
                value={formData.email_address}
                onChange={handleInputChange}
                className="border-[1px] focus:border-blue-500 p-4 rounded-lg "
                placeholder="Email"
              ></input>
              <input
                name="user_name"
                className="p-4 rounded-lg border-[1px]"
                placeholder="Name"
                onChange={handleInputChange}
                value={formData.user_name}
              ></input>
              <input
                name="password"
                className="focus:border-blue-500 p-4 rounded-lg border-[1px]"
                placeholder="Password"
                onChange={handleInputChange}
                value={formData.password}
              ></input>
              <button className="p-4 font-bold text-white rounded-lg bg-rose-500 mb-4">
                Continue
              </button>
            </form>

            <button className="justify-between font-bold p-4 rounded-lg border-[2px] border-black">
              <div className="absolute">
                <FcGoogle size={25} />
              </div>
              <div className=" text-center">Continue with Google</div>
            </button>
            <button className="font-bold p-4 rounded-lg border-[2px] border-black">
              <div className="absolute">
                <BsGithub size={25} />
              </div>
              Continue with Github
            </button>
            <div className="text-center text-neutral-400">
              Already have an account?{" "}
              <span className="text-black cursor-pointer">Log in</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
