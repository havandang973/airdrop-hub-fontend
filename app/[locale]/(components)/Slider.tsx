import { useState } from 'react';
import Slider from 'rc-slider';
//@ts-ignore
import 'rc-slider/assets/index.css';

export default function GradientSlider(props: { score: any }) {
  return (
    <div style={{ width: 116 }}>
      <div style={{ position: 'relative' }}>
        <Slider
          min={0}
          max={25000}
          value={props.score}
          railStyle={{
            height: 8,
            background: 'linear-gradient(to right, red, orange, yellow, green)', // full màu
          }}
          trackStyle={{ background: 'transparent' }} // bỏ màu track mặc định
          handleStyle={{
            borderColor: 'blue',
            backgroundColor: 'blue',
            width: 10,
            height: 10,
            marginTop: -1,
          }}
        />
      </div>
    </div>
  );
}
