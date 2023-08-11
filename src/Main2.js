import { useState } from "react";
import NavigationBar from "./Navbar2";

const Main2 = () => {
    
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [file1, setFile1] = useState('');
    const [file2, setFile2] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [result, setResult] = useState(null);



  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handledDescChange = (event) => {
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
    
        //   fetch('http://127.0.0.1:8000/project/compare/', {
        //     credentials: 'include',

        //     method: 'POST',
        //     // headers: { 'Content-Type': 'application/json' },
        //     headers:{},
        //     // body: JSON.stringify(formData),
        //     body: formData,
        //   })
        //   console.log(formData)
        fetch('http://127.0.0.1:8000/project/compare/', {
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
        <div>
            <NavigationBar/>
            <h2>Select two Code files:</h2>
            <form onSubmit={handleSubmit}>
                <div className="text-input">
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text"
                        id="title"
                        name="title"
                        onChange={handleTitleChange}
                        value={title}
                    />
                </div>
                <div className="text-input">
                    <label htmlFor="desc">Description:</label>
                    <input
                        type="text" 
                        id="desc"
                        name="desc"
                        onChange={handledDescChange}
                        value={desc}
                    />
                </div>
                <div className="inputs">
                    <div className="file-input">
                        <label htmlFor="file1">File 1:</label>
                        <input
                            type="file"
                            id="file1"
                            onChange={handleFile1Change}
                            name="file1"
                            required 

                        />
                        {/* {file && <p>{file.name}</p>} */}
                    </div>

                    <div className="file-input">
                        <label htmlFor="file2">File 2:</label>
                        <input 
                            type="file" 
                            id="file2" 
                            onChange={handleFile2Change}
                            name="file2" 
                            required
                        />
                        {/* {file && <p>{file.name}</p>} */}
                    </div>
                </div>
                <center> <div className="submit">
                    {!isPending && <button>Submit</button>}
                    {isPending && <button disabled>Loading...</button>}
                    {error && <div className='error'>{error}</div>}
                    {/* <button type="submit">Submit</button> */}
                </div></center>
            </form>
            {result && (
        <div>
          <h2>Comparison Result</h2>
          <p>Winner: {result.winner}</p>
          <p>Loser: {result.loser}</p>
          <h3>Metrics for File 1</h3>
          <p>n1: {result.metrics1.n1}</p>
          <p>n2: {result.metrics1.n2}</p>
          <p>N: {result.metrics1.N}</p>
          <p>V: {result.metrics1.V}</p>
          <p>D: {result.metrics1.D}</p>
          <p>E: {result.metrics1.E}</p>
          <p>T: {result.metrics1.T}</p>
          <h3>Metrics for File 2</h3>
          <p>n1: {result.metrics2.n1}</p>
          <p>n2: {result.metrics2.n2}</p>
          <p>N: {result.metrics2.N}</p>
          <p>V: {result.metrics2.V}</p>
          <p>D: {result.metrics2.D}</p>
          <p>E: {result.metrics2.E}</p>
          <p>T: {result.metrics2.T}</p>
          <p>Code {result.winner} is the best</p>
        </div>
      )}
        </div>
    );
}

export default Main2;