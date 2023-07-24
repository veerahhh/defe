import React, { Fragment, useState, useRef } from 'react';
import './Dflattern.css';
import { Select } from 'antd';

function Dflattern() {
  const [draw, setDrawer] = useState(false);
  const [enableForm, setEnableForm] = useState(false);
 

  const [selectedValue, setSelectedVal] = useState('')
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
  };

  const handleButtonOnclick = () => {
    fileInputRef.current?.click();
  };

  const openDrawer = () => {
    // setTimeout(() => {
    //   setDrawer(true);
    // }, 500);
  };

  const onChange = (value) => {

    // console.log(`selected ${value}`);
    setSelectedVal(value)
    if (value == "JSON") {
      setEnableForm(true)
      
    }
    if (value == "ORC") {
       setEnableForm(true)
      

    }
    if (value == "AVRO") {
      
      setEnableForm(true)
    
    }
    if (value == "PARQUET") {
      
      setEnableForm(true)
      
    }

  };

  const Op=()=>{
    setDrawer(true)
  }

  return (
    <Fragment>
      <div className='main_container'>
      <h1>D-Flatten</h1>
        <div className='form_container'>
          <div>
            
            <>
              <div className='drop_container'>
                <label  style={{  textTransform: "capitalize", fontFamily: "Nunito",fontSize:'20px' }}>Select The File type</label>
                <Select

                  showSearch
                  placeholder="Select a file type"
                  optionFilterProp="children"
                  onChange={onChange}
                  // onSearch={onSearch}
                  onClick={openDrawer}
                  defaultValue={'---none---'}
                  style={{ width: "300px", marginLeft: "30px", textTransform: "capitalize", fontFamily: "Nunito" }}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: 'JSON',
                      label: (
                        <div class="file-input-container" >
                          <input type="file" id="file-input" class="file-input" />
                          <label for={draw?'file-input':''} onClick={Op} className="file-input-label">JSON</label>
                        </div>
                      ),
                    },
                    {
                      value: 'ORC',
                      label:(
                        <div class="file-input-container" >
                          <input type="file" id="file-input" class="file-input" />
                          <label for={draw?'file-input':''} onClick={Op} className="file-input-label">ORC</label>
                        </div>
                      ),
                     },
                    {
                      value: 'AVRO',
                      label: (
                        <div class="file-input-container" >
                          <input type="file" id="file-input" class="file-input" />
                          <label for={draw?'file-input':''} onClick={Op} className="file-input-label">AVRO</label>
                        </div>
                      ),

                    },
                    {
                      value: 'PARQUET',
                      label: (
                        <div class="file-input-container" >
                          <input type="file" id="file-input" class="file-input" />
                          <label for={draw?'file-input':''} onClick={Op} className="file-input-label">PARQUET</label>
                        </div>
                      ),
                    },
                  ]}
                />
                {(selectedValue === 'JSON' || selectedValue === 'ORC' || selectedValue === 'AVRO' || selectedValue === 'PARQUET') && (<input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileInputChange} />)}
              </div>
            </>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Dflattern