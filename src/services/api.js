const API_URL =  "http://127.0.0.1:5000/api";



//en endpoint estan las diferentes rutas: login, items , external
export async function fetchWithAuth(endpoint){
    const token = localStorage.getItem("token"); //busca el token al hacer login


//se forma la url completa
    const response = await fetch(API_URL+endpoint,{
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token   //Aquí se envía el JWT al backend
        }
    });

    if(!response.ok){
        throw new Error("Error en la peticion");
  
    }


    //data guarda el resultado final, ahora data es un objeyo o array usable
    const data = await response.json();
    return data;


}


