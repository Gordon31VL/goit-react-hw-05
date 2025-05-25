import './App.css'
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "../Navigation/Navigation.jsx"


const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage.jsx"));
const MoviesDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage.jsx"))
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage.jsx"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast.jsx"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews.jsx"));


function App() {
  const options = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_THEMOVIEDB_API_ACCESS_KEY}` 
    }
  }
  
  return (
    <div>
      <div>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<HomePage options={options}/>}></Route>
            <Route path='/movies' element={<MoviesPage options={options}/>}></Route>
            <Route path='/movies/:id' element={<MoviesDetailsPage options={options} />}>
              <Route path="cast" element={<MovieCast options={options}/>} />
              <Route path="reviews" element={<MovieReviews options={options}/>} />
            </Route>
            <Route path='*' element={<NotFoundPage />}></Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App
