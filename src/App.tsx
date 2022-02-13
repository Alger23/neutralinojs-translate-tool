import React, {ReactNode, useState} from 'react';
import './App.css';
import {
  Box,
  Button, ButtonGroup, Container, createTheme, CssBaseline,
  FormControl,
  InputLabel,
  MenuItem, Paper, Select, SelectChangeEvent,
  Table,
  TableBody, TableCell,
  TableContainer, TableRow,
  TextField, ThemeProvider
} from "@mui/material";
import CopySpan from "./components/CopySpan";
import {blue} from "@mui/material/colors";


const translateApiPath = NL_PATH + "/google-translate-api/translate.js";
const translateDataPath = NL_PATH + "/google-translate-api/translate-data.json";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

function App() {
  const [from, setFrom] = useState<string>("auto");
  const [toLangs, setToLangs] = useState<string[]>(['ja', 'en']);
  const [rawText, setRawText] = useState<string>('');
  const [translated, setTranslated] = useState<any>();

  const fromHandleChange = (e: SelectChangeEvent<string>, child: ReactNode) => {
    setFrom(e.target.value);
  };
  const toLangsHandleChange = (e: SelectChangeEvent<any>, child: ReactNode) => {
    setToLangs(e.target.value);
  };

  const openBrowser = () => {
    Neutralino.os.open(`https://translate.google.com/?sl=${from}&tl=${toLangs[0]}&text=${rawText}&op=translate`);
  };

  const translate = async () => {
    var data = {
      "text": rawText,
      "from": from,
      "to": toLangs
    };
    await Neutralino.filesystem.writeFile(translateDataPath, JSON.stringify(data));
    let commandOut = await Neutralino.os.execCommand(NL_NODE_NAME + ' ' + translateApiPath);
    let translatedResult = JSON.parse(commandOut.stdOut);
    setTranslated(translatedResult);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <main>
        <Box className="App"
             component="form"
             sx={{
               pt: 2,
               pb: 2,
             }}
             noValidate
             autoComplete="off">
          <Container>
            <FormControl fullWidth>
              <InputLabel id="from-label">From</InputLabel>
              <Select
                labelId="from-label"
                id="from"
                value={from}
                label="From"
                onChange={fromHandleChange}
                size="small"
              >
                <MenuItem value="auto">Auto Detect</MenuItem>
                <MenuItem value="zh-TW">zh-TW</MenuItem>
                <MenuItem value="ja">ja</MenuItem>
                <MenuItem value="en">en</MenuItem>
              </Select>
            </FormControl>

            <TextField
              select
              name="toLangs"
              id="toLangs"
              label="To"
              SelectProps={{
                multiple: true,
                value: toLangs,
                onChange: toLangsHandleChange
              }}
              fullWidth
              size="small"
              sx={{mt: 1}}
            >
              <MenuItem value="en">en</MenuItem>
              <MenuItem value="ja">ja</MenuItem>
              <MenuItem value="th">th</MenuItem>
              <MenuItem value="zh-CN">zh-CN</MenuItem>
              <MenuItem value="zh-TW">zh-TW</MenuItem>
            </TextField>

            <TextField name="text" placeholder="input text" multiline fullWidth
                       value={rawText}
                       onChange={(e) => setRawText(e.target.value)}
                       sx={{
                         mt: 1,
                         mb: '0!important'
                       }}/>


            <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group"
                         sx={{mt: 1}}>
              <Button onClick={translate}>Translate</Button>
              <Button onClick={openBrowser}>Browser</Button>
            </ButtonGroup>


            <TableContainer component={Paper} sx={{mt: 1}}>
              <Table>
                <TableBody>
                  {translated && Object.keys(translated).map((lang, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row" width={30}>
                        {lang}
                      </TableCell>
                      <TableCell>
                        {<CopySpan value={translated[lang].text}/>}
                        {<CopySpan value={translated[lang].pronunciation}/>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/*<div className="Translate">*/}
            {/*  <pre>{JSON.stringify(translated, null, 2)}</pre>*/}
            {/*</div>*/}

          </Container>
        </Box>
      </main>

    </ThemeProvider>
  );
}

export default App;
