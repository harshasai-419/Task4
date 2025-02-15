import './homeIndex.css'
import {Component} from 'react'
import LeftCon from '../LeftCon'
import Header from '../Header'
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BounceLoader } from 'react-spinners';
import SelectContext from '../../context/SelectContext';
 
class Home extends Component{
    state={data:[{count:2}],data2:'21-01-2025',isLoading:true}
    static contextType = SelectContext 
    componentDidMount(){
        this.getHomeDet()
    }

    getHomeDet= async ()=>{
        const url="https://task4backend-c5l5.onrender.com/home"
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
            const {getItem,getItem2}=data
            console.log(getItem2)
            console.log(getItem2.sign_in_time)
            this.setState({data:getItem,data2:getItem2.sign_in_time,isLoading:false})
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
        const {data,data2, isLoading}=this.state
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
                            <ul className='all-home'>
                                 <li className='home-card'>
                                        <h2>No of working days per month</h2>
                                        <h2 className='home-para'>22</h2>
                                  </li>
                                {data.map((project) => (
                                    <li key={project.id} className='home-card'>
                                        <h2>No of days attended</h2>
                                        <h2 className='home-para'>{project.count}</h2>
                                    </li>
                                ))}
                               <li className='home-card'>
                                        <h2>Last checkin</h2>
                                        <h2 className='home-para'>{data2}</h2>
                                  </li>
                            </ul>
                        </div>}
                </div>

            </div>
        )
    }
}
export default Home