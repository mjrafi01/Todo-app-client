
import { Outlet } from 'react-router-dom'
import { Footer } from '../pages/Shared/Footer/Footer'
import { Navbar } from '../pages/Shared/Navbar/Navbar'
export const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>

      <Footer></Footer>

    </div>
  )
}
