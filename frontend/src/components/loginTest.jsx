// import React, { useState } from 'react'

// const login = () => {
//     const preName = "Sree"
//     const prePassword = "123456"

//     const [name,setName] = useState("")
//     const [password,setPassword] = useState("")
//     const nameChange = (e) => {
//         if(e.target.value === preName){
//             setName(e.target.value)
//         }else {
//             return
//         }
//     }

//     const passwordChange = (e) => {
//         if(e.target.value === prePassword){
//             setPassword(e.target.value)
//         }else {
//             return
//         }
//     }



//   return (
//     <>
//     <div>login</div>
//     <form >
//         <input onChange={nameChange} type="text"  placeholder='name'/>
//         <input onChange={passwordChange} type="password"  placeholder='password'/>
//     </form>
//     </>
//   )
// }

// export default login