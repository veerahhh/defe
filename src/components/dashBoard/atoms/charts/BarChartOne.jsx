import React, { useState, useEffect, memo } from 'react';
import { Area } from '@ant-design/plots';
import { useSelector, useDispatch } from 'react-redux';
import { ChartOne } from "../../../../redux/reducer/count/CountReducer"

function Chart() {

  const dispatch = useDispatch()

  const data = useSelector((state) => state.Count.ChartOneData)

  useEffect(() => {
    dispatch(ChartOne(true))
  }, [])

  const config = {
    data,
    isGroup: true,
    xField: 'value',
    yField: 'count',
    seriesField: 'name',
    color: ["#5ad8a6", "rgb(91,143,249)"],
    point: {
      size: 4,
      shape: 'diamond'
    },
    label: {
      position: 'bottom',
    },
  };

  return( 
    <div>
      {/* <h2 className='analytics-charts'>Analytics Chart</h2> */}
  <Area width={550} height={240} className='charts' {...config} />
    </div>

  );
}

export default memo(Chart)