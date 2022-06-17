import styled from 'styled-components';

interface Props {
  selectedValue: 'AMP' | 'All' | 'Planned';
}

const El = styled.div`
  display: flex;
  justify-content: center;
`;
export const UnitChart = (props:Props) => {
  const { selectedValue } = props;
  const svgWidth = 174;
  const svgHeight = 174;
  const numberList = Array.from(Array(100), (_, index) => index);
  return (
    <El>
      <svg width='225px' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <g>
          {
            numberList.map((d) => (
              <circle
                key={d}
                cx={(d % 10) * 18 + 6}
                cy={Math.floor(d / 10) * 18 + 6}
                r={6}
                fill={selectedValue === 'All'
                  ? d < Math.round(180 / 5)
                    ? '#006EB5' : '#DDD'
                  : selectedValue === 'AMP'
                    ? d < Math.round(29.5 / 5)
                      ? '#006EB5' : '#DDD'
                    : d < Math.round(150 / 5)
                      ? '#006EB5' : '#DDD'}
              />
            ))
          }
        </g>
      </svg>
    </El>
  );
};
