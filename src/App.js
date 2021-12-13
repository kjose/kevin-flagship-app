import './App.css';
import { useState } from "react";
import { FlagshipProvider, useFsModifications } from "@flagship.io/react-sdk";
// https://kevin-flagship-api.herokuapp.com/api?vid=v1

const preStyle = {
  maxWidth: "100%",
  width: "100%",
  whiteSpace: "pre-wrap",
}

const FSApiCall = ({vid, apikey, envid}) => {
  const [response, setResponse] = useState("");

  fetch("https://kevin-flagship-api.herokuapp.com/api?vid=" + vid + "&apikey=" + apikey + "&envid=" + envid).then(r => {
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

const FSCall = ({envid, apikey, vid}) => {

  return (
    <>
      <h2>FS response called by Front</h2>
      <FlagshipProvider
        envId={envid}
        apiKey={apikey} // <= Required in next major release
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
  const [envid, setEnvID] = useState("0");
  const [apikey, setApiKey] = useState("abc");
  const [vid, setVID] = useState("0");

  const handleSubmit = (event) => {
    event.preventDefault();
    setEnvID(event.target.elements.envid.value);
    setApiKey(event.target.elements.apikey.value);
    setVID(event.target.elements.vid.value);
  }

  return (
    <div className="App">
      <h1>FS test debug (simultaneous calls)</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Env ID: 
          (chosen : {envid})
          <br/>

          <input type="text" name="envid" />
        </label><br/>
        <label>
          API key: 
          (chosen : {apikey})
          <br/>

          <input type="text" name="apikey" />
        </label><br/>
        <label>
          Visitor ID:  
          (chosen : {vid})
          <br/>

          <input type="text" name="vid" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <FSCall envid={envid} apikey={apikey} vid={vid} />
      <FSApiCall envid={envid} apikey={apikey} vid={vid} />
      
    </div>
  );
}

export default App;
