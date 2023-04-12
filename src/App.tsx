import styled from 'styled-components';
import { useState } from 'react';
import { Segmented } from 'antd';
import { UnivariateMap } from './UnivariateMap';

const ColorBox = styled.div`
  width: 1rem;
  height: 1rem;
`;
interface Props {
  language: string;
}

const labels = {
  en: {
    All: 'All (AMP + AO)',
    AMP: 'Ongoing Efforts (AMP)',
    Planned: 'Planned Efforts (AO)',
    Round: 'Round',
    AoAmp: 'AO & AMP',
    AoOnly: 'AO Only',
    AmpOnly: 'AMP Only',
  },
  fr: {
    All: 'All (PMA + OA)',
    AMP: 'Efforts en cours (PMA)',
    Planned: 'Efforts planifiés (OA)',
    Round: 'Série',
    AoAmp: 'OA & PMA',
    AoOnly: 'OA Uniquement',
    AmpOnly: 'PMA Uniquement',
  },
  es: {
    All: 'Ambos (PMA + OA)',
    AMP: 'Esfuerzos en curso (PMA)',
    Planned: 'Esfuerzos planificados (OA)',
    Round: 'Fase',
    AoAmp: 'OA & PMA',
    AoOnly: 'Solo OA',
    AmpOnly: 'Solo PMA',
  },
};

const COLOR = ['#A71C04', '#D64513', '#EB8033'];
const CATCOLOR = ['#59BA47', '#FBC412', '#60D4F2'];

const App = (props: Props) => {
  const { language } = props;
  const [value, setValue] = useState<'AMP' | 'All' | 'Planned'>('All');
  return (
    <div className='undp-container'>
      <div style={{ width: '100%' }} className='flex-div flex-hor-align-center margin-bottom-07'>
        <Segmented
          value={value}
          className='undp-segmented-small'
          options={[
            { label: labels[language].All, value: 'All' },
            { label: labels[language].AMP, value: 'AMP' },
            { label: labels[language].Planned, value: 'Planned' },
          ]}
          onResize={undefined}
          onResizeCapture={undefined}
          onChange={(val) => { setValue(val as 'AMP' | 'All' | 'Planned'); }}
        />
      </div>
      {
        value === 'All'
          ? (
            <div className='flex-div gap-07 flex-hor-align-center margin-bottom-05'>
              <div className='flex-div flex-vert-align-center gap-02'>
                <ColorBox style={{ backgroundColor: CATCOLOR[0] }} />
                <div style={{ color: CATCOLOR[0] }}>{labels[language].AoAmp}</div>
              </div>
              <div className='flex-div flex-vert-align-center gap-02'>
                <ColorBox style={{ backgroundColor: CATCOLOR[1] }} />
                <div style={{ color: CATCOLOR[1] }}>{labels[language].AmpOnly}</div>
              </div>
              <div className='flex-div flex-vert-align-center gap-02'>
                <ColorBox style={{ backgroundColor: CATCOLOR[2] }} />
                <div style={{ color: CATCOLOR[2] }}>{labels[language].AoOnly}</div>
              </div>
            </div>
          )
          : (
            <div className='flex-div gap-07 flex-hor-align-center margin-bottom-05'>
              <div className='flex-div flex-vert-align-center gap-02'>
                <ColorBox style={{ backgroundColor: COLOR[0] }} />
                <div style={{ color: COLOR[0] }}>
                  {`${labels[language].Round} 1`}
                </div>
              </div>
              <div className='flex-div flex-vert-align-center gap-02'>
                <ColorBox style={{ backgroundColor: COLOR[1] }} />
                <div style={{ color: COLOR[1] }}>
                  {`${labels[language].Round} 2`}
                </div>
              </div>
              {
                value === 'AMP'
                  ? (
                    <div className='flex-div flex-vert-align-center gap-02'>
                      <ColorBox style={{ backgroundColor: COLOR[2] }} />
                      <div style={{ color: COLOR[2] }}>
                        {`${labels[language].Round} 3`}
                      </div>
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
