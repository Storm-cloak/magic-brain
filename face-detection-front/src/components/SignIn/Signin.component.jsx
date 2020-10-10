import React, { useState } from "react";

const SignInForm = ({ onRouteChange, loadUser }) => {
  const [emailInput, setemailInput] = useState("");
  const [passwordInput, setpasswordInput] = useState("");
  const [flag, setFlag] = useState(1);
  const onEmailChange = (e) => {
    setemailInput(e.target.value);
  };

  const onPasswordChange = (e) => {
    setpasswordInput(e.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3001/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          setFlag(1);
          loadUser(user);
          onRouteChange("home");
        } else {
          setFlag(0);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <article className="br3 ba  b--black-10  w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
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
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 w-25 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={onSubmitSignIn}
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
        {flag ? null : (
          <div className="flex items-center justify-center pa1">
            <svg className="w1" data-icon="info" viewBox="0 0 32 32">
              <title>info icon</title>
              <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
            </svg>
            <span className="lh-title ml3">Invalid password or email.</span>
          </div>
        )}
      </article>
    </>
  );
};

export default SignInForm;
