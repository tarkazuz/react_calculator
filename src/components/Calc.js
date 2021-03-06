import React, {Component} from 'react';
import './calc.css'

/* eslint no-eval: 0 */

class Calc extends Component{
    constructor(props){
        super(props);
        this.state={
            currentCount: 0,
            previousChar: "",
            result: 0,
            error: false
        }

        this.onReset = this.onReset.bind(this);
        this.onEqual = this.onEqual.bind(this);
        this.handleButtonActivate=this.handleButtonActivate.bind(this);
        this.onKeybordClick=this.onKeybordClick.bind(this);
    }

    onKeyClick(value){
        this.handleButtonActivate(value);
        
        if(this.state.result || this.state.error){
            this.onReset();
            if(value >= 0 && value <= 9){
                this.setState({
                currentCount: value
            })
            }

        }else if(!this.state.currentCount){
            if( value >= 0 && value <= 9){
            this.setState({
                currentCount: value
            })
            }
        }else if(this.state.currentCount.length < 26){
            if (value !== "0" && value !== "+" && value!=="." && value!=="-" && value!=="*"){
                    this.setState({
                        currentCount: this.state.currentCount + value
                    })
            }else if ( this.state.previousChar!=="-" && 
            this.state.previousChar!=="+" &&
            this.state.previousChar!=="*" &&
            this.state.previousChar!=="."){
                    this.setState({
                        currentCount: this.state.currentCount + value
                    })
            }
        
        this.setState({
            previousChar: value
        })
    }
}

    onKeybordClick(e){
        if((e.key>=0 && e.key <=9) && e.key !== " " || e.key==="=" || e.key === "+" || e.key==="-" || e.key==="*" || e.key==="."  ){

            const val = e.key;
            if (val >= 0 && val <= 9) { 
            this.handleButtonActivate(e.key);
                if (this.state.result || this.state.error){
                    this.onReset();
                    this.setState({
                        currentCount: val
                    })
                }else if(!this.state.currentCount){
                        this.setState({
                        currentCount: val
                        })
                }else if(this.state.currentCount.length < 26){
                        if (val !== "0"){
                                this.setState({
                                    currentCount: this.state.currentCount + val
                                })
                        }
                }
            }else if (e.key!=="=" || e.key === "+" || e.key==="-" || e.key==="*" || e.key==="." ){
                if( this.state.previousChar!=="-" && 
                    this.state.previousChar!=="+" &&
                    this.state.previousChar!=="*" &&
                    this.state.previousChar!=="."){
                            this.setState({
                                currentCount: this.state.currentCount + val
                            })
                }
            }else if (e.key === '='){
                this.onEqual();
            } 
        this.setState({
            previousChar: val
        })
    }
}

    handleButtonActivate(eventValue){
        if(eventValue==="+"){
            document.querySelector(`#buttonPlus`).classList.toggle('toggled');
            setTimeout(() =>{
                document.querySelector(`#buttonPlus`).classList.remove('toggled');
            },500); 
        } else if(eventValue==="*"){
            document.querySelector(`#buttonTimes`).classList.toggle('toggled');
            setTimeout(() =>{
                document.querySelector(`#buttonTimes`).classList.remove('toggled');
            },500); 
        }else if(eventValue==="."){
            document.querySelector(`#buttonDot`).classList.toggle('toggled');
            setTimeout(() =>{
                document.querySelector(`#buttonDot`).classList.remove('toggled');
            },500); 
        }else{

        document.querySelector(`#button${eventValue}`).classList.toggle('toggled');
        setTimeout(() =>{
            document.querySelector(`#button${eventValue}`).classList.remove('toggled');
        },500);
    }}

    onReset(){
        this.setState({
            currentCount: 0,
            result: 0,
            error: false
        })
    }

    onEqual(){
        try{
        if(this.state.currentCount){
                const sum =  eval(this.state.currentCount);
                if(sum.toString().length < 18){
                    this.setState({
                        result: sum
                    })
                }else{
                    this.setState({
                        result: sum.toString().slice(14) +"ee"
                    })
                }
            }
        }
        catch(e){
            this.setState({
                error: true
            })
        }
    }


     render(){
        return(
             <div >
             
  
                <h1>My retro calculator</h1>
                {document.addEventListener('keyup', this.onKeybordClick)}
                <div id="display">

                    <div id="results">
                        <h3 id="typeface">{this.state.currentCount}</h3>
                        {this.state.result ? 
                            <h2>{this.state.result}</h2> : null }
                        {this.state.error ? <p>Error. Please try again.</p> : null }
                    </div>
               
               <div id="keyPad">
                <div className="container">
                    <button value='1' id='button1' onClick={(e)=> this.onKeyClick(e.target.value)}
                    >1</button>
                    <button value='2' id='button2' onClick={(e)=> this.onKeyClick(e.target.value)}>2</button>
                    <button value='3' id='button3' onClick={(e)=> this.onKeyClick(e.target.value)}>3</button>
                    <button value ='+' id='buttonPlus' onClick={(e)=>this.onKeyClick(e.target.value)}>+</button>
                </div>
                <div className="container">
                    <button value='4' id='button4' onClick={(e)=> this.onKeyClick(e.target.value)}>4</button>
                    <button value='5' id='button5' onClick={(e)=> this.onKeyClick(e.target.value)}>5</button>
                    <button value='6' id='button6' onClick={(e)=> this.onKeyClick(e.target.value)}>6</button>
                    <button value='-' id='button-' onClick={(e)=>this.onKeyClick(e.target.value)}>-</button>
                </div>
                <div className="container">
                    <button value='7' id='button7' onClick={(e)=> this.onKeyClick(e.target.value)}>7</button>
                    <button value='8' id='button8' onClick={(e)=> this.onKeyClick(e.target.value)}>8</button>
                    <button value='9' id='button9' onClick={(e)=> this.onKeyClick(e.target.value)}>9</button>
                    <button value='*' id='buttonTimes' onClick={(e)=>this.onKeyClick(e.target.value)}>×</button>
                </div>
                <div className="container">
                    <button value='0'  id='button0' onClick={(e)=> this.onKeyClick(e.target.value)}>0</button>
                    <button value='.' id='buttonDot' onClick={(e)=> this.onKeyClick(e.target.value)}>.</button>
                    <button value='=' id='button=' onClick={this.onEqual}>=</button>
                    <button value='C' id='buttonC' onClick={this.onReset}>C</button>
                </div>
             </div>
             </div>
                    <p>*Yes, it is upside-down. <br/>But why are calculators always stacked bottom to top?</p>
             </div>
        );
    }}

export default Calc;