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
  background-color: var(--gray-100);
  border: 1px solid var(--gray-400);
  padding: 0.5rem var(--spacing-05);
  word-wrap: break-word;
  top: ${(props) => (props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40)}px;
  left: ${(props) => (props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20)}px;
  max-width: 19rem;
  transform: ${(props) => `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${props.verticalAlignment === 'top' ? '-100%' : '0%'})`};
`;

export const Tooltip = (props: Props) => {
  const {
    data,
  } = props;

  return (
    <TooltipEl x={data.xPosition} y={data.yPosition} verticalAlignment={data.yPosition > window.innerHeight / 2 ? 'top' : 'bottom'} horizontalAlignment={data.xPosition > window.innerWidth / 2 ? 'left' : 'right'}>
      <h4 className='undp-typography margin-top-00 margin-bottom-05'>
        {data.country}
      </h4>
      {
        !data.AMP && !data.AO ? (
          <>
            <p className='undp-typography'>
              {data.labels.none}
            </p>
          </>
        ) : (
          <>
            <p className='undp-typography'>
              {`${data.labels.partOf}:`}
              {' '}
              <span className='bold'>{data.AMP && data.AO ? data.labels.AoAmp : data.AMP ? data.labels.AmpOnly : data.labels.AoOnly}</span>
            </p>
            <p className='undp-typography'>
              {`${data.labels.potentialBeneficiaries}:`}
              {' '}
              <span className='bold'>{format('0.2s')(data.value)}</span>
            </p>
          </>
        )
      }
    </TooltipEl>
  );
};
