import { useEffect, useState } from 'react';
import MathJax from 'mathjax3-react';
import ReactLoading from 'react-loading';
import { Typography } from '@material-ui/core';
import './problem.css'
import Editor from '../CodingSpace/Editor'
import { DropdownButton, Dropdown, Badge } from 'react-bootstrap';
import { API } from '../../api/index';
import { Container, Row, Col } from 'react-grid-system';
import UserInputOutput from '../CodingSpace/UserInputOutput';
import axios from 'axios';
import { useHistory } from 'react-router';

const Problem = (props) => {

    const [problem, setProblem] = useState({})
    const [loading, setLoading] = useState(true)
    const [testcases, setTestcases] = useState([])
    const [code, setCode] = useState('')
    const [codeMirrorMode, setCodeMirrorMode] = useState('clike')
    const [codeLanguage, setCodeLanguage] = useState('cpp')
    const [userOutput, setuserOutput] = useState('')

    const history = useHistory()
    const [userInput, setUserInput] = useState('')

    const languageOptions = {
        "C++": "clike",
        "Java": "clike",
        "C": "clike",
        "Python": "python"
    }



    const buttonHandlerIDE = (type) => {
        const storage = JSON.parse(localStorage.getItem('profile'))
        // console.log(storage)
        if(storage === null) {
            history.push('/auth')
        }
        let token = storage.token
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${token}`
        }
        API.post('http://localhost:5000/compile/submit', 
        {"code": code, "language": codeLanguage, "userInput": userInput, "problemID": problem._id, "submissionType": type},
        {headers: headers}
        )
        .then( (res) => {
            console.log(res);
            setuserOutput(res.data.output)
        })
    }

    // console.log(problemURL)
    useEffect(() => {
        const problemURL = 'http://localhost:5000/api/problem?problemID=' + props.match.params.id
        fetch(problemURL)
            .then((data) => data.json())
            .then(data => {
                setProblem(data);
                setLoading(false);
                const tc = []
                for (let i = 0; i < data.input.length; i++) {
                    // console.log(data.input[i])
                    tc.push([data.input[i], data.output[i]])
                }
                setTestcases(tc)
            })
    }, [])
    const loadingOptions = {
        type: "spin",
        color: "#347deb",
    }

    return (
        <>
            {/* TODO --------------------------------->>> Need to design and put tags and stuff */}
            {loading ? <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh'

            }}><ReactLoading type={loadingOptions.type} color={loadingOptions.color} height={100} width={100} /></div> :
                <>
                <Container>
                    <Row>
                    <Col sm={6}>

                    <Typography variant='h3' style={{
                        textAlign: 'center',
                        textTransform: 'capitalize',
                        color: 'white'
                    }}>{problem.name}</Typography><br></br>
                    {/* works but all comes on a single line react-mathjax(package) and need to mention \text{} explicitly to avoid spaces removal*/}
                    {/* <MathJax.Provider>
                    <p>
                        <MathJax.Node formula={problem.statement} />
                    </p>
                </MathJax.Provider> */}

                    <MathJax.Provider
                        url="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
                        options={{
                            tex: {
                                inlineMath: [['$$$', '$$$'], ['$$$', '$$$']]
                            }
                        }}
                    >

                    <div className='class-div'> <MathJax.Html html={problem.statement} /> </div>
                    </MathJax.Provider>
                    <br></br>
                    <Typography variant='h4' style={{
                        color: 'white'
                    }}>Sample testcases</Typography>

                    <div>
                        {testcases.map((testcase, i) => {
                            return (<div>
                                <Typography variant='h6' style={{color: 'white'}}>Input</Typography>
                                <p style={{ whiteSpace: "pre-wrap", color: 'white' }}>{testcase[0]}</p><br></br>
                                <Typography variant='h6' style={{color: 'white'}}>Output</Typography>
                                <p style={{ whiteSpace: "pre-wrap", color: 'white' }}>{testcase[1]}</p><br></br><br></br>
                            </div>)
                        })}
                    </div>
                   
                    </Col>
                    <Col sm={6}>
                    <DropdownButton id="dropdown-basic-button" title="Language">
                        {Object.keys(languageOptions).map( (key, index) => {
                            return (<Dropdown.Item href='#' onClick={() => {setCodeMirrorMode(languageOptions[key]); setCodeLanguage(key)}}>{key}</Dropdown.Item>)
                        })}
                    </DropdownButton>
                    <Editor code={code} languageMode={codeMirrorMode} onChange={setCode} buttonHandlerIDE={buttonHandlerIDE}/>
                    <br/>
                    <Badge bg="success">Input</Badge>
                    <UserInputOutput text={userInput} onChange={setUserInput} isInput={true}/>
                    <Badge bg="success">Output</Badge>
                    <UserInputOutput text={userOutput} isInput={false}/>
                    </Col>
                    </Row>
                    </Container>
                </>
            }
        </>
    );
}

export default Problem;