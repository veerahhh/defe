import React from 'react'
import './SpecialHandling.css'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Col } from 'antd';
function SpecialHandling() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <div className='splHead'>
        <div className='SplBackBtn'>
          <Link to={"/configuration"}>
            <button className='SplBtn'><ArrowLeftOutlined /></button></Link>
        </div>
        <p className='splTitle' > Special Character Handling</p>
      </div>

      <div className='splOverallContent'>
        <div className='splLeftContainer'>
          <h3 className='splLeftTitle'>List of Characters</h3>
          <p >Select a character to be replaced</p>

          <div class="grid-container">
            <div class="grid-item">#</div>
            <div class="grid-item">&</div>
            <div class="grid-item">#</div>
            <div class="grid-item">!</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
            <div class="grid-item">#</div>
          </div>
        </div>




        <div className='splRighttContainer'>
          <h3 className='splRightTitle'>Replace with</h3>
          <Form name="basic" autoComplete="off" layout='vertical' size='medium' style={{ fontFamily: 'Nunito' }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}

          >
            <Col lg={{ span: 24, offset: 0 }}>
              <Form.Item
                label="Replace"
                name="Replace"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Replace!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={{ span: 24, offset: 0 }}>
              <Form.Item
                label="With"
                name="With"
                rules={[
                  {
                    required: true,
                    message: 'Please input your With!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>



         
              <Button type="primary" htmlType="submit">
                Replace & Save
              </Button>
          
          </Form>
        </div>

      </div>


    </div>
  )
}

export default SpecialHandling