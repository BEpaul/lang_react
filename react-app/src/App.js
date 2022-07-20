import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Article(props){
  return <article><h2>{props.title}</h2>
  {props.body}
  </article>
}
function Header(props){
  console.log('props', props, props.title);
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault(); // a tag의 기본동작 방지(리로드가 일어나지 않음)
      props.onChangeMode(); // Header 태그 내에 있는 함수 호출
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props){
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
  lis.push(<li key={t.id}>
    <a id={t.id} href={'/read/' + t.id} onClick={event => {
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="Create" /></p>
    </form>
  </article>
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ] );

  let content = null;

  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ'){
    let title, body = null;
    for(let i = 0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics] // JS 불변성 개념 : useState(객체)의 경우, 복제본을 만들어서 그곳에 push하고 사용한다 (객체 : array, object 등등)
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}>

    </Create>
  } 

  return (
    <div className="App">
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}

      <a href='/create' onClick={event=>{
        event.preventDefault();
        setMode('CREATE');
      }}>
        Create
        </a>
    </div>
  );
}

export default App;
