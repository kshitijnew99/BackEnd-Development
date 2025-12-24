import React , {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {

    const [product, seTproduct] = useState(null)    

    useEffect(()=>{
        axios.get('http://localhost:3000/products/get-item')
        .then(response=>{
            seTproduct(response.data.product)
            console.log(response.data.product);
            
        })
    },[])

  return (
    <div>
        {/* <h1>Hello, World!</h1>
        <p>This is Kshitij Rao Ranjan/ I'm a WebDeveloper</p> */}
    </div>
  )
}

export default App