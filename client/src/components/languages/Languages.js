import { useState, useEffect } from 'react';
import { LanguageConsumer } from '../../providers/LanguageProvider';
import { Form, Pagination } from 'react-bootstrap';
import { MainBtn } from '../../styles/sharedStyles';

const Languages = ({ getLanguages, addLanguage, languages, flash, setFlash, pagination}) => {
  const [language, setLanguage] = useState({ name: '' })
  const [pages, setPages] = useState([])

  useEffect( () => {
    getLanguages()
    renderPages()
  }, [])

  const renderPages = () => {
    let items = [];
    for (let num = 1; num <= pagination; num++) {
      items.push( 
        <Pagination.Item key={num} onClick={() => getPageItem(num)}>
          {num}
        </Pagination.Item>
      )
    }
    setPages(items)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addLanguage(language)
    setLanguage('');
  }

  const getPageItem = (page) => {
    getLanguages(page)
  }

  return(
    <>
      <h2>Add Languages</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Language</Form.Label>
          <Form.Control 
            type="text" 
            required         
            name='name'
            value={language.name}
            placeholder='Name'
            onChange={(e) => setLanguage({ ...language, name: e.target.value })}
          />
        </Form.Group>
        <MainBtn type='submit'>Add</MainBtn>
      </Form>
      <br />
      <br />
      <h4>Languages</h4>
      <hr />
      <ul>
        { languages.map( l => 
          <li key={l.id}>{l.name}</li>
          )}
      </ul>
      <Pagination>{pages}</Pagination>
    </>
  )
}

const ConnectedLanguages = (props) => (
  <LanguageConsumer>
    { value => <Languages {...props} {...value} /> }
  </LanguageConsumer>
)

export default ConnectedLanguages;