import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderBook = () => {

  const [orders, setOrders] = useState(null);
  const [canDeleted, SetDeleted] = useState(false);
  const [canEdited, SetEdited] = useState(false);

  const showAction =(status) =>{
     if (status == 'Filled' || status == 'Cancel') {
        return false;
      }
      else {
        return true;
      }
  }
  const cancelOrder = (order) =>{

  }

  const editOrder = (order) =>{
    
  }

  useEffect(() => { 
  fetch('http://localhost:8000/order_historyTable')
  .then( res => {
    if(!res.ok){
      throw Error("Something went wrong")
    }
    return res.json()
  })
  .then(data => {
    setOrders(data)
    
  })
  .catch(err => {
    console.error(err)
  })
  }, []);

  return ( 
    <div className="orderbook">
      <h1 className='block text-black-500 font-bold md:text-left heading'>Orderbook page</h1>
      <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <th>
                  <th scope="col" className="px-6 py-4">id</th>
                  <th scope="col" className="px-6 py-4">Initial Balance</th>
                  <th scope="col" className="px-6 py-4">Pirce</th>
                  <th scope="col" className="px-6 py-4">Quantity</th>
                  <th scope="col" className="px-6 py-4">Order Type</th>
                  <th scope="col" className="px-6 py-4">Pair</th>
                  <th scope="col" className="px-6 py-4">Created at</th>
                  <th scope="col" className="px-6 py-4">Confirmed at</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-6 py-4">Actions</th>
                </th>
              </thead>
              {orders && orders.map((order) => (
                <div className="blog-preview" key={order.id}>
              <tbody>
                <tr className="border-b dark:border-neutral-500">
                  <td className="px-6 py-4 font-medium">{ order.id }</td>
                  <td className="px-6 py-4">{ order.initial }</td>
                  <td className="px-6 py-4">{ order.price }</td>
                  <td className="px-6 py-4">{ order.quantity }</td>
                  <td className="px-6 py-4">{ order.orderType }</td>
                  <td className="px-6 py-4">{ order.pair }</td>
                  <td className="px-6 py-4">{ order.createdAt }</td>
                  <td className="px-6 py-4">{ order.completedAt }</td>
                  <td className="px-6 py-4">{ order.status }</td>
                  <td className="px-6 py-4">
                    {showAction(order.status) && <button onClick={editOrder(order)}>edit</button>} &nbsp;
                    {showAction(order.status) && <button onClick={cancelOrder(order)}>Cancel</button>}
                  </td>
                </tr>
              </tbody>
              </div> ))}
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
   );
}
 
export default OrderBook;