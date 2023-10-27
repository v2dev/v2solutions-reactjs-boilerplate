import React from "react"
import { json, redirect } from "react-router-dom";
import {
    Form,
    Link,
    useActionData,
    useNavigation,
    useSearchParams,
  } from "react-router-dom";
import API_BASE_URL from "../../configs/apiBaseUrl" // Import the base URL

function AuthenticationPage() {
    const data = useActionData();
    const navigation = useNavigation();
    const [searchParam] = useSearchParams();
    const isLogin = searchParam.get("mode") === "login";
    const isSubmitting = navigation.state === "submitting";
  
    return (
      <>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
              <div className="column is-4-desktop">
                <Form method="post" className="box">
                  <h1 className="text-center">{isLogin ? "Log in" : "Create a new user"}</h1>
                  {data && data.errors && (
                    <ul>
                      {Object.values(data.errors).map((err) => (
                        <li key={err}>{err}</li>
                      ))}
                    </ul>
                  )}
                 
                  <div className="field " style={{display: isLogin ? 'none' : 'block'}}>
                      <label className="label">Name</label>
                      <div className="controls">
                          <input name="name" type="text" className="input form-control" placeholder="Name"  />
                      </div>
                  </div>
                  

                  <div className="field ">
                      <label className="label">Email</label>
                      <div className="controls">
                          <input name="email" type="email" className="input form-control" placeholder="Email"  required/>
                      </div>
                  </div>
                  <div className="field ">
                      <label className="label">Password</label>
                      <div className="controls">
                          <input name="password" type="password" className="input form-control" placeholder="******"  required/>
                      </div>
                  </div>
                  <div className="field mt-3">
                        
                        <button disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                        <Link  className="ms-3"  to={`?mode=${isLogin ? "register" : "login"}`}>
                          {isLogin ? "Create new user" : "Go to Login"}
                        </Link>
                  </div>
                </Form>
              </div>
          </div>
        </div>
      </div>
      </>
    );
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParam = new URL(request.url).searchParams;
  const mode = searchParam.get("mode") || "register";
  const data = await request.formData();
  
  if (mode !== "login" && mode !== "register") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }
  // let authData = {
  //   email: data.get("email"),
  //   password: data.get("password"),
  //   name: data.get("name"),
  // };
  // if(mode=="login"){
    const authData = {
      email: data.get("email"),
      password: data.get("password"),
    };
  // }
  const response = await fetch(API_BASE_URL+"/"+ mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  if (response.status === 422 || response.status === 402 || response.status === 500) {
    return response;
  }
  // if (!response.ok) {
  //   throw json({ message: "Could not authenticate user." }, { status: 500 });
  // }
  if (response.status === 200) {
    return response;
  }
  
}
