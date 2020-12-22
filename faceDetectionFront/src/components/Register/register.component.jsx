import React, { useState } from "react";

const RegisterForm = ({ onRouteChange, loadUser }) => {
  const [emailInput, setemailInput] = useState("");
  const [passwordInput, setpasswordInput] = useState("");
  const [nameInput, setnameInput] = useState("");

  const onEmailChange = (e) => {
    setemailInput(e.target.value);
  };

  const onPasswordChange = (e) => {
    setpasswordInput(e.target.value);
  };

  const onNameChange = (e) => {
    setnameInput(e.target.value);
  };
  const onSubmitRegister = () => {
    fetch("http://localhost:3001/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        name: nameInput,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          console.log(user);
          onRouteChange("home");
          loadUser(user);
        }
      });
  };

  return (
    <>
      <article className="br3 ba  b--black-10  w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={onNameChange}
                  required
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                  onChange={onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={onSubmitRegister}
              />
            </div>
            <div className="lh-copy mt3"></div>
          </div>
        </main>
      </article>
    </>
  );
};

export default RegisterForm;
