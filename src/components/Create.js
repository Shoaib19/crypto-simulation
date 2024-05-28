import { useState, useEffect } from 'react';

const Create = ({data}) => {
  const [inputs, setInputs] = useState({
    initial: '',
    price: '',
    quantity: ''
  });
  
  const [errors, setErrors] = useState({
    initial: '',
    price: '',
    quantity: ''
  });

  const [orderType, setOrderType] = useState('BUY LIMIT');
  const [pair, setPair] = useState('BTC/USDT');
  const [isPending, setPending] = useState(false);
  const [isError, setError] = useState(false);
  const [buttonText, setButtonText] = useState('BUY LIMIT');
  const [isCreated, setCreated] = useState(false);

  const handleButtonText = (e) => {
    var index = e.nativeEvent.target.selectedIndex;
    setButtonText(e.nativeEvent.target[index].text);
    setOrderType(e.target.value)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numberValue = parseFloat(value);
    
    let errorMessage = '';
    if (isNaN(numberValue) || numberValue < 0) {
      errorMessage = 'Please enter a non-negative number.';
      setError(true)
    }
    else {
      setError(false)
    }
    if(name == 'initial') {
      checkSufficientBalance();
    }
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  have no idea about total yet need to adjust it later
    let status = null;
    switch (orderType) {
      case 'BUY LIMIT':
      case 'SELL LIMIT':
        status = 'Pending';
        break;
      case 'MARKET BUY':
      case 'MARKET SELL':
        status = 'Filled';
        break;
    }
    const order = { initial: inputs['initial'],
                    price: inputs['price'],
                    quantity: inputs['quantity'],
                    createdAt: new Date(),
                    completedAt: null,
                    orderType, pair, status
                  }

    setPending(true)
    fetch("http://localhost:8000/order_historyTable",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    }).then(() => {
      setPending(false);
      setCreated(true);

      setTimeout(() => {
        setCreated(false);
      }, 3000);
    })
  }

  const checkSufficientBalance = () => {
     // refactorization required current code is assumption
     if (inputs.initial) {
       if (inputs.initial < data['buy'] || inputs.initial < data['sell']) {
         setError(true);
        }
        else {
         setError(false);
        }
     }
  }

  useEffect(() => {
      checkSufficientBalance();
  }, [data]);

  return ( 
    <div>
      <h1 className='block text-black-500 font-bold md:text-left heading'>Create New Order</h1>
      { isCreated && <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">Order Created!</strong>
  <span className="block sm:inline">Also Added into Orderbook.</span>
</div>}
      <div className='container'>
      <div className='form-wrapper'>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-initila-bal">
              Initial Balance (USDT)
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-initila-bal"
             type="number"
             name="initial"
             required
             value={inputs.initial}
             onChange={handleChange}
             />
          </div>
        </div>
        {errors.initial && <p style={{ color: 'red' }}>{errors.initial}</p>}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-pair">
              Select Pair
            </label>
          </div>
          <div className="md:w-2/3">
            <select className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="iinline-pair"
              value={pair}
              onChange={e => setPair(e.target.value)}
            >
            <option value="btc_usd">BTC/USDT</option>
            <option value="eth_btc">ETH/BTC</option>
            <option value="ltc_usd">LTC/USDT</option>
            <option value="xrp_usd">XRP/USDT</option>
          </select>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-order-type">
              Select Order Type
            </label>
          </div>
          <div className="md:w-2/3">
            <select className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-order-type"
              value={orderType}
              onChange={handleButtonText}
            >
            <option value="BUY LIMIT">BUY LIMIT</option>
            <option value="SELL LIMIT">SELL LIMIT</option>
            <option value="MARKET BUY">MARKET BUY</option>
            <option value="MARKET SELL">MARKET SELL</option>
          </select>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-price">
              Specify Price
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-price"
             type="number"
             name="price"
             required
             value={inputs.price}
             onChange={handleChange}
             />
          </div>
        </div>
        {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-quantity">
              Specify Quantity
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-quantity"
             type="number"
             name="quantity"
             required
             value={inputs.quantity}
             onChange={handleChange}
             />
          </div>
        </div>
        {errors.quantity && <p style={{ color: 'red' }}>{errors.quantity}</p>}
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            {!isError && !isPending && <button type='submit' className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
              {buttonText}
            </button> }
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            {isPending && <button disabled className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Processing ...
            </button> }
          </div>
        </div>
      </form>
      </div>
      </div>
    </div>
   );
}
 
export default Create;