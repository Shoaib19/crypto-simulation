import { useState } from 'react';
import useFetch from '../useFetch'
import Create from './Create'
import OrderBook from './OrderBook'

const Home = () => {
  // const {data: data, isLoading, err} = useFetch("http://localhost:8000/orders")
  const [data, setData] = useState(0)

  setTimeout(() => {
    setData(5);
  }, 10000);

// methods

// template
  return (  
    <div className="home">
      <h1 className='block text-black-500 font-bold md:text-left heading'>Home Page</h1>
      <p>home page content will be there...</p>
      <Create data={data} />
      <OrderBook />
      {/* {err && <div>{err}</div>}
      {isLoading && <p>Loading...</p>}
      { blogs && <BlogList blogs={blogs} title= "All Blogs" /> } */}
    </div>
  );
}
 
export default Home;