import './App.css'
import { useState } from 'react'
import { Book } from './components/Book'
import { BookContainer } from './components/BookContainer'
import data from '../../books.json'
import { removeElement } from './utilities/utils'
import { Category } from './components/Category'

function App() {
  const [library, setLibrary] = useState(data.library)
  const [lecture, setLecture] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeGenre, setActiveGenre] = useState('')

  return (
    <>
      <BookContainer
        categoryAvailable={filtered.length}
        totalAvailable={library.length - lecture.length}
        category={activeGenre}
        typeContainer={'library'}
        titleContainer={'Librería'}
      >
        <Category
          activeGenre={activeGenre}
          setActiveGenre={setActiveGenre}
          library={library}
          setFiltered={setFiltered}
          lecture={lecture}
        />
        <div className="container-books">
          {filtered.map((el) => (
            <Book
              key={el.book.ISBN}
              title={el.book.title}
              image={el.book.cover}
              genre={el.book.genre}
              activeGenre={activeGenre}
              onClick={() =>
                removeElement(
                  el.book.ISBN,
                  'filtered',
                  filtered,
                  setFiltered,
                  lecture,
                  setLecture
                )
              }
            />
          ))}
        </div>
      </BookContainer>
      <BookContainer
        totalAvailable={lecture.length}
        typeContainer="lecture"
        titleContainer="Lectura"
      >
        <div className="container-books">
          {lecture.map((el) => (
            <Book
              key={el.book.ISBN}
              title={el.book.title}
              image={el.book.cover}
              genre={el.book.genre}
              onClick={() =>
                removeElement(
                  el.book.ISBN,
                  'lecture',
                  filtered,
                  setFiltered,
                  lecture,
                  setLecture
                )
              }
            />
          ))}
        </div>
      </BookContainer>
    </>
  )
}

export default App
