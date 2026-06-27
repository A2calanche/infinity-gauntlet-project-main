
const API_URL = process.env.REACT_APP_API_URL;
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

//CRUD GENERAL DE LOS TO-DO'S
//GET
export const llamarLista = async () =>{
   try{
    const res = await fetch(`${API_URL}/v1/to-dos`, {
      headers: getHeaders(),
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
    });
    return res.status;
  } catch (error){
    console.error(error);
  }
};