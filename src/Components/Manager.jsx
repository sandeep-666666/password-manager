import React from "react";
import { useState, useEffect, useRef } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setpasswordArray(passwords);
  };
  useEffect(() => {
    getPasswords();
  }, []);

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      //if any such id exists in the database delete it
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      // localStorage.setItem(
      //   "password",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );

      // console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
      toast("Password saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      toast(`Error:password not saved!`);
    }
  };
  const deletePassword = async (id) => {
    console.log("deleting password with id" + " " + id);
    let c = confirm("do you really want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem(
      //   "password",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast("Password Deleted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  const editPassword = (id) => {
    console.log("editing with id" + " " + id);
    setform({ ...passwordArray.filter((item) => item.id === id)[0], id: id });
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
    toast("Edited Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const passwordref = useRef();

  const copyText = (text) => {
    toast("copied to clip board", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="md:mycontainer px-2 p-3 md:px-0 p-2 md:p-0">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
          />
          <div className="flex w-full justify-between gap-8 md:flex-row flex-col">
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter User name"
            />
            <div className="relative">
              <input
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                ref={passwordref}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
              <span
                className="absolute right-1 cursor-pointer"
                onClick={() => setshowPassword(!showPassword)}
              >
                {showPassword ? (
                  <lord-icon
                    src="https://cdn.lordicon.com/dicvhxpz.json"
                    trigger="hover"
                    colors="primary:#242424,secondary:#08a88a"
                  ></lord-icon>
                ) : (
                  <lord-icon
                    src="https://cdn.lordicon.com/snxksidl.json"
                    trigger="hover"
                    colors="primary:#242424,secondary:#08a88a"
                  ></lord-icon>
                )}
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center gap-2 items-center bg-green-500 hover:bg-green-700 rounded-full px-4 py-2 w-fit border border-green-900 transition-all duration-200"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              colors="primary:#242424,secondary:#08a88a"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div>No Passwords to show</div>
          ) : (
            <table className="table-auto w-full rounded-md overflow-hidden mb-4">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">User Name</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td
                      className="lordiconcopy text-center w-32 py-2 border border-white flex items-center justify-center"
                      onClick={() => {
                        copyText(item.site);
                      }}
                    >
                      <a href={item.site} target="_blank">
                        {item.site}
                      </a>
                      <lord-icon
                        className="cursor-pointer w-6"
                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                        trigger="hover"
                      ></lord-icon>
                    </td>

                    <td
                      className="lordiconcopy text-center w-32 py-2 border border-white"
                      onClick={() => {
                        copyText(item.username);
                      }}
                    >
                      {item.username}
                      <lord-icon
                        className="cursor-pointer w-6"
                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                        trigger="hover"
                      ></lord-icon>
                    </td>
                    <td
                      className="lordiconcopy text-center w-32 py-2 border border-white"
                      onClick={() => {
                        copyText(item.password);
                      }}
                    >
                      {"*".repeat(item.password.length)}
                      <lord-icon
                        className="cursor-pointer w-6"
                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                        trigger="hover"
                      ></lord-icon>
                    </td>
                    <td className="lordiconcopy text-center w-32 py-2 border border-white">
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => {
                          editPassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/exymduqj.json"
                          trigger="hover"
                          colors="primary:#242424,secondary:#08a88a"
                        ></lord-icon>
                      </span>
                      <span
                        onClick={() => {
                          deletePassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/hwjcdycb.json"
                          trigger="hover"
                          colors="primary:#242424,secondary:#08a88a"
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
