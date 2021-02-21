import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

const Title = styled.div`
  font-size: 40px;
  font-weight: bolder;
`

const SubTitle = styled.div`
  font-size: 30px;
  margin-left: 5vw;
`

export default () => (
  <div className="has-text-centered">
      <div className="container">
        <Title>Welcome to My test Question 1-2</Title>
        <SubTitle>You can select question on the bottom side.</SubTitle>
        <SubTitle>
          <Link to='/question1'>
            - Question 1
          </Link>
        </SubTitle>
        <SubTitle>
          <Link to='/question2'>
            - Question 2
          </Link>
        </SubTitle>
      </div>
  </div>
)
