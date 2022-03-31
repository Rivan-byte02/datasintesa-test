import React, { useEffect, useState } from 'react'

export default function PeopleCard(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [dob, setDOB] = useState('')

  useEffect(() => {
    const {name, email, location, dob} = props.data
    setName(`${name.title} ${name.first} ${name.last}`)
    setEmail(`${email}`)
    setCity(`${location.city}, ${location.country}`)
    const dateDOB = new Date(dob.date)
    setDOB(`${dateDOB.getFullYear()}/${dateDOB.getMonth()}/${dateDOB.getDate()}, ${dateDOB.getHours()}:${dateDOB.getMinutes()}:${dateDOB.getSeconds()}`)
  }, [])

  return (
    <div className='card-container'>
      {!props.loading ?
      <>
        <div className='image-container'>
          <img className='image-thumbnail' src={`${props.data.picture.large}`} />
        </div>
        <h4>{`Name: ${name}`}</h4>
        <h4>{`Email: ${email}`}</h4>
        <h4>{`City: ${city}`}</h4>
        <h4>{`DOB: ${dob}`}</h4>
        <h4>{`Age: ${props.data.dob.age}`}</h4>
      </> :
      <div className='loader-container'>
        <div className="loader"></div>
      </div>
      }
    </div>
  )
}
