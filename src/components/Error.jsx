
function Error(error){
    console.log(error, "in the comp")
return (
    <div>
        <h2>Oh No!</h2>
      <p>{error.message}</p> 
      ☹️
    </div>
)
}

export default Error;