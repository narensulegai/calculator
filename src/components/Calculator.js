import React, {useEffect, useRef, useState} from 'react';
import {create, all} from 'mathjs';

const math = create(all)

math.config({number: 'BigNumber', epsilon: 1e-60})

const mj = function (tex) {
    return window.MathJax.tex2svg(tex, {em: 16, ex: 6, display: false});
}

const calculate = (expression) => {
    return math.format(math.evaluate(expression), {notation: 'fixed'})
}

// remove anything that is not 0-9 ^ * / ( ) + -
const cleanExpression = (e) => {
    return e.replace(/[^0-9^*+-./()]/gi, '')
}

const Calculator = () => {

    const [expression, setExpression] = useState('')
    const [isValid, setIsValid] = useState(true)

    const formatRef = useRef()

    const handleOnButtonClick = (e) => {
        setExpression(expression => cleanExpression(expression + e));
    }

    const handleOnClear = () => {
        setExpression('')
    }
    const handleOnEvaluate = () => {
        setExpression(calculate(expression))
    }
    const handleOnExpressionChange = (e) => {
        setExpression(cleanExpression(e.target.value))
    }

    useEffect(() => {
        formatRef.current.innerHTML = ''
        if (expression !== '') {
            try {
                const parsed = math.parse(expression)
                formatRef.current.append(mj(parsed.toTex({parenthesis: 'keep'})))
                setIsValid(true)
            } catch (e) {
                formatRef.current.textContent = e.message
                setIsValid(false)
            }
        }
    }, [expression])

    return (
        <div className="calculator">
            <textarea
                className="display"
                type="text"
                name="expression"
                value={expression}
                onChange={handleOnExpressionChange}/>
            <label htmlFor="expression" className="formatted-display" ref={formatRef}></label>
            <div className="keypad">
                <button className="button dark small-font" onClick={handleOnClear}>AC</button>
                <button className="button dark" onClick={() => handleOnButtonClick('(')}>(</button>
                <button className="button dark" onClick={() => handleOnButtonClick(')')}>)</button>
                <button className="button bright" onClick={() => handleOnButtonClick('/')}>/</button>
                <button className="button" onClick={() => handleOnButtonClick(7)}>7</button>
                <button className="button" onClick={() => handleOnButtonClick(8)}>8</button>
                <button className="button" onClick={() => handleOnButtonClick(9)}>9</button>
                <button className="button bright" onClick={() => handleOnButtonClick('*')}>X</button>
                <button className="button" onClick={() => handleOnButtonClick(4)}>4</button>
                <button className="button" onClick={() => handleOnButtonClick(5)}>5</button>
                <button className="button" onClick={() => handleOnButtonClick(6)}>6</button>
                <button className="button bright" onClick={() => handleOnButtonClick('-')}>-</button>
                <button className="button" onClick={() => handleOnButtonClick(1)}>1</button>
                <button className="button" onClick={() => handleOnButtonClick(2)}>2</button>
                <button className="button" onClick={() => handleOnButtonClick(3)}>3</button>
                <button className="button bright" onClick={() => handleOnButtonClick('+')}>+</button>
                <button className="button" onClick={() => handleOnButtonClick(0)}>0</button>
                <button className="button bright small-font" onClick={() => handleOnButtonClick('.')}>.</button>
                <button className="button bright small-font" onClick={() => handleOnButtonClick('^')}>EXP</button>
                <button className="button evaluate" disabled={!isValid} onClick={handleOnEvaluate}>=</button>
            </div>

        </div>
    );
};

export default Calculator;
