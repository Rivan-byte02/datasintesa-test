import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import instance from './configs/axios';
import axios from 'axios';
import PeopleCard from './components/card';

function App() {
  const [page, setPage] = useState(1)
  const [people, setPeople] = useState([])
  const [nat, setNat] = useState('')
  const [loading, setLoading] = useState(false)
  const natList = ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IR', 'NO', 'NL', 'NZ', 'TR', 'US']
  
  const fetchAPI = async () => {
    try {
      setLoading(true)
      setPeople([])
      let url = ''
      if (nat) {
        url = `https://randomuser.me/api/?page=${page}&results=10&nat=${nat.toLowerCase()}`
      } else {
        url = `https://randomuser.me/api/?page=${page}&results=10`
      }
      const {data} = await axios.get(url)
      if (page !== 1) {
        people.push(...data.results)
        console.log(people, data.results);
        setPeople(people)
      } else {
        setPeople(data.results)
      }
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [page, nat])
  
  return (
    <div className='App'>
      <h1>Random People Generator</h1>
      <input value={nat} placeholder={"Chose by Nationality"} onChange={(e) => {
        setNat(e.target.value)
        setPage(1)
      }}
      className='p-1 w-full border-l border-gray-400' list='city_to'/>
      <datalist id='city_to'>
          {natList.map((e, i) => {
              return (
                  <option value={e} key={i}/>
              )
          })}
      </datalist>
      <div className='list-container'>
        {people.map((e, i) => {
          return (
            <PeopleCard key={i} data={e} loading={loading}/>
          )
        })}
        {!people.length &&
          <h3>Loading Fetch Data.....</h3>
        }
      </div>

      <div className='button'
      onClick={() => {
        if (!loading) {
          setPage(page + 1)
        }
      }}>{!loading ? 'Show More....' : 'Loading...'}</div>
    </div>
  );
}

export default App;
