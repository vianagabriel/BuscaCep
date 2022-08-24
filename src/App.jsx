import './styles.css';
import { ImLocation2 } from 'react-icons/im';
import { BsSearch } from 'react-icons/bs';

import { api } from './services/api';
import { useState } from 'react';


export function App() {
 
  const [search, setSearch ] = useState('');
  const [responseSearch, setResponseSearch] = useState({});

  async function handleSearch(){
     if(search ===''){
       alert('Campo não preenchido')
       return;
     }

     try{
       const response = await api.get(`${search}/json`);
       setResponseSearch(response.data)
       setSearch('')
     }catch{
       alert('CEP inválido')
       setSearch('');
     }
  }

  return (
    
    <div>
      
       <header>
        <ImLocation2 size={30} fill='#0396ff'/>
         <h1>Procurar <span>CEP</span></h1>
       </header>

       <div className="titleAndSearch">
         <h2>Procure e encontre CEPS de todo Brasil !</h2>

         <div className="search">
            <input 
              type="text"
              placeholder='Digite o cep para procura'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
  
           <button onClick={handleSearch}>
             <BsSearch size={25}/>
           </button>

         </div>
       </div>

       {Object.keys(responseSearch).length > 0 && (

       <main>
         
       <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Bairro</th>
          <th>Localidade</th>
          <th>Cep</th>
          
        </tr>
      </thead>
      
      <tbody>
          <tr>
            <td>{responseSearch.logradouro}</td>
            <td>{responseSearch.bairro}</td>
            <td>{responseSearch.localidade}</td>
            <td>{responseSearch.cep}</td>
          </tr>
        
      </tbody>
    </table>
        
       </main>
       )}
      
        
    </div>
  )
}


