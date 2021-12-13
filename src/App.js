import './App.css';
import { useState } from "react";
import { FlagshipProvider, useFsModifications } from "@flagship.io/react-sdk";
// https://kevin-flagship-api.herokuapp.com/api?vid=v1

const preStyle = {
  maxWidth: "100%",
  width: "100%",
  whiteSpace: "pre-wrap",
}

const FSApiCall = ({vid}) => {
  const [response, setResponse] = useState("");

  fetch("https://kevin-flagship-api.herokuapp.com/api?vid=" + vid).then(r => {
    r.text().then(data => {
      setResponse(data);
    })
  });
  
  return (
    <>
      <h2>FS response called by API</h2>
      <pre style={preStyle}>
        {response}
      </pre>
    </>
  );
}

const FSComponent = () => {
  const fsModifications = useFsModifications([
    {
      key: "evaluationHourPrice",
      defaultValue: "1000% (default value)",
      activate: false,
    },
  ]);
  return (
    <div
      style={{
      }}
    >
    {"Price = " + fsModifications.evaluationHourPrice}
    </div>
  );
};

const FSCall = ({vid}) => {

  return (
    <>
      <h2>FS response called by Front</h2>
      <FlagshipProvider
        envId="bvvol5cmicqk8sigckng"
        apiKey="d5UIKzy8Lp58DuASSGmS3dHECjXtpus1mHRtdwe7" // <= Required in next major release
        visitorData={{
          id: vid,
          context: {
            // some context
          },
        }}
        enableConsoleLogs={true}
      >

        <FSComponent />

      </FlagshipProvider>
    </>
  )
};


function App() {
  const [vid, setVID] = useState("0");

  const handleSubmit = (event) => {
    event.preventDefault();
    setVID(event.target.elements.vid.value);
  }

  return (
    <div className="App">
      <h1>FS test debug (simultaneous calls)</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Visitor ID: 
          (chosen : {vid})
          <br/>

          <input type="text" name="vid" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <FSCall vid={vid} />
      <FSApiCall vid={vid} />
      
    </div>
  );
}

export default App;
