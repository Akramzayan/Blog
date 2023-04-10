import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const[title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] =useState('mario');
    const [isPending,setisPending] = useState(false);
    const history = useHistory()

    const HandleSubmit = (e) =>{
        e.preventDefault();
        const blog={title, body , author};
        setisPending(true);
        
        fetch('http://localhost:8000/blogs',{
            method : 'POST',
            headers: {'Content-Type':'application/JSON'},
            body : JSON.stringify(blog)
        }).then(() => {
            console.log('New Blog Added');
            setisPending(false);
        })
        //history.go(-1);
        history.push('/');
        

    }
   
    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={HandleSubmit} >
                <label>
                    Blog title
                </label>
                <input
                 type="text"
                required 
                value={title}
               onChange={(e) => setTitle(e.target.value)}
                />
                        <label>Blog Body</label>
                <textarea 
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                 > </textarea>
              <label>Author title</label>
              <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}>
                <option value="mario" >mario</option>
                <option value="mohamed">mohamed</option>
              </select>
              {!isPending && <button>Add Blog</button>}
              {isPending && <button disabled>Adding Blog ...</button>}
             
            </form>
         
        </div>
     );
}
 
export default Create;