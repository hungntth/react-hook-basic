import logo from './logo.svg';
import './App.css';
import ColorBox from './components/ColorBox';
import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import queryString from 'query-string';
import PostFiltersForm from './components/PostFiltersForm';

function App() {

  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Im Groot ' },
    { id: 2, title: 'Im Captain ' },
    { id: 3, title: 'Im Peter ' },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    // title_like: 'quis',
  });


  useEffect(() => {
    async function fetchPostList() {

      try {

        const paramsString = queryString.stringify(filters);
        const repusetUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(repusetUrl);
        const reponseJSON = await response.json();
        console.log({ reponseJSON });

        const { data, pagination } = reponseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('failed to fetch post list: ', error.message);
      }
      console.log('Post list effect')
    }
    fetchPostList();
  }, [filters]);

  function hanldPageChange(newPage) {
    console.log(newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function hanldTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList)
  }

  function handleTodoFormSubmit(formValues) {
    console.log('Form submit: ', formValues);
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handleFiltersChange(newFilters) {
    console.log('New filter: ', newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    })
  }

  return (
    <>
      <h1>PostList</h1>
      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination
        pagination={pagination}
        onPageChange={hanldPageChange}
      />
    </>
  );
}

export default App;
