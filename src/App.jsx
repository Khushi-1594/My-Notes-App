import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/home'
import NotesPage from './components/notesPage'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:groupName' element={<NotesPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App