import React, {useState, useEffect} from "react"
import './styles/MainMenu.css'
import { NavLink, useHistory } from "react-router-dom"

function Login() {

    const [errorMessage, setErrorMessage] = useState("")
    const history = useHistory();
    let user = null

    function youGetMe() {
        return 0
        fetch("/getme/")
        .then(res => res.json())
        .then(data => console.log(data))
    }

    function logg(data) {
        fetch("/login/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                userName: data.userName,
                password: data.password_digest
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    useEffect(() => youGetMe(), [])

    
    let [up, setUp] = useState({
        userName: "",
        password: ""
    })

    function handleChange(e){
        setUp({
            ...up,
            [e.target.id]: e.target.value 
        })

    }

    // function oldLogin(data){
        
    //         //    console.log(data)
    //           let getUser = data.find(i => i.userName === up.userName)
    //         //    console.log(getUser)
    //             if (getUser === undefined) {
    //                 document.querySelector("#errorMessage").innerHTML = "User Not Found"
    //                 return 0
    //             }
    //             if (getUser.password !== up.password) {
    //                 document.querySelector("#errorMessage").innerHTML = "Password Wrong"
    //                 return 0
    //             }
    //             getUserInfo(getUser)
            
    // }

    function tryToLogIn(e){
        e.preventDefault()
        fetch("/login/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(up)
        })
        .then(res => res.json())
        .then(data => { 
         //   console.log(data)
            if(data.error) {
                setErrorMessage("User name or password incorrect.")               
            } else {
                user = data
                history.push("/")
            }
        }
        )
      

    }


    return (
    <div>
        <h1 className="centeredText">Japanese through JRPGs</h1>
        <h2 className="centeredText">Login</h2>
        <p className="error" id="errorMessage">{errorMessage}</p>
        <form>
        <p className="centeredText">User Name: <input id="userName" onChange={e => handleChange(e)} /></p>
        <p className="centeredText">Password: <input id="password" type="password" onChange={e => handleChange(e)} /></p>
        
        <p className="centeredText"><button onClick={e => tryToLogIn(e)}>Login</button></p>
        </form>
        <NavLink to="/register"><p className="centeredText"><button>Register</button></p></NavLink>
        <br />
        <br />
    </div>
    )
}

export default Login