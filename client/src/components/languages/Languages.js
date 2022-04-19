import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { LanguageConsumer } from '../../providers/LanguageProvider';
import { Form, Spinner } from 'react-bootstrap';
import { MainBtn } from '../../styles/sharedStyles';

const Languages = ({ getLanguages, addLanguage, languages, flash, setFlash, pagination}) => {
  const [hasMore, setHasMore] = useState(true)
  const [language, setLanguage] = useState({ name: '' })
  
  useEffect( () => {
    getLanguages()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    addLanguage(language)
    setLanguage('');
  }

  const getNextPage = (e) => {
    if (e <= pagination) {
      // setHasMore(true)
      getLanguages(e)
    } else {
      setHasMore(false);
    } 
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
      <div style={{ height: '700px', overflow: 'auto' }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextPage}
          hasMore={hasMore}
          loader={
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
          useWindow={false}
        >
          <ul>
            { languages.map( l => 
              <li>{l.name}</li>
            )}
          </ul>
        </InfiniteScroll>
      </div>
    </>
  )
}

const ConnectedLanguages = (props) => (
  <LanguageConsumer>
    { value => <Languages {...props} {...value} /> }
  </LanguageConsumer>
)

export default ConnectedLanguages;