
const API_URL = process.env.REACT_APP_API_URL;
const getHeaders = () => ({
  "Content-Type": "application/json",
});

//Login
export const loginUser = async (email, password) => {
   console.log("API_URL being used:", API_URL);
  const res = await fetch(`${process.env.REACT_APP_API_URL}/v1/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

//Signin
export const registerUser = async (name, email, password) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/v1/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: getHeaders(),
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
};

//Google login
export const googleAuthLogin = async (credential) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/v1/auth/google`, {
    method: "POST",
    credentials: "include",
    headers: getHeaders(),
    body: JSON.stringify({ token: credential }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Google login failed");
  return data;
};

export const logoutUser = async () => {
  await fetch(`${API_URL}/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const checkAuth = async () => {
  const res = await fetch(`${API_URL}/v1/auth/me`, { credentials: "include" });
  return res.ok;
};

//CRUD GENERAL DE LOS TO-DO'S
//GET
export const llamarLista = async () =>{
   try{
    const res = await fetch(`${API_URL}/v1/to-dos`, {
      headers: getHeaders(),
      credentials: "include",
    });
    console.log(res.status);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

//POST
export const createTodo = async (todo) => {
    try {
      const res = await fetch(`${API_URL}/v1/to-dos`, {
        method: 'POST',
        headers: getHeaders(),
        credentials: "include",
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          status: todo.status || "pending",
        })
      });
       return await res.json();
      } catch (error) {
      console.error(error);
    }
  };
//PATCH(description)
  export const actualizar = async (id, updatedTodo) => {
    try {
      const res = await fetch(`${API_URL}/v1/to-dos/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        credentials: "include",
        body: JSON.stringify({
          title: updatedTodo.title,
          description: updatedTodo.description,
          status: updatedTodo.status,
      })
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };
//DELETE
  export const eliminar = async(id)=>{
    try{
      const res = await fetch(`${API_URL}/v1/to-dos/${id}`,{
        method : 'DELETE',
        headers:getHeaders(),
        credentials: "include",
      });
      return res.status;
    } catch (error) {
      console.log(error);
    }
  }
//CRUD DE CALENDARIO

//GET status
export const getCalendarStatus = async () => {
  try {
    const res = await fetch(`${API_URL}/v1/calendar/status`, {
      headers: getHeaders(),
      credentials: "include",
    });
    return await res.json();
  }catch (error) {
    console.error(error);
  }
};
//GET calendar Auth
export const getCalendaraAuthUrl = async () => {
  try {
    const res = await fetch(`${API_URL}/v1/calendar/auth`, {
      headers:getHeaders(),
      credentials: "include",
    });
    return await res.json();
  }catch (error){
    console.error(error);
  }
};
//POST calendar event
export const createCalendarEvent = async (todoId, startDateTime, endDateTime) => {
  try {
    const res = await fetch (`${API_URL}/v1/calendar/event/${todoId}`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: "include",
      body: JSON.stringify({todoId, startDateTime, endDateTime}),
    });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
//PATCH calendar event
export const updateCalendarEvent = async (todoId, startDateTime, endDateTime) => {
  try{
    const res = await fetch(`${API_URL}/v1/calendar/event/${todoId}`, {
      method: 'PATCH',
      headers: getHeaders(),
      credentials: "include",
      body: JSON.stringify({startDateTime, endDateTime}),
    });
    return await res.json();
  } catch (error){
    console.error(error);
  }
};
//DELETE calendar event
export const deleteCalendarEvent = async (todoId) => {
  try{
    const res = await fetch(`${API_URL}/v1/calendar/event/${todoId}`, {
      method: 'DELETE',
      headers: getHeaders(),
      credentials: "include",
    });
    return res.status;
  } catch (error){
    console.error(error);
  }
};