import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

const translateApiPath = NL_PATH + "/google-translate-api/translate.js";
const translateDataPath = NL_PATH + "/google-translate-api/translate-data.json";

function App() {
  const [text, setText] = useState('hello');
  const [translated, setTranslated] = useState<any>();
  const translate = async () => {
    var data = {
      "text": text,
      "from": "en",
      "to": ["zh-TW"]
    };
    await Neutralino.filesystem.writeFile(translateDataPath, JSON.stringify(data));
    let commandOut = await Neutralino.os.execCommand(NL_NODE_NAME + ' ' + translateApiPath);
    setTranslated(JSON.parse(commandOut.stdOut));
  };
  return (
    <div className="App">
      <div className="Translate">
        <input type="text" value={text} onChange={e => setText(e.target.value)}/>
        <br/>
        <button onClick={translate}>Translate</button>
        <br/>
        <pre>
          {JSON.stringify(translated, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;
