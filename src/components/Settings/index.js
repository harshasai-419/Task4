import {Component} from 'react'
import './settingsIndex.css'
import Leftcon from '../LeftCon'
import Header from '../Header' 
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

class Settings extends Component{
    
    render(){
        if(Cookies.get("jwt_token")===undefined){
            return <Navigate to="/login" replace/>
        }
        const {select}=this.props
        return(
            <div className='task-total-con'> 
                <Header/> 
                <div className='task-containers'>
                    <Leftcon select={select}/>
                    <div className='total-settings-right-con'>
                        <h1>Settings page is under progress</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings