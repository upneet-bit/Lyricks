import { useState } from 'react';
import { FiSearch }  from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  }
  
  return(
  <form onSubmit={handleSubmit} autoComplete="off" 
    className="p-2 text-gray-400 focus-within:text-gray-600">
      <label htmlFor="search-field" className="sr-only">
        Search all songs
      </label>
      <div className="flex flex-row items-center justify-start">
          <FiSearch className='w-5 h-5 ml-4 ' />
          <input 
            name='search-field'
            autoComplete='off'
            id='search-field'
            type='search'
            placeholder='Search'
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            className='flex-1 p-4 text-base text-white placeholder-gray-500 bg-transparent border-none outline-none'
          />
      </div>
  </form>);
};

export default Searchbar;
