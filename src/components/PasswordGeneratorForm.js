import React from 'react';
import {FormGroup,FormControl,Button} from 'react-bootstrap';

export class PasswordGeneratorForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            password:'',
            length:6,
            lowerCaseList:["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
            upperCaseList:["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            numsList:["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
            symbolsList:["!", "#", "$", "%", "&", "(", ")", "+", "-", "/", ":", ";", "@", "[", "\\", "]", "^", "_", "|", "~"]
        }
        this.secureRandomMapper = this.secureRandomMapper.bind(this)
        this.getRandomInt = this.getRandomInt.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this)
     
    }

    getRandomInt(min, max) {
        var byteArray = new Uint8Array(1);
        window.crypto.getRandomValues(byteArray);
        var max_range = 256;
        var range = max - min + 1;
        if (byteArray[0] >= Math.floor(max_range / range) * range)
            return this.getRandomInt(min, max);
        return min + (byteArray[0] % range);
    }
    secureRandomMapper(passLength, max) {
        var randomArrayMapped = [];
        for (var i = 0; i < passLength; i++) {
            randomArrayMapped.push(this.getRandomInt(0, max));
        }
        return randomArrayMapped;
    }
    passPool=(e)=> {
        var poolArray = [];
        var up = document.getElementById("upper").checked;
        var low = document.getElementById("lower").checked;
        var num = document.getElementById("nums").checked;
        var sym = document.getElementById("symbols").checked;
        if (up)
            poolArray = poolArray.concat(this.state.upperCaseList);
        if (low)
            poolArray = poolArray.concat(this.state.lowerCaseList);
        if (num)
            poolArray = poolArray.concat(this.state.numsList);
        if (sym)
            poolArray = poolArray.concat(this.state.symbolsList);
        return poolArray;
    }
    generatePass =(e)=> {
        var passLength = this.state.length;
        var charPool = this.passPool();
        var passPositions = this.secureRandomMapper(passLength, charPool.length - 1);
        var generatedPass = [];
        for (var i = 0; i < passLength; i++)
            generatedPass.push(charPool[passPositions[i]]);
        this.setState({
            password:generatedPass.join('')
        })
        this.props.onChange(generatedPass.join('')) 
        
    }
    handleKeyUp(){
        this.props.onChange(this.state.password);
    }
    handleChange =(e)=>{
        const target = e.target;
        const name = target.name;
        const value = target.value
        this.setState({
            [name]:value,
        })
    }
    copyPass=(e)=> {
        var copyPass = document.querySelector("input[name='password']");
        copyPass.select();
        document.execCommand("copy");
    }
    render(){
        const {password,length}=this.state;
        const slider ={
            width:'80%',
            marginLeft:'auto',
            marginRight:'auto'
        }
        return(
            <div>
                <FormGroup id="genPass">
                    <FormControl onKeyUp={this.handleKeyUp} onChange={this.handleChange} name="password" type="text" placeholder="Password" value={password}/>
                    <span><Button onClick={this.copyPass} bsStyle='info' id="copyButton"><i className="fa fa-copy"></i></Button></span>
                </FormGroup>
                <FormGroup className="sliderContainer">
                    <FormControl onChange={this.handleChange} style={slider} type="range" min="1" max="99" defaultValue='6' className="slider" name="length" id='size' />
                    <label htmlFor="size"> Length: {length}</label><span id="sizeValue"></span>
                </FormGroup>
                <FormGroup className="options">
                    <label htmlFor="upper"><FormControl type="checkbox"  id="upper" className="upper" />Uppercase</label>
                    <label htmlFor="lower"><FormControl type="checkbox" id="lower" className="lower" />Lowercase</label>
                    <label htmlFor="nums"><FormControl type="checkbox"  id="nums" className="nums" />Numbers</label>
                    <label htmlFor="symbol"><FormControl type="checkbox"  id="symbols" className="symbols" />Symbols</label>
                </FormGroup>
                <FormGroup style={{textAlign:'center'}}>
                    <Button onClick={this.generatePass} bsStyle='warning' type="button" id="generateBtn">Generate Password</Button>
                </FormGroup>
            </div>
        )
    }
}