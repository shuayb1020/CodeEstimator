import React from 'react';
import { Link } from "react-router-dom";

const ResultLists = ({result,title}) => {
    // const blogs = props.blogs;
    // const title = props.title;
    return (  
        <div className="blog-list">
            <h2> {title} </h2>
            {result.map((result) => (
                
            <div className="result-preview" key={result.id}>
                <Link to = {`/result/${result.id}`}>
                    <h2> { result.title } </h2>
                    <p> written by {result } </p>
                </Link>
                
            </div>


          ))}
        </div>
    );
}
 
export default ResultLists;