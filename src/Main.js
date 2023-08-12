import React, { useState } from 'react';
import './index2.css';
import NavigationBar from './Navbar2';
// import {  useNavigate} from 'react-router-dom';


function Main() {
  const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [file1, setFile1] = useState('');
    const [file2, setFile2] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [result, setResult] = useState(null);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (file1 && file2) {
      const formData = new FormData();
      formData.append('file1', file1);
      formData.append('file2', file2);
      formData.append('title', title);
      formData.append('desc', desc);

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
          setResult(data)
          setIsPending(false);
          setError(null);
          // localStorage.setItem('comparisonResult', JSON.stringify(data));
          // Store the new result along with previous results
        // const storedResults = localStorage.getItem('comparisonResults');
        // const parsedResults = storedResults ? JSON.parse(storedResults) : [];
        // const updatedResults = [...parsedResults, data];
        // localStorage.setItem('comparisonResults', JSON.stringify(updatedResults));
          // navigate('/result');


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

      <h1>Select two code file: </h1>
      

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
        <div className="file-upload">
          <label htmlFor="file1">
            <input
              type="file"
              name="file1"
              id="file1"
              onChange={handleFile1Change}
              required
            />
            <span>Choose File 1</span>
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
            <span>Choose File 2</span>
          </label>
        </div>
        {/* <button type="submit">Calculate Metrics</button> */}
        {!isPending && <button type="submit">Compare</button>}
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
          <div className="result">
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
                  <td>Effort required</td>
                  <td>{result.metrics1.E}</td>
                  <td>{result.metrics2.E}</td>
                </tr>
                <tr>
                  <td>Time required</td>
                  <td>{result.metrics1.T}</td>
                  <td>{result.metrics2.T}</td>
                </tr>
                <tr>
                  <td>Cost</td>
                  <td>{result.metrics1.cost}</td>
                  <td>{result.metrics2.cost}</td>
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