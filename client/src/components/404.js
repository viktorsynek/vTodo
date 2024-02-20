import {Link} from 'react-router-dom';

const PageNotFound = () =>
{
    return (
        <>
            <h1 id='error-title'>vTodo</h1>
            <div className='error'>
                <h1><span>404 Error</span> - Not Found</h1>
                <Link to={'/'}>Back to Home</Link>
            </div>
        </>
    )
}

export default PageNotFound;