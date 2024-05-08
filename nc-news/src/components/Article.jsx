import axios from 'axios'
import { useEffect, useState } from 'react'

function Article(){
    const [loading, setLoading] = useState(true)
    const [article, setArticle] = useState([])
    
    const article_id = 5
    
    useEffect(() => {
        axios
        .get(`https://be-nc-news-zmuo.onrender.com/api/articles/${article_id}`
        )
        .then((response) => {
            console.log(response.data)
            setArticle(response.data.article)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])
    
    if (loading) return <p>Loading...</p>

    const timeStamp = article.created_at.slice(0,10) + " " + article.created_at.slice(11,16)

    return (
        <div className='view-article'>

        <section className="view-article-top">
        <p className="view-article-topic">{article.topic}</p>
        <p className="view-article-author">{article.author}</p>
        <p className="view-article-time">{timeStamp}</p>
        <p className="view-article-vote">Vote
        </p>
        <button className="view-article-vote-button">ᐁ</button>
        <button className="view-article-vote-button">ᐃ</button>

        </section>

        <img className="view-article-image" src={article.article_img_url} alt="" />


        <section className="view-article-bottom">

        <h3 className="view-article-title">{article.title}</h3>
        
        </section>

        <p className='view-article-body'>{article.body}</p>
        <button className="view-article-comments-button">Show {article.comment_count} comments</button>
        
        </div>
    )
}




export default Article