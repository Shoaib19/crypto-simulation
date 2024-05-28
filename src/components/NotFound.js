import { Link } from 'react-router-dom';

const NotFound = () => {
  return ( 
    <div className="not-found">
      <h2>Sorry</h2>
      <p>That page Doesn't Exist</p>
      <Link to='/'>Please Go to Home Page</Link>
    </div>
   );
}
 
export default NotFound;