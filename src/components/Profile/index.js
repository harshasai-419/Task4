import './profileIndex.css'
import {Component} from 'react'
import LeftCon from '../LeftCon'
import Header from '../Header'
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BounceLoader } from 'react-spinners';
import SelectContext from '../../context/SelectContext';
 
class Profile extends Component{
    state={data:[{name:'a',mobile:'9876445633',location:'vizag',email:'s@gmail',username:'sai'}],isLoading:true}
    static contextType = SelectContext 
    componentDidMount(){
       this.getProfile()
    }
    getProfile=async ()=>{
        const url="https://task4backend-c5l5.onrender.com/profile"
        const { user } = this.context; 
        // console.log(user)
        const userDet={username:user}
        const options={
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(userDet),
        }
        const response=await fetch(url,options)
        if(response.ok===true){
            const data=await response.json()
            console.log(data)
            this.setState({data:data,isLoading:false})
        }
        else{
            this.setState({isLoading:false})
        }
    }
    render(){
        if(Cookies.get("jwt_token")===undefined){
            return <Navigate to="/login" replace/>
        }
        const {select}=this.props
        const {data, isLoading}=this.state
        return(
            <div className='dash-total-con'> 
                <Header/> 
                <div className='dash-containers'>
                    <LeftCon select={select}/> 
                    {isLoading?(
                        <div className='loader-con'>
                            <BounceLoader color="#36d7b7" loading={true} size={40} />
                        </div>
                    ):<div className='total-dash-right-con'>
                        <h2 className='pro-head'>PROFILE</h2>
                            {data.map(each=>{
                                return(
                                    <div className='prof-card'>
                                        <h2 className="pro-det-head"><span className='pro-det'>Name </span>: {each.name}</h2>
                                        <h2 className="pro-det-head"><span className='pro-det'>Email </span>: {each.email}</h2>
                                        <h2 className="pro-det-head"><span className='pro-det'>Username </span>: {each.username}</h2>
                                        <h2 className="pro-det-head"><span className='pro-det'>Mobile </span>: {each.mobile}</h2>
                                        <h2 className="pro-det-head"><span className='pro-det'>Location </span>: {each.location}</h2>
                                        
                                    </div>
                                )
                            })}
                        </div>}
                </div>

            </div>
        )
    }
}
export default Profile
