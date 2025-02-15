import Cookies from "js-cookie"
import {Navigate} from "react-router-dom"
import {Component} from 'react'
import SelectContext from '../../context/SelectContext';

class Logout extends Component{
    static contextType = SelectContext
    componentDidMount(){
        this.getDetails()
    }
    getDetails=async ()=>{
        // console.log("heloo")
        const url="https://task4backend-c5l5.onrender.com/logout"
        const { user } = this.context; 
        // console.log(user)
        const userDet={username:user}
        const options={
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(userDet),
        }
        const response=await fetch(url,options)

    }
    render(){
        Cookies.remove("jwt_token")
        return(
            <Navigate to="/login" replace/>
        )
        
    }
    
    
}

export default Logout