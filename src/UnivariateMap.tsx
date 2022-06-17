import { useRef } from 'react';
import styled from 'styled-components';
import { geoMercator } from 'd3-geo';
import World from './data/worldMap.json';
import Data from './data/ea-data.json';

interface Props {
  selectedValue: 'AMP' | 'All' | 'Planned';
}

const El = styled.div`
  display: flex;
  justify-content: center;
`;
export const UnivariateMap = (props:Props) => {
  const { selectedValue } = props;
  const svgWidth = 420;
  const svgHeight = 475;
  const mapSvg = useRef<SVGSVGElement>(null);
  const mapG = useRef<SVGGElement>(null);
  const projection = geoMercator().rotate([0, 0]).scale(325).translate([115, 230]);
  return (
    <El>
      <svg width='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`} ref={mapSvg}>
        <g ref={mapG}>
          {
            (World as any).features.map((d: any, i: number) => {
              const index = Data.findIndex((el) => el.Code === d.properties.ISO3);
              if ((index === -1) || d.properties.NAME === 'Antarctica') return null;
              return (
                <g
                  key={i}
                >
                  {
                    d.geometry.type === 'MultiPolygon' ? d.geometry.coordinates.map((el:any, j: any) => {
                      let masterPath = '';
                      el.forEach((geo: number[][]) => {
                        let path = ' M';
                        geo.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [number, number];
                          if (k !== geo.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                          else path = `${path}${point[0]} ${point[1]}`;
                        });
                        masterPath += path;
                      });
                      return (
                        <path
                          key={j}
                          d={masterPath}
                          stroke='#AAA'
                          strokeWidth={0.25}
                          fill={selectedValue === 'All' ? Data[index].AMP || Data[index].Planned ? '#006EB5' : '#DDD' : Data[index][selectedValue] ? '#006EB5' : '#DDD'}
                        />
                      );
                    }) : d.geometry.coordinates.map((el:any, j: number) => {
                      let path = 'M';
                      el.forEach((c: number[], k: number) => {
                        const point = projection([c[0], c[1]]) as [number, number];
                        if (k !== el.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                        else path = `${path}${point[0]} ${point[1]}`;
                      });
                      return (
                        <path
                          key={j}
                          d={path}
                          stroke='#AAA'
                          strokeWidth={0.25}
                          fill={selectedValue === 'All' ? Data[index].AMP || Data[index].Planned ? '#006EB5' : '#DDD' : Data[index][selectedValue] ? '#006EB5' : '#DDD'}
                        />
                      );
                    })
                  }
                </g>
              );
            })
          }
        </g>
      </svg>
    </El>
  );
};
