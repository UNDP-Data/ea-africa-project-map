import { format } from 'd3-format';
import styled from 'styled-components';

interface Props {
  data: any;
}

interface TooltipElProps {
  x: number;
  y: number;
  verticalAlignment: string;
  horizontalAlignment: string;
}

const TooltipEl = styled.div<TooltipElProps>`
  display: block;
  position: fixed;
  z-index: 5;
  background-color: var(--gray-200);
  padding: 0.5rem 2rem;
  word-wrap: break-word;
  top: ${(props) => (props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40)}px;
  left: ${(props) => (props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20)}px;
  max-width: 15rem;
  transform: ${(props) => `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${props.verticalAlignment === 'top' ? '-100%' : '0%'})`};
`;

export const Tooltip = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <TooltipEl x={data.xPosition} y={data.yPosition} verticalAlignment={data.yPosition > window.innerHeight / 2 ? 'top' : 'bottom'} horizontalAlignment={data.xPosition > window.innerWidth / 2 ? 'left' : 'right'}>
      <h3 className='bold'>
        {data.country}
      </h3>
      {
        !data.AMP && !data.AO ? (
          <>
            <p className='undp-typography bold'>
              Not a part of AO nor AMP
            </p>
          </>
        ) : (
          <>
            <p className='undp-typography'>
              <div>
                Part of:
                {' '}
                <span className='bold'>{data.AMP && data.AO ? 'AO & AMP both' : data.AMP ? 'AMP Only' : 'AO Only'}</span>
              </div>
              <div>
                Potential Beneficiaries:
                {' '}
                <span className='bold'>{format('0.2s')(data.value)}</span>
              </div>
            </p>
          </>
        )
      }
    </TooltipEl>
  );
};
