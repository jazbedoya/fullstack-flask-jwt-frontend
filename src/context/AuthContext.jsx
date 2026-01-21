


import { createContext, useState } from "react";; //un contexto es como una caja global donde guardo los datos que todos los componentes pueden usar

export const AuthContext = createContext() //Contexto de autenticacion


//Un provider es un componente especial que envuelve a otros componentes y le da acceso al contexto
export const AuthProvider= ({children}) => {
    const [token, setToken ] = useState(localStorage.getItem("token")); //Busca si hay un token guardado en el navegador , sirve para mantener la sesion al actualizar



//se ejecuta cuando se hace el login correctamente
const login =(token)=>{
    localStorage.setItem("token",token); //Se guarda el token en el localStrorage
    setToken(token); //actualiza el setToken y se renderiza la app
};

//cuando el usuario hace logout
const logout= ()=> {
    localStorage.removeItem("token"); //se elimina el token 
    setToken(null); //limpia el estado de react , la app vuelve al estado no autenticado
};


//AuthContext.Provider = provee los datos a toda la app, ({token, login, logout) esto es lo que otros componentes pueden usar,  
//{children} renderiza toda la app
return(
    <AuthContext.Provider value= {{token, login, logout}}>  
       
        {children} 

    </AuthContext.Provider>
);

};






