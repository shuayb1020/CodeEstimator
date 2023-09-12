import React, { useState } from 'react';
import './index2.css';
import NavigationBar from './Navbar2';
// import { Link } from 'react-router-dom';
// import {  useNavigate} from 'react-router-dom';


function Main() {
  const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [file1, setFile1] = useState('');
    const [file2, setFile2] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [result, setResult] = useState(null);
    const [dollar, setDollar] = useState('');

    // const navigate =  useNavigate();



  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  const handleDollarChange = (event) => {
    setDollar(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (file1 && file2) {
      const formData = new FormData();
      formData.append('file1', file1);
      formData.append('file2', file2);
      formData.append('title', title);
      formData.append('desc', desc);
// 'https://alfawzaaniy.pythonanywhere.com/project/compare/
    fetch('https://alfawzaaniy.pythonanywhere.com/project/compare/', {
        credentials: 'include',
        method: 'POST',
        body: formData,
      })
      
      .then(res => {
        if (!res.ok) {
            throw Error('Could not load data to that resource');
        }
        return res.json();
    
    })
        .then((data) => {
          console.log('Upload successful:', data);
        //   console.log(data)
          // Handle successful response from server
          setResult(data);
          setIsPending(false);
          setError(null);
          

        })
        .catch((error) => {
          console.error('Error uploading files:', error);
          // Handle error uploading files
          setError(error.message);
          setIsPending(false);
        });
    } else {
      console.warn('Please select two files');
    }
}

  return (
    <>
    <NavigationBar/>
    <div className="container">

      <h1>Select two code files: </h1>
      

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type='text'
            name="desc"
            id="description"
            value={desc}
            onChange={handleDescChange}
            required
          />
        </div>
        {/* ....... */}
        <div className='form-group'>
          <label htmlFor="dollar">Enter Present Dollar Rate:</label>
          <input
            type='number'
            name="dollar"
            id="dollar"
            value={dollar}
            onChange={handleDollarChange}
            required
          />
        </div>
        <div className="file-upload">
          <label htmlFor="file1">
            <input
              type="file"
              name="file1"
              id="file1"
              onChange={handleFile1Change}
              required
            />
            <span>Choose File 1</span> <span>{file1 && <span className='filename'>{file1.name}</span>}</span>
          </label>
        </div>
        <div className="file-upload">
          <label htmlFor="file2">
            <input
              type="file"
              name="file2"
              id="file2"
              onChange={handleFile2Change}
              required
            />
            <span>Choose File 2</span> <span>{file2 && <span className='filename'>{file2.name} </span>} </span>
          </label>
        </div>
        {/* <button type="submit">Calculate Metrics</button> */}
        {!isPending &&<button type="submit">Compare</button>}
        {/* {!isPending && <Link to={".result"}></Link>} */}
        {isPending && <button disabled>Loading...</button>}
        {error && <div className='error'>{error}</div>}
      </form>
      <>
      {/* {result && (
        <div className="result">
          <h2>Result</h2>
          <p> The best code file is: {result.winner}</p>
        </div>
      )} */}

      {result && (
          <div className="result" id='result'>
            <h2>Comparison Analysis</h2>
            <table border={2}>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>File 1</th>
                  <th>File 2</th>
                </tr>
              </thead>
              <tbody>
                
                <tr>
                  <td>Effort required (Person-Month)</td>
                  <td>{(result.metrics1.E)}</td>
                  <td>{result.metrics2.E}</td>
                </tr>
                <tr>
                  <td>Time required (Seconds)</td>
                  <td>{result.metrics1.T}</td>
                  <td>{result.metrics2.T}</td>
                </tr>
                <tr>
                  <td>Cost (Naira)</td>
                  <td>{(result.metrics1.cost)*dollar}</td>
                  <td>{(result.metrics2.cost)*dollar}</td>
                </tr>
                <tr>
                  <td>Best</td>
                  <td colSpan={2}>{result.winner}</td>
                  {/* <td>{result.loser}</td> */}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </>
    </div>
    </>
  );
}

export default Main;