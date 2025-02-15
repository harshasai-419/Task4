import './checkIndex.css'
import {Component} from 'react'
import LeftCon from '../LeftCon'
import Header from '../Header'
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BounceLoader } from 'react-spinners';
 
class Checkin extends Component{
    state={data:[{sign_in_time:'2023-02-12'}],totalTask:0,completed:0,inProgress:0,toDo:0,isLoading:true}

    componentDidMount(){
       this.getCheckDet()
    }
    getCheckDet = async () => {
        try {
            const url = "https://task4backend-c5l5.onrender.com/checkin";
            const response = await fetch(url);
            console.log(response)
            if (response.ok===true) {
                const data = await response.json();
                this.setState({ data, isLoading: false });
            }
            
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ isLoading: false, error: true });
        }
    };

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
                    ):<div className='total-checkin-right-con'>
                            <marquee className='checkin-head'>Employee Checkin Details</marquee>
                            {data.length === 0 ? (
                                <p>No checkin details available.</p>
                            ) : (
                                <ul className='all-projects'>
                                    {data.map((check) => (
                                        <li key={check.id} className='project-card'>
                                            <h2>{check.sign_in_time}</h2> 
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>}
                </div>

            </div>
        )
    }
}
export default Checkin