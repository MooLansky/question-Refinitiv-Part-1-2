import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components'
import { Input, Table, Tag, Space } from 'antd';

const { Search } = Input;

const Container = styled.div`
  padding: 10px;
  overflow-y: scroll;
  height: 100vh;
`

const Header = styled.div`
  padding: 10px;
`

const Body = styled.div`
`

const StyleFilter = styled.select`
  height: 32px;
  padding: 4px 11px;
  text-overflow: '';
  text-indent: 0.01px;
  border: 1px solid #d9d9d9;
  margin-right: 10px;
`

const StyleInput = styled.input`
  background-position: 10px 10px;
  background-repeat: no-repeat;
  width: 100%;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
`

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  }
]

let typingTimer

function Question2(props) {
  const [filter, setFilter] = useState('all')
  const [data, setData] = useState([])
  const [searchData, setSearchData] = useState()

  const [dataInTable, setDataInTable] = useState([])

  const handleSearch = (e) => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(function(){
      setSearchData(e.target.value)
    }, 500)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    axios.get('https://api.publicapis.org/categories').then(response => {
      const responseData = response.data.map(val => { return {name: val} } )
      setData(responseData)
      setDataInTable(responseData)
    })
  }, [])

  useEffect(() => {
    let result = data
    if (filter !== 'all' && !searchData) {
      result = data.filter(val => val.name === filter)
      setDataInTable(result)
    } else if (filter !== 'all' && searchData) {
      result = data.filter(val => val.name === filter)
      result = result.filter(val => val.name.toLowerCase().indexOf(searchData.toLowerCase()) >= 0)
      setDataInTable(result)
    } else if (filter === 'all' && searchData) {
      result = data.filter(val => val.name.toLowerCase().indexOf(searchData.toLowerCase()) >= 0)
      setDataInTable(result)
    } else {
      setDataInTable(result)
    }
  },[filter, searchData])


  return (
    <Container>
      <Header>
        <span>
          <label>Filter : </label>
          <StyleFilter value={filter} onChange={(e) => handleFilter(e)}>
            <option value={'all'}>All</option>
            {
              data.length > 0 ?
                data.map(val => {
                  return <option value={val.name}>{val.name}</option>
                }) : null
              }
          </StyleFilter>
        </span>
        <span>
          <label>Search : </label>
          <Search placeholder="input search text" onChange={e => handleSearch(e)} style={{ width: 200 }} />
        </span>
      </Header>
      <Body>
        <Table columns={columns} dataSource={dataInTable} />
      </Body>
    </Container>
  );
}

export default Question2