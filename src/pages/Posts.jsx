import { useState, useEffect, useRef } from 'react';
import PostList from '../components/post-list/PostList';
import CreateItem from '../components/create-item/CreateItem';
//Объединение компонентов SelectItem && MyInputSearch
import SelectFilter from '../components/select-filter/SelectFilter';
import ModalForm from '../components/UI/modal/ModalForm';
//Логика по меморизации posts
import { useSelectAndFilterSort } from '../hooks/usePosts/usePosts';
//Метод запроса
import PostService from '../API/PostServiec';
import Loader from '../components/UI/loader/Loader';
import ErrorMessage from '../components/UI/error/ErrorMessage';
import ScrollPageOver from '../components/UI/scrollPageOver/ScrollPageOver';
//Обработка запроса
import useFetching from '../hooks/useFetching';
import MyPagination from '../components/UI/pagination/Pagination';
//Сортировка массива
import removeDublicate from '../utils/removeDublicate';
//Observer
import useObserver from '../hooks/useObserver';

import './posts.scss';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', search: '' });
  const [open, setOpen] = useState(false);
  const [totalPage, setTotalPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  //Доступ к элементу
  const lastElement = useRef(null);



  const { isLoading, isError, fetchData, isScroll, setIsScroll } = useFetching(async (page) => {

    if (currentPage === 1) {
      const response = await PostService.getAll(page);
      if(Array.isArray(response)) {
        const getStorage = localStorage.getItem('posts');
        const parseStorage = JSON.parse(getStorage);
        const newArr = removeDublicate([...response, ...parseStorage || []])
        setPosts(newArr);
        localStorage.setItem("posts", JSON.stringify(newArr))
      }else {
        const newArr = removeDublicate([...posts, response])
        setPosts(newArr);
        localStorage.setItem("posts", JSON.stringify(newArr))
      }

      
    } else {
      //при погинации
      const response = await PostService.getByPage(currentPage);
      const transformObj = await Array.of(response);
      setPosts(transformObj);

    }

  });

useObserver(isLoading, currentPage === 1, filter.search === '', isScroll, limit <= 50, posts, lastElement, () => {
  setLimit(limit => limit + 1);
  fetchData(limit);
});


  useEffect(() => {
    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);



  //Добавление элемента и закрытие модального окна
  const addNewItem = (data) => {
    setOpen(false);
    const saveInStorage = JSON.parse(localStorage.getItem('posts'));
    localStorage.setItem('posts', JSON.stringify([...saveInStorage, data]))
    setPosts(posts => [...posts, data]);
  }

  //Удаление элемента
  const deletePot = (id) => {
    setPosts(posts => posts.filter(item => item.id !== id))
  }

  // Сортировка при select и поиске
  const searchPostAndSortedPost = useSelectAndFilterSort(posts, filter.sort, filter.search);


  return (
    <div className="App">
      <h1 style={{ "textAlign": "center", "marginBottom": 30 }}>List of Countries</h1>
      <SelectFilter filter={filter} setFilter={setFilter} setTotalPage={setTotalPage} limit={limit}/>
      <ModalForm open={open} setOpen={setOpen}>
        <CreateItem createItem={addNewItem} />
      </ModalForm>
      <MyPagination totalPage={totalPage} setCurrentPage={setCurrentPage} isError={isError} posts={posts} setIsScroll={setIsScroll}/>
      {isError && <ErrorMessage isError={isError}/>}
      {isLoading && !isScroll ?
        <div style={{ "display": "flex", "justifyContent": "center", "marginTop": 20 }}><Loader /></div>
        :
        <PostList posts={searchPostAndSortedPost} deletePot={deletePot} isError={isError} isLoading={isLoading}/>
      }
      <div ref={lastElement} className='posts__journey' style={{visibility: limit <= 50 ? "hidden" : "visible"}}> 
        <div>Our journey has come to an end</div>
        <ScrollPageOver/>
        <div>Thank you for traveling with us</div>
      </div>
        
     </div>
  );
}

export default Posts;
