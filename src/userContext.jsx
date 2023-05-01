// import React from 'react'
// // @function  UserContext
// export const userContext = React.createContext({ name: '', auth: false });

// // @function  UserProvider
// // Create function to provide UserContext
// export const userProvider = ({ children }) => {
//     const [user, setUser] = React.useState({ name: '', auth: false });
//     // const login = (name) => {
//     //     setUser((user) => ({
//     //         name: name,
//     //         auth: true
//     //     }))
//     // };

//     const logout = () => {
//         setUser((user) => ({
//             name: '',
//             auth: false
//         }))
//     };

//     return (
//         <userContext.Provider value={{ user, login, logout }}>
//             {children}
//         </userContext.Provider>
//     );
// };
