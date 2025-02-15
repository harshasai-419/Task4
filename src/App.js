import {Component} from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/Home'
import Projects from './components/Projects'
import Checkin from './components/Checkin'
import Profile from './components/Profile'
import About from './components/About'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Logout from './components/Logout'
import NotFound from './components/NotFound'
import Settings from './components/Settings'
import SelectContext from './context/SelectContext'
import './App.css';

class App extends Component{
  state={selectedTask:'',user:''}
  toggleTask = (ele) => {
    this.setState(prevState => ({selectedTask:ele}))
  }
  updateUser=(user)=>{
    this.setState({user:user})
  }
  render(){
    const {selectedTask,user}=this.state
    return (
      <SelectContext.Provider
        value={{selectedTask, toggleTask:this.toggleTask,user,updateUser:this.updateUser}}
      >
      <BrowserRouter>
        <Routes>      
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/register" element={<RegisterPage/>} />
          <Route exact path="/logout" element={<Logout />}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/" element={<Home select={'dashboard'}/>}/>
          <Route exact path="/projects" element={<Projects select={'tasks'}/>}/>
          <Route exact path="/profile" element={<Profile select={'inProgress'}/>}/>
          <Route exact path="/checkin" element={<Checkin select={'completed'}/>}/>
          <Route exact path="/settings" element={<Settings select={'settings'}/>}/>
          <Route exact path="/logout" element={<Logout/>}/>
          <Route path="*" element={<NotFound />}/>
         
        </Routes>       
      </BrowserRouter>
      </SelectContext.Provider>
    )
  }
}

export default App;





