import styled from 'styled-components';
import { useState } from 'react';
import { Segmented } from 'antd';
import { UnivariateMap } from './UnivariateMap';

const ColorBox = styled.div`
  width: 1rem;
  height: 1rem;
`;

const COLOR = ['#3a6b35', '#829d60', '#cbd18f'];

const CATCOLOR = ['#59BA47', '#FBC412', '#60D4F2'];

const App = () => {
  const [value, setValue] = useState<'AMP' | 'All' | 'Planned'>('All');
  return (
    <div className='undp-container'>
      <h4 className='undp-typography margin-bottom-07 bold' style={{ color: 'var(--blue-600)', textAlign: 'center' }}>Bringing Electricity to 500 Million People</h4>
      <div style={{ width: '100%' }} className='flex-div flex-hor-align-center margin-bottom-07'>
        <Segmented
          value={value}
          className='undp-segmented-small'
          options={[
            { label: 'All (AMP + AO)', value: 'All' },
            { label: 'Ongoing Efforts (AMP)', value: 'AMP' },
            { label: 'Planned Efforts (AO)', value: 'Planned' },
          ]}
          onResize={undefined}
          onResizeCapture={undefined}
          onChange={(val) => { setValue(val as 'AMP' | 'All' | 'Planned'); }}
        />
      </div>
      <h6 className='undp-typography margin-bottom-03' style={{ textAlign: 'center' }}>Targeted countries</h6>
      {
        value === 'All'
          ? (
            <div className='flex-div gap-07 flex-hor-align-center'>
              <div className='flex-div flex-vert-align-center gap-02'>
                <ColorBox style={{ backgroundColor: CATCOLOR[0] }} />
                <div style={{ color: CATCOLOR[0] }}>AO & AMP</div>
              </div>
              <div className='flex-div flex-vert-align-center gap-02'>
                <ColorBox style={{ backgroundColor: CATCOLOR[1] }} />
                <div style={{ color: CATCOLOR[1] }}>AMP Only</div>
              </div>
              <div className='flex-div flex-vert-align-center gap-02'>
                <ColorBox style={{ backgroundColor: CATCOLOR[2] }} />
                <div style={{ color: CATCOLOR[2] }}>AO Only</div>
              </div>
            </div>
          )
          : (
            <div className='flex-div gap-07 flex-hor-align-center'>
              <div className='flex-div flex-vert-align-center gap-02'>
                <ColorBox style={{ backgroundColor: COLOR[0] }} />
                <div style={{ color: COLOR[0] }}>Round 1</div>
              </div>
              <div className='flex-div flex-vert-align-center gap-02'>
                <ColorBox style={{ backgroundColor: COLOR[1] }} />
                <div style={{ color: COLOR[1] }}>Round 2</div>
              </div>
              {
                value === 'AMP'
                  ? (
                    <div className='flex-div flex-vert-align-center gap-02'>
                      <ColorBox style={{ backgroundColor: COLOR[2] }} />
                      <div style={{ color: COLOR[2] }}>Round 3</div>
                    </div>
                  ) : null
              }
            </div>
          )
      }
      <UnivariateMap selectedValue={value} />
    </div>
  );
};

export default App;
