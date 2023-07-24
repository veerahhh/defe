import { Card, Select, Col, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import './Payment.css'
import DM from '../../assests/images/Decision-Minds-Logo.svg'
// import IoIosArrowRoundForward from'react-icons'
import * as Io from 'react-icons/io'

import DMWhite from '../../assests/images/mx white.svg'
import DMFullLogo from '../../assests/images/datahub white.svg'

import axios from 'axios'

function Payment() {

  const [data, setData] = useState([])
  const [osselected, setOsselected] = useState('')
  const [regionselected, setRegionselected] = useState("")
  const [instanceTypeselected, setInstanceTypeselected] = useState("")
  const[ami,setAmi]=useState("")
  const[architecture, setAchitecture] = useState("")
  const[description, setDescription]=useState("")
  const[cpu,setCpu]=useState("")
  const[storage, setStorage]= useState("")
  const[memory, setMemory]=useState("")
  const[family,setFamily]=useState("")

 

  const { Option } = Select
  useEffect(() => {
    axios(`http://34.73.32.172:8000/price/`).then((response) => {
      // console.log(response.data)
      setData(response.data)
    }
    )

  }, [])


  const [price, setPrice] = useState('00.00')

  const oshandleChange = (value, e) => {
 
    setOsselected(value)
   
  };
  const regionhandleChange = (value) => {
    data.map((val, i) => {
      // console.log(val.cost)
      if (value == val.region_name ) {
        setPrice(val.Price)
      }
    })
    setRegionselected(value)
  };
  const instancehandleChange = (value) => {
    data.map((val, i) => {
      // console.log(val.cost)
      if (value == val.Instance_Type ) {
        setPrice(val.Price)
      }
    })
    setInstanceTypeselected(value)
  };
  const amihandleChange =(value)=>{
    data.map((val, i) => {
      // console.log(val.cost)
      if (value == val.ami ) {
        setPrice(val.Price)
      }
    })
    
    setAmi(value)
  }
  const architecturehandleChange =(value)=>{
    data.map((val, i) => {
      // console.log(val.cost)
      if (value == val.Architecture ) {
        setPrice(val.Price)
      }
    })
    setAchitecture(value)
  }
  const deschandleChange =(value)=>{
    data.map((val, i) => {
      // console.log(val.cost)
      if (value == val.Description ) {
        setPrice(val.Price)
      }
    })
    setDescription(value)
  }
  const familyhandleChange =(value)=>{
    data.map((val, i) => {
      // console.log(val.cost)
      if (value == val.Family ) {
        setPrice(val.Price)
      }
    })
    setFamily(value)
  }
  const memhandleChange =(value)=>{
    data.map((val, i) => {
      // console.log(val.cost)
      if (value == val.Memory ) {
        setPrice(val.Price)
      }
    })
    setMemory(value)
  }
  const cpuhandleChange = (value)=>{
    data.map((val, i) => {
      // console.log(val.cost)
      if (value == val.V_CPU ) {
        setPrice(val.Price)
      }
    })
    setCpu(value)
  }
const storagehandleChange=(value)=>{
  data.map((val, i) => {
    // console.log(val.cost)
    if (value == val.Storage ) {
      setPrice(val.Price)
    }
  })
  setStorage(value)
  
}

// const handle = (e,value)=>{
//   console.log({...option,[e.target.name]: value})
//   // setOption({...option,[e.target.name]: e.target.value})
// }

  return (
    <div className='payment_div'>
      <div className='payment_overall'>
        <div className='pay_logo'>
          <img src={DM} />
        </div>
        <Card className='payment_card'
          style={{ width: '75%' }}>
          <div >
            <p className='payment_Head'> <img className='pay_DMlogo' src={DMWhite} /> Pricing  Plans </p>
            <p className='pay_sub_text'>Check the cost estimation for datahub</p>
          </div>

          <div className='payment_box'>
            <Select 
              placeholder="Select Cloud Platform "
              size={'large'}
              style={{ width: 240, fontFamily: 'Nunito' }}
              // onChange={instancehandleChange}
            >
              <Option value="AWS" >
                AWS
              </Option>
              <Option disabled >
                GCP
              </Option>
              <Option disabled>
                Azure
              </Option>

            </Select>
            <Select
              placeholder="Region Name"
              size={'large'}
              style={{ width: 240, fontFamily: 'Nunito' }}
              onChange={regionhandleChange}
            >
              {data.map((val, key) => {
                return (
                  <Option value={val.region_name} key={key} >
                    {val.region_name}
                  </Option>
                )
              })}
            </Select>
            <Select
              placeholder="Amazon Machine Image"
              size={'large'}
              style={{ width: 240, fontFamily: 'Nunito' }}
              onChange={amihandleChange}

            >
              {data.map((val, key) => {
                return (
                  <Option value={val.ami} key={key} >
                    {val.ami}
                  </Option>
                )
              })}
            </Select>
            <Select
              placeholder="Architecture"
              size={'large'}
              style={{ width: 240, fontFamily: 'Nunito' }}
              onChange={architecturehandleChange}

            >
              {data.map((val, key) => {
                return (
                  <Option value={val.Architecture} key={key} >
                    {val.Architecture}
                  </Option>
                )
              })}
            </Select>
            <Select
              placeholder="Description"
              size={'large'}
              style={{ width: 240, fontFamily: 'Nunito' }}
              onChange={deschandleChange}
            >
              {data.map((val, key) => {
                return (
                  <Option value={val.Description} key={key} >
                    {val.Description}
                  </Option>
                )
              })}
            </Select>
            <Select
              placeholder="Instance type"
              size={'large'}
              style={{ width: 240, fontFamily: 'Nunito' }}
              onChange={instancehandleChange}
            >
              {data.map((val, key) => {
                return (
                  <Option value={val.Instance_Type} key={key} >
                    {val.Instance_Type}
                  </Option>
                )
              })}
            </Select>
            <Select
              placeholder="Family"
              size={'large'}
              style={{ width: 240, fontFamily: 'Nunito' }}
              onChange={familyhandleChange}
            >
              {data.map((val, key) => {
                return (
                  <Option value={val.Family} key={key} >
                    {val.Family}
                  </Option>
                )
              })}
            </Select>
            <Select
              placeholder="Memory"
              size={'large'}
              style={{ width: 240, fontFamily: 'Nunito' }}
              onChange={memhandleChange}

            >
              {data.map((val, key) => {
                return (
                  <Option value={val.Memory} key={key} >
                    {val.Memory}
                  </Option>
                )
              })}
            </Select>
            <Select
              placeholder="VCPU"
              size={'large'}
              style={{ width: 240, fontFamily: 'Nunito' }}
              onChange={cpuhandleChange}
            >
              {data.map((val, key) => {
                return (
                  <Option value={val.V_CPU} key={key} >
                    {val.V_CPU}
                  </Option>
                )
              })}
            </Select>
         
            <Select
              placeholder="Storage "
              size={'large'}
              style={{ width: 240, fontFamily: 'Nunito' }}
              onChange={storagehandleChange}
            >
              {data.map((val, key) => {
                return (
                  <Option value={val.Storage} key={key} >
                    {val.Storage}
                  </Option>
                )
              })}
            </Select>
          </div>
          <div className='pay_cost'>
            <p className='pay_cost_text'>cost : ${price}</p>
            <img className='pay_Datahud_logo' src={DMFullLogo} />
            <div >
              <Button className='pay_btn'> Get Started free</Button>
              <p className='pay_price_text'> Learn more about pricing<p className='pay_icon'>< Io.IoIosArrowRoundForward /></p>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Payment