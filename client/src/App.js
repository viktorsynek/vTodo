import { Link } from 'react-router-dom'
import './css/main.css';

function App() {
  return (
    <>
        <div className="topnav">
          <div className="flex">
            <ul className='topnav-items'>
              <li><Link to="/" id='title'>vTodo</Link></li>
            </ul>
            <ul className='topnav-items'>
              <li><Link to="/">👩‍💻viktorsynek</Link></li>
              <li><Link to="/">Logout</Link></li>
            </ul>
          </div>
        </div>
        <div className='box'>
          <button>Add Task</button>

        </div>
    </>
  );
}

export default App;
