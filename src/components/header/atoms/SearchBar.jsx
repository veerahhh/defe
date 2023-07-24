import React, { useCallback, useState } from 'react'
import './Search.css'
import { Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { SearchValue } from '../../../redux/reducer/HeaderReducer'
import * as Cg from 'react-icons/cg'
import * as Md from 'react-icons/md'

function SearchBar() {

  const dispatch = useDispatch()

  const [searchOpen, setSearchOpen] = useState(false)

  const actionSearch = useSelector((state) => state.Header.ActionButton.status)
  const actionData = useSelector((state) => state.Header.ActionButton.data)
  const searchData = useSelector((state) => state.Header.Search.value)

  const data = actionData.map(function (val) {
    return val.searchText[actionSearch.replaceAll(' ', '')]
  })

  const searchBar = actionData.map(function (value) {
    return value.search
  })

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args);
      }, 1000)
    }
  }

  const onChange = (e) => {
    dispatch(SearchValue({ value: e.target.value }))
    e.target.value.length == 0 ? setSearchOpen(false) : setSearchOpen(true)
  }

  const searchOptimiser = useCallback(debounce(onChange), [])

  return (
    <div className={searchBar[0] == true ? 'Search-Parent-Container' : 'Search-Parent-Container-None'} >

      {searchOpen && <Input className='Search-Bar-Input' placeholder={data} onMouseEnter={() => { setSearchOpen(true) }} onChange={searchOptimiser} />}
      <div className={searchOpen === false ? 'Search-Button-Container-Close' : 'Search-Button-Container-Open'} onMouseEnter={() => { setSearchOpen(true) }} >
        <Cg.CgSearch className='Search-Icon' size={16} style={{ display: ((searchOpen === false ? "block" : "none")) }} />
        <Md.MdChevronRight className='Search-Icon' size={17} onClick={() => { setSearchOpen(false) }} style={{ display: ((searchOpen !== false ? "block" : "none")) }} />
      </div>

      {/* {searchOpen && <Input className='Search-Bar-Input' placeholder={data} onMouseEnter={() => { setSearchOpen(true) }} onChange={searchOptimiser} onMouseLeave={() => { setSearchOpen(false) }} />}
      <div className={searchOpen === false ? 'Search-Button-Container-Close' : 'Search-Button-Container-Open'} onMouseEnter={() => { setSearchOpen(true) }} onMouseLeave={() => { setSearchOpen(false) }}>
        <Cg.CgSearch className='Search-Icon' size={16} />
      </div> */}

    </div>
  )
}

export default SearchBar