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
         <div className="table-header">
          <div className="infos">
           <h4>Nome</h4>
           <p>{responseSearch.logradouro}</p>
          </div>
           

          <div className="infos">
           <h4>Bairro</h4>
           <p>{responseSearch.bairro}</p>
          </div>

          <div className="infos">
           <h4 className="infos-margin-left">Localidade</h4>
           <p>{responseSearch.localidade}</p>
          </div>

          <div className="infos">
           <h4>CEP</h4>
           <p>{responseSearch.cep}</p>
          </div>

         </div>

        
       </main>
      )}
        
    </div>
  )
}


