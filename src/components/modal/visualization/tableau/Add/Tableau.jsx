import React ,{useState}from 'react'
import '../../Visual.css'
import { Button, message } from 'antd';
import axios from 'axios';
function Tableau() {
      let URL = process.env.REACT_APP_URL
      const [tableData, setTableData] = useState({
        server: "",
        api_version: "",
        personal_access_token_name: "",
        personal_access_token_secret: "",
        site_name: "",
        site_url: ""
      });



  const handleFormSubmit = () => {
    const tableInputs = Array.from(document.querySelectorAll('.in'));
    const tableValues = tableInputs.map((input) => input.value);
    console.log(tableValues);
    message.success('Submit successfully');
  };


  
    return (
        <div>
            <div className='overallConTab1'>
                <table className='table1'>
                    <thead>
                        <tr className='tr'>
                            {/* <th className='th'>S.No</th> */}
                            <th className='th1'>Key Parameter</th>
                            <th className='th1'>Key Value</th>
                        </tr>
                    </thead>
                    <tbody className='data'>
        <tr className='table-row'>
            <td className='table-data'>Server</td>
            <input type="text" className='in' placeholder='Enter The server Name' onChange={(e) => (setTableData(e.target.value))} />
        </tr>
        <tr className='table-row'>
            <td className='table-data'>Api version</td>
            <input type="text" className='in' placeholder='Enter The API version' />
        </tr>
        <tr className='table-row'>
            <td className='table-data'>Personal Access Token Name</td>
            <input type="text"  className='in'placeholder='Enter the token Name'  />
        </tr>
        <tr className='table-row'>
            <td className='table-data'>Personal Access Token Secret</td>
            <input type="text"  className='in'placeholder='Enter the token secreat'  />
        </tr>
        <tr className='table-row'>
            <td className='table-data'>Site Name</td>
            <input type="text" className='in' placeholder='Enter the Site Name'  />
        </tr>
        <tr className='table-row'>
            <td className='table-data'>Site URL</td>
            <input type="text" className='in' placeholder='Enter the Site URL'  />
        </tr>
        <tr className='table-row'>
            <td className='table-data'>Workbook Name</td>
            <input type="text" className='in' placeholder='Entr the Workbook Name'  />
        </tr>
        
    </tbody>
                </table>
                <Button type='primary' onClick={handleFormSubmit} className='table-btn'>Submit</Button>
            </div>

        </div>
    )
}

export default Tableau