import React from 'react'

const SelectContext = React.createContext({
  selectedTask:'dashboard',
  toggleTask: () => {},
  user:'',
  updateUser:()=>{}
})

export default SelectContext
