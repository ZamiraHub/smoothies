import supabase  from '../config/supabaseClient'
import {useEffect, useState } from 'react'

//components
import SmoothiesCard from '../components/SmoothiesCard'

const Home = () => {
    const [fetchError, setFetchError]=useState(null)
    const [smoothies, setSmoothies]=useState(nill)
    const [orderBy, setOrderBy]=useState('create_id')

    const handleDelete=(id)=>{
        setSmoothies((prevSmoothies)=>{
            return prevSmoothies.filter((sm)=> sm.id !==id)
        })
    }

    useEffect (()=>{
        const fetchSmoothies=async=async ()=>{
            const {data,error}=await suparbase
            .from ('smoothies')
            .select()
            .order(orderBy,{ascending:false})

            if (error){
                setFetchError('Could not fetch the smoothies')
                setSmoothies(null)
            }
            if (data){
                setSmoothies(data)
                setFetchError(null)
            }
        }

        fetchSmoothies()
    },[orderBy])

  return (
    <div className='page home'>
        {fetchError && <p>{fetchError}</p>}
        {smoothies && (
            <div className='smoothies'>
                <div className='order-by'>
                    <p>Order by:</p>

                    <button onClick={() => setOrderBy('created_at')}>
                        Title Created
                    </button>
                    <button onClick={()=>setOrderBy('title')}>
                    </button>
                    Title
                   <button onClick={()=>setOrderBy('rating')}>
                     Rating
                </button> 
                </div>
                {orderBy}
                <div className="smoothie-drid">
                    {smoothies.map((smoothie)=>(
                        <SmoothieCard
                        key={smoothie.id}
                        onDelete={handleDelete}
                        />
                    ))}

                </div>

            </div>
        )}

    </div>
  )
}

export default Home