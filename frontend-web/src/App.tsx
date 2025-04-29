import { RouterProvider } from 'react-router-dom'
import AppRouter from './app-routers'
import { observer } from 'mobx-react-lite'
const App= observer(()=> {
  return (
    <div className='App'>
      <RouterProvider router={AppRouter} future={{v7_startTransition:true}}/>

    </div>
  )
})

export default App
