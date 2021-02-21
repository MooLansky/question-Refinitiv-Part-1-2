import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  overflow-y: scroll;
  display: flex;
  height: 100vh;
`

const FirstColumn = styled.div`
  min-width: 200px;
  border-right: solid 1px black;
`

const SecondColumn = styled.div`
  min-width: 100px;
  width: 100%;
  border-right: solid 1px black;
`

const LastColumn = styled.div`
  min-width: 300px;
`

let typingTimer

function Question1 () {
  const [inputNumber, setInputNumber] = useState()
  const [selectMode, setSelectMode] = useState('isPrime')
  const [result, setResult] = useState(false)


  const checkNumberIsInteger = (number) => {
    if(number < 0) {
      setInputNumber(1)
    } else {
      setInputNumber(Math.round(number))
    }
  }

  const handleInputNumber = (e) => {
    setInputNumber(e.target.value)
    const number = parseFloat(e.target.value)
    if (!Number.isNaN(number)){
      clearTimeout(typingTimer)
      typingTimer = setTimeout(function(){
        checkNumberIsInteger(number)
      }, 500)
    }
  }

  const handleSelectMode = (e) => {
    setSelectMode(e.target.value)
  }

  const checkIsPrime = (number) => {
    for(let i = 2; i < number; i++)
      if(number % i === 0) return false
    return number > 1
  }

  const checkIsFibonacci = (number, count = 1, last = 0) => {
    if(count < number){
       return checkIsFibonacci(number, count+last, count)
    };
    if(count === number){
       return true
    }
    return false
 };

  useEffect(() => {
    if(selectMode === 'isPrime') {
      const result = checkIsPrime(inputNumber)
      setResult(result)
    } else if (selectMode === 'isFibonacci') {
      const result = checkIsFibonacci(inputNumber)
      setResult(result)
    }

  },[inputNumber, selectMode])

  return (
    <Container>
      <FirstColumn>
        <input type='number' value={inputNumber} onChange={(e) => handleInputNumber(e)}/>
      </FirstColumn>
      <SecondColumn>
      <select value={selectMode} onChange={(e) => handleSelectMode(e)}>
        <option value="isPrime">isPrime</option>
        <option value="isFibonacci">isFibonacci</option>
      </select>
      </SecondColumn>
      <LastColumn>
        {`${result}`}
      </LastColumn>
    </Container>
  )
}

export default Question1