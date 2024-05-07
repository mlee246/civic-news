import axios from 'axios'
import { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'


function AllArticles(){

const [loading, setLoading] = useState(true)
const [allArticles, setAllArticles] = useState([])


useEffect(() => {
    axios
    .get("https://be-nc-news-zmuo.onrender.com/api/articles")
    .then((response) => {
        setAllArticles(response.data.articles)
        setLoading(false)
    })
}, [])

if (loading) return <p>Loading...</p>

return (

        <div>
            {allArticles.map((article) => {
                return <ArticleCard article={article} />
            })}
        </div>
        
    )
}




export default AllArticles