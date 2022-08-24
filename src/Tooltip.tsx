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
  z-index: 10;
  border-radius: 1rem;
  font-size: 1.4rem;
  background-color: var(--white);
  box-shadow: 0 0 1rem rgb(0 0 0 / 15%);
  word-wrap: break-word;
  top: ${(props) => (props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40)}px;
  left: ${(props) => (props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20)}px;
  max-width: 24rem;
  transform: ${(props) => `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${props.verticalAlignment === 'top' ? '-100%' : '0%'})`};
`;

const TooltipTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--navy);  
  background: var(--black-400);
  width: 100%;
  box-sizing: border-box;
  border-radius: 1rem 1rem 0 0;
  padding: 1.6rem 4rem 1.6rem 2rem;
  position: relative;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1.8rem;
`;

const TooltipBody = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 2rem;
`;

const TooltipHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Tooltip = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <TooltipEl x={data.xPosition} y={data.yPosition} verticalAlignment={data.yPosition > window.innerHeight / 2 ? 'top' : 'bottom'} horizontalAlignment={data.xPosition > window.innerWidth / 2 ? 'left' : 'right'}>
      <TooltipHead>
        <TooltipTitle>
          {data.country}
        </TooltipTitle>
      </TooltipHead>
      {
        !data.AMP && !data.AO ? (
          <>
            <TooltipBody>
              Not a part of AO nor AMP
            </TooltipBody>
          </>
        ) : (
          <>
            <TooltipBody>
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
            </TooltipBody>
          </>
        )
      }
    </TooltipEl>
  );
};
